import { getStep3BoostTipsCard } from './RwcTipsCards';
import { ValueDisplay } from './ValueDisplay';
import ProjectionResult from './ProjectionResult';
import { FormDataInterface } from './types';
import { formatCurrency, toNumber, toString } from 'lib/challenger/rwc';
import ErrorAlert from './ErrorAlert';

const PersonIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    className="text-bright-navy"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="8" r="4" fill="currentColor" />
    <path d="M6 20c0-3.5 3-6 6-6s6 2.5 6 6" fill="currentColor" />
  </svg>
);

type Step3BoostProps = {
  formData?: FormDataInterface;
  previousResult?: unknown | null;
  result?: unknown | null;
  onNext?: (result: unknown) => void;
};

const Step3Boost = ({ formData, previousResult, result, onNext }: Step3BoostProps) => {
  // Handle null/undefined/empty result - use null instead of defaults to avoid inaccurate calculations
  const api =
    result && typeof result === 'object' && Object.keys(result).length > 0
      ? (result as Record<string, unknown>)
      : null;

  //Handle previous result (2nd API call)
  const previousApi =
    previousResult && typeof previousResult === 'object' && Object.keys(previousResult).length > 0
      ? (previousResult as Record<string, unknown>)
      : null;
  // Check if API failed
  const hasError = api === null && result !== undefined;
  const showErrorBanner = hasError;

  // Get agePensionStatus to determine if cards should be hidden
  const agePensionStatus = api ? toString(api.agePensionStatus) : null;

  // Calculate firstYearAgePension as difference: latest API call minus 2nd API call
  const latestFirstYearAgePensionNum =
    api && typeof api === 'object' && api !== null && 'firstYearAgePension' in api
      ? toNumber((api as Record<string, unknown>).firstYearAgePension)
      : null;

  const previousData = previousApi?.data as Record<string, unknown> | undefined;
  const previousFirstYearAgePensionNum = previousData?.firstYearAgePension
    ? toNumber(previousData.firstYearAgePension)
    : null;

  const firstYearAgePensionNum =
    latestFirstYearAgePensionNum !== null && previousFirstYearAgePensionNum !== null
      ? latestFirstYearAgePensionNum - previousFirstYearAgePensionNum
      : latestFirstYearAgePensionNum;
  const firstYearAgePension =
    firstYearAgePensionNum !== null ? `$${formatCurrency(firstYearAgePensionNum)}` : '—';

  const latestFiveYearAgePensionNum = api?.cumulativeFiveYearAgePension
    ? toNumber(api.cumulativeFiveYearAgePension)
    : null;
  const previousFiveYearAgePensionNum = previousData?.cumulativeFiveYearAgePension
    ? toNumber(previousData.cumulativeFiveYearAgePension)
    : null;
  const fiveYearAgePensionNum =
    latestFiveYearAgePensionNum !== null && previousFiveYearAgePensionNum !== null
      ? latestFiveYearAgePensionNum - previousFiveYearAgePensionNum
      : latestFiveYearAgePensionNum;
  const fiveYearAgePension =
    fiveYearAgePensionNum !== null ? `$${formatCurrency(fiveYearAgePensionNum)}` : '—';

  const savingsDuration = api ? toNumber(api.numberOfIncomeYears) : null;

  const safetyNetIncomeNum = api ? toNumber(api.safetyNetIncome) : null;
  const safetyNetIncome =
    safetyNetIncomeNum !== null ? `$${formatCurrency(safetyNetIncomeNum)}` : '—';
  // Get safety net investment allocation from formData settings (defaults to 30 if not set)
  const safetyNetAllocation =
    typeof formData?.settings?.safetyNetInvestmentAllocation === 'number'
      ? formData.settings.safetyNetInvestmentAllocation
      : 30;
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="flex-1">
        {/* Error banner at top if API failed */}
        {showErrorBanner && (
          <ErrorAlert
            className="mb-8"
            title="We couldn't load your safety net estimate"
            message="This can happen when the service is temporarily unavailable. Please try again."
          />
        )}
        {/* Only show heading and content if we have valid data, not on error */}
        {!showErrorBanner && (
          <>
            <div className="font-roboto mb-4 text-2xl font-bold leading-tight text-bright-navy sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[56px]">
              Now consider an extra layer of safety net income.
            </div>
            <p className="font-roboto mb-8 text-base leading-relaxed text-black">
              A safety net income is made up of a lifetime income stream — such as a lifetime
              annuity — plus Age Pension payments (if eligible).
            </p>
          </>
        )}

        {!showErrorBanner && agePensionStatus !== 'None' && (
          <div className="mb-8 mt-6 grid grid-cols-1 gap-6 rounded-sm bg-white p-4 shadow-xl sm:grid-cols-2 sm:p-6">
            {/* Card 1 */}
            <div className="rounded-sm bg-white">
              <p className="font-roboto mb-4 text-sm text-bright-navy sm:text-base">
                Based on your details, this could change your Age Pension by:
              </p>
              <ValueDisplay value={firstYearAgePension} label="In the first year" />
            </div>

            {/* Card 2 */}
            <div className="rounded-sm bg-white">
              <p className="font-roboto mb-4 text-sm text-bright-navy sm:text-base">
                Over the next 5 years, this could change your total Age Pension by:
              </p>
              <ValueDisplay value={fiveYearAgePension} label="Over 5 years" />
            </div>
          </div>
        )}

        {/* Between Age Pension results and desired-income (super duration) projection — F4 */}
        {!showErrorBanner && (
          <p className="font-roboto mb-8 text-base leading-relaxed text-black">
            Let&apos;s see what the impact would be{' '}
            <strong>if you invested {safetyNetAllocation}% of your super or savings</strong> into a
            lifetime income stream.
          </p>
        )}

        {/* Super Savings Duration - only show if we have valid data */}
        {savingsDuration !== null && !showErrorBanner && (
          <ProjectionResult
            durationYears={savingsDuration}
            incomePerFortnight={String(Math.round(formData?.spendPerWeek as number) || 0)}
            icon={<PersonIcon />}
          />
        )}

        {/* Total Safety Net Income */}
        {!showErrorBanner && (
          <div className="mb-8 rounded-sm bg-white px-4 py-4 shadow-xl sm:px-6">
            <p className="font-roboto mb-4 text-sm text-bright-navy sm:text-base">
              Your Age Pension and your lifetime income stream may give you a safety net income of
              up to:
            </p>
            <ValueDisplay value={safetyNetIncome} label="Every year for life" />
          </div>
        )}
        <div className="mt-8">
          <button
            type="button"
            className="font-roboto w-full cursor-pointer rounded-sm bg-bright-teal px-4 py-3 text-base font-bold text-bright-navy sm:w-auto sm:px-6 sm:text-lg"
            onClick={() => onNext?.(result)}
          >
            NEXT
          </button>
        </div>
      </div>
      <div className="mt-8 hidden w-full space-y-6 md:block lg:mt-0 lg:w-80">
        {getStep3BoostTipsCard(result)}
      </div>
    </div>
  );
};

export default Step3Boost;
