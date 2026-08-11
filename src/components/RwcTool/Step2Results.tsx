import { getStep2ResultsTipsCards } from './RwcTipsCards';
import { ValueDisplay } from './ValueDisplay';
import TimelineChart from './TimelineChart';
import { FormDataInterface } from './types';
import {
  parseValue,
  parseIntValue,
  getInvestor1DateOfBirth,
  getInvestor2DateOfBirth,
  toNumber,
  toString,
} from 'lib/challenger/rwc';
import { useState } from 'react';
import {
  LONG_API_REQUEST_OPTIONS,
  LONG_REQUEST_LOADER_DELAY_MS,
  postJsonWithRetry,
} from './apiClient';
import ErrorAlert from './ErrorAlert';
import LongRequestOverlay from './LongRequestOverlay';
import { useDelayedVisibility } from './useDelayedVisibility';

type Step2ResultsProps = {
  result: unknown | null;
  formData?: FormDataInterface;
  onNext?: (result: unknown) => void;
  yourSuperAloneYears?: number | null; // Number of years from Step1Form (without Age Pension) for "your super alone"
  numberOfIncomeYears?: number | null;
  ageShowMonth?: number;
};

const Step2Results = ({
  result,
  formData,
  onNext,
  yourSuperAloneYears,
  numberOfIncomeYears,
  ageShowMonth,
}: Step2ResultsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showLongRunningOverlay = useDelayedVisibility(isSubmitting, LONG_REQUEST_LOADER_DELAY_MS);

  // Handle null/undefined/empty result - use null instead of defaults to avoid inaccurate calculations
  const api =
    result && typeof result === 'object' && Object.keys(result).length > 0
      ? (result as Record<string, unknown>)
      : null;

  // If API failed, show error message
  const hasError = api === null && result !== undefined;

  const youAge = formData?.youAge ? parseInt(String(formData.youAge)) : null;
  const partnerAge = formData?.partnerAge ? parseInt(String(formData.partnerAge)) : null;
  const hasPartner = Boolean(formData?.hasPartner);

  const yearsToRunOut = yourSuperAloneYears;
  const twentyFivePercentSurvivalYear = api ? toNumber(api.twentyFivePercentSurvivalYear) : null;
  const youngestInvestorAge =
    youAge === null
      ? null
      : hasPartner && partnerAge !== null
        ? Math.min(youAge, partnerAge)
        : youAge;
  const retirementUntilAge =
    youAge !== null && twentyFivePercentSurvivalYear !== null && youngestInvestorAge !== null
      ? twentyFivePercentSurvivalYear + youngestInvestorAge
      : null;
  const partPensionAmount = api ? toString(api.partPensionAmount) : null;
  const agePensionStatus = api ? toString(api.agePensionStatus) : null;

  const investorAge =
    yearsToRunOut !== null && yearsToRunOut !== undefined && youAge !== null
      ? yearsToRunOut + youAge
      : null;
  // Use age inputted for singles/youngest age for couples; default start at 60, end at 100
  const chartStartAge =
    youAge !== null
      ? hasPartner && partnerAge !== null
        ? Math.min(youAge, partnerAge)
        : youAge
      : 60;
  const chartEndAge = 100;

  const handleNext = async () => {
    if (!onNext || !formData || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Calculate dateOfBirth using shared utility function (same as Step1Form and Step1Financial)
      const investor1DateOfBirth = getInvestor1DateOfBirth(formData, ageShowMonth);

      // Include all previous fields from Step1Financial (don't recalculate, just use existing values)
      const investor1Data: Record<string, unknown> = {
        gender: formData.investor1.gender === 'Other' ? 'Female' : formData.investor1.gender,
        dateOfBirth: investor1DateOfBirth,
        superAmount: parseFloat(formData.investor1.superAmount) || 0,
      };

      // Add employment fields for investor1 if employed
      if (formData.youEmployed) {
        const employIncome = parseValue(formData.investor1.employIncome);
        const employRemainYears = parseIntValue(formData.investor1.employRemainYears);
        if (employIncome !== undefined) investor1Data.employIncome = employIncome;
        if (employRemainYears !== undefined) investor1Data.employRemainYears = employRemainYears;
      }

      const apiData: Record<string, unknown> = {
        investor1: investor1Data,
        spendPerWeek:
          typeof formData.spendPerWeek === 'number'
            ? formData.spendPerWeek
            : parseFloat(String(formData.spendPerWeek)) || 0,
        ownHome: formData.ownHome || false,
        includeAgePension: true,
        includeAnnuity: true, // New field from Step2Results
      };

      // Only include investor2 if hasPartner is true
      if (formData.hasPartner) {
        // Calculate partner dateOfBirth using shared utility function
        const investor2DateOfBirth = getInvestor2DateOfBirth(formData, ageShowMonth);

        const investor2Data: Record<string, unknown> = {
          gender: formData.investor2.gender === 'Other' ? 'Female' : formData.investor2.gender,
          dateOfBirth: investor2DateOfBirth,
          superAmount: parseFloat(formData.investor2.superAmount) || 0,
        };

        // Add employment fields for investor2 if partner is employed
        if (formData.partnerEmployed) {
          const employIncome = parseValue(formData.investor2.employIncome);
          const employRemainYears = parseIntValue(formData.investor2.employRemainYears);
          if (employIncome !== undefined) investor2Data.employIncome = employIncome;
          if (employRemainYears !== undefined) investor2Data.employRemainYears = employRemainYears;
        }

        apiData.investor2 = investor2Data;
      }

      // Add financial fields only if they have values > 0
      const savingsAmount = parseValue(formData.savingsAmount);
      if (savingsAmount !== undefined) apiData.savingsAmount = savingsAmount;

      const sharesValue = parseValue(formData.sharesValue);
      if (sharesValue !== undefined) apiData.sharesValue = sharesValue;

      const investmentPropertyValue = parseValue(formData.investmentPropertyValue);
      if (investmentPropertyValue !== undefined)
        apiData.investmentPropertyValue = investmentPropertyValue;

      const investmentPropertyRentPerWeek = parseValue(formData.investmentPropertyRentPerWeek);
      if (investmentPropertyRentPerWeek !== undefined)
        apiData.investmentPropertyRentPerWeek = investmentPropertyRentPerWeek;

      const response = await postJsonWithRetry<Record<string, unknown>>(
        'api/rwcCalculate',
        apiData,
        LONG_API_REQUEST_OPTIONS
      );
      if (!response.ok) {
        const errorMessage = response.error || 'Failed to calculate results';
        console.error('API error: Failed to submit form', errorMessage);
        setError(errorMessage);
        onNext(null);
        return;
      }

      setError(null);
      onNext(response.data);
    } catch (error) {
      console.error('Error in Step2Results API call:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      // Set result to null on error to prevent showing incorrect data
      onNext(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show error banner if API failed, but still show the rest of the page
  const showErrorBanner = hasError;

  return (
    <>
      <LongRequestOverlay visible={showLongRunningOverlay} />
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left Column - Results */}
        <div className="flex-1">
          {/* Error banner at top if API failed */}
          {showErrorBanner && (
            <ErrorAlert
              className="mb-8"
              title="We couldn't load your results right now"
              message="This is usually temporary. Please try again in a moment."
              details={error}
            />
          )}
          {/* Only show heading if we have valid data, not on error */}
          {!showErrorBanner && (
            <div className="font-roboto mb-4 text-2xl font-bold leading-tight text-bright-navy sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[56px]">
              We estimate your super alone may run out in{' '}
              <span className="text-bright-teal">
                {yearsToRunOut !== null ? `${yearsToRunOut} years.` : '—'}
              </span>
            </div>
          )}
          {investorAge !== null && !showErrorBanner && (
            <p className="font-roboto mb-8 text-sm text-black sm:text-base">
              There is a <span className="font-bold">25%</span> chance{' '}
              {hasPartner && partnerAge !== null
                ? `at least one of you will be in retirement until age ${retirementUntilAge ?? investorAge ?? '-'}`
                : `you will be in retirement until age ${retirementUntilAge}`}
              .
            </p>
          )}

          {/* Timeline Chart - only show if we have valid data and no error */}
          {investorAge !== null && retirementUntilAge !== null && !showErrorBanner && (
            <TimelineChart
              bars={[
                {
                  endAge: investorAge,
                  label: (
                    <>
                      <span>Super</span>
                    </>
                  ),
                },
                {
                  endAge: retirementUntilAge,
                  label: 'Duration of retirement',
                },
              ]}
              startAge={chartStartAge}
              endAge={chartEndAge}
              yearIncrement={5}
            />
          )}

          <div className="my-10">
            <hr className="h-px border-0 bg-grey dark:bg-grey" />
          </div>

          {agePensionStatus !== null && partPensionAmount !== null && !showErrorBanner && (
            <>
              {agePensionStatus === 'DelayedAge' ? (
                <>
                  <div className="font-roboto mb-4 text-2xl font-bold leading-tight text-bright-navy sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[56px]">
                    You&apos;re <span className="text-bright-teal"> not yet eligible </span>
                    for the age pension
                  </div>
                  <p className="mb-4 font-roboto-400 text-sm text-bright-navy sm:text-base">
                    To be eligible for the Age Pension you need to be 67 years or older. Since
                    you&apos;re under the qualifying age, you can&apos;t receive the Age Pension
                    just yet. But when you reach eligibility, we estimate your Age Pension could be
                    around{' '}
                    <span className="text-bright-teal">{partPensionAmount} per fortnight</span>
                  </p>
                </>
              ) : (
                <>
                  <div className="font-roboto mb-4 text-2xl font-bold leading-tight text-bright-navy sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[56px]">
                    {agePensionStatus === 'None' ? (
                      <>
                        Based on what you&apos;ve entered today, it looks like you&apos;re not
                        eligible for any Age Pension.
                      </>
                    ) : agePensionStatus === 'DelayedWork' ? (
                      <>
                        When you stop working, we estimate your Age Pension may be{' '}
                        <span className="text-bright-teal">{partPensionAmount}</span> per fortnight
                      </>
                    ) : (
                      <>
                        {' '}
                        We estimate you will be entitled to a{' '}
                        <span className="text-bright-teal">
                          {agePensionStatus.toLowerCase()} pension
                        </span>{' '}
                        of <span className="text-bright-teal">{partPensionAmount}</span> per
                        fortnight.
                      </>
                    )}
                  </div>
                  {numberOfIncomeYears !== null && (
                    <div className="mb-8">
                      <p className="mb-4 font-roboto-400 text-sm text-bright-navy sm:text-base">
                        {agePensionStatus === 'None'
                          ? 'When we include your other income, we estimate that your super may now last for:'
                          : 'Combined with your other income, we estimate that your super may now last for:'}
                      </p>
                      <ValueDisplay value={String(numberOfIncomeYears)} label="Years" />
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <div className="mt-8">
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="font-roboto cursor-pointer rounded-sm bg-bright-teal px-6 py-3 text-lg font-bold text-bright-navy disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'SUBMITTING...' : showErrorBanner ? 'TRY AGAIN' : 'NEXT'}
            </button>
          </div>
        </div>

        {/* Right Column - Tips Cards (show on mobile as well) */}
        <div className="mt-8 hidden w-full space-y-6 md:block lg:mt-0 lg:w-80">
          {getStep2ResultsTipsCards()}
        </div>
      </div>
    </>
  );
};

export default Step2Results;
