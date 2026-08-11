import { OptionSelector } from './OptionSelector';
import { InputField } from './InputField';
import { Dropdown } from './Dropdown';
import { useState } from 'react';
import { FormDataInterface } from './types';
import {
  formatCurrency,
  parseValue,
  parseIntValue,
  getInvestor1DateOfBirth,
  getInvestor2DateOfBirth,
} from 'lib/challenger/rwc';
import {
  LONG_API_REQUEST_OPTIONS,
  LONG_REQUEST_LOADER_DELAY_MS,
  postJsonWithRetry,
} from './apiClient';
import LongRequestOverlay from './LongRequestOverlay';
import { useDelayedVisibility } from './useDelayedVisibility';

interface Step1FinancialProps {
  onNext: () => boolean;
  formData: FormDataInterface;
  minSavings: number;
  maxSavings: number;
  minInvestmentProperty: number;
  maxInvestmentProperty: number;
  minShares: number;
  maxShares: number;
  minRentalIncome: number;
  maxRentalIncome: number;
  minEmployIncome: number;
  maxEmployIncome: number;
  validationErrors: { [key: string]: string };
  onFieldChange: (field: string, value: string | number | boolean) => void;
  onClearError: (field: string) => void;
  setValidationErrors: (errors: { [key: string]: string }) => void;
  onResult?: (result: unknown) => void;
  previousStepError?: boolean;
  ageShowMonth?: number;
}

export function Step1Financial({
  onNext,
  formData,
  minSavings,
  maxSavings,
  minShares,
  maxShares,
  minInvestmentProperty,
  maxInvestmentProperty,
  minRentalIncome,
  maxRentalIncome,
  minEmployIncome,
  maxEmployIncome,
  validationErrors,
  onFieldChange,
  onClearError,
  setValidationErrors,
  onResult,
  ageShowMonth,
}: Step1FinancialProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showLongRunningOverlay = useDelayedVisibility(isSubmitting, LONG_REQUEST_LOADER_DELAY_MS);

  const submitFormDataWithLoading = async () => {
    setIsSubmitting(true);
    try {
      // Calculate dateOfBirth using shared utility function
      const investor1DateOfBirth = getInvestor1DateOfBirth(formData, ageShowMonth);

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
        ownHome: formData.ownHome ?? true,
        includeAgePension: true,
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

      if (formData.ownsInvestmentProperty) {
        const investmentPropertyValue = parseValue(formData.investmentPropertyValue);
        if (investmentPropertyValue !== undefined)
          apiData.investmentPropertyValue = investmentPropertyValue;

        const investmentPropertyRentPerWeek = parseValue(formData.investmentPropertyRentPerWeek);
        if (investmentPropertyRentPerWeek !== undefined)
          apiData.investmentPropertyRentPerWeek = investmentPropertyRentPerWeek;
      }

      const response = await postJsonWithRetry<Record<string, unknown>>(
        'api/rwcCalculate',
        apiData,
        LONG_API_REQUEST_OPTIONS
      );
      if (!response.ok) {
        console.error('API error: Failed to submit form', response.error);
        return null;
      }
      return response.data;
    } catch (error) {
      console.error('Error submitting form:', error);
      return null; // Return null on any error to prevent incorrect data
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep1Financial()) return;
    // If validation passed, then submit the form
    try {
      const result = await submitFormDataWithLoading();
      // Call onResult with result (even if null) - let results component handle error display
      if (onResult) {
        onResult(result);
      }
      // Always proceed to next step - error will be shown in results view
      onNext();
    } catch (error) {
      console.error('Failed to submit form:', error);
      // Still proceed - error will be shown in results view
      if (onResult) {
        onResult(null);
      }
      onNext();
    }
  };

  const validateStep1Financial = () => {
    const errors: { [key: string]: string } = {};
    if (parseInt(formData.savingsAmount) > maxSavings) {
      errors.savingsAmount = `This tool does not support money in the bank values greater than $${formatCurrency(maxSavings)}`;
    }
    if (parseInt(formData.investmentPropertyValue) > maxInvestmentProperty) {
      errors.investmentPropertiesValue = `This tool does not support investment properties greater than $${formatCurrency(maxInvestmentProperty)}`;
    }
    if (parseInt(formData.sharesValue) > maxShares) {
      errors.sharesValue = `This tool does not support shares value greater than $${formatCurrency(maxShares)}`;
    }
    if (parseInt(formData.investmentPropertyRentPerWeek) > maxRentalIncome) {
      errors.investmentPropertiesIncome = `This tool does not support properties value greater than $${formatCurrency(maxRentalIncome)}`;
    }
    if (
      formData.investor1.employIncome &&
      parseInt(formData.investor1.employIncome) > maxEmployIncome
    ) {
      errors.investor1EmployIncome = `This tool does not support income from employment values greater than $${formatCurrency(maxEmployIncome)}`;
    }
    if (
      formData.investor2.employIncome &&
      parseInt(formData.investor2.employIncome) > maxEmployIncome
    ) {
      errors.investor2EmployIncome = `This tool does not support income from employment values greater than $${formatCurrency(maxEmployIncome)}`;
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  return (
    <>
      <LongRequestOverlay visible={showLongRunningOverlay} />
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="space-y-6">
            <OptionSelector
              label={
                formData.hasPartner
                  ? 'Are you or your partner a homeowner?'
                  : 'Are you a homeowner?'
              }
              value={formData.ownHome ? 'Yes' : 'No'}
              onChange={(value) => {
                onFieldChange('ownHome', value === 'Yes' ? true : false);
              }}
              options={['Yes', 'No']}
              error={validationErrors.homeowner}
            />

            {/* Savings question - different based on partner status */}
            <InputField
              label={
                formData.hasPartner
                  ? 'How much money do you and your partner have saved?'
                  : 'How much money do you have saved?'
              }
              value={formData.savingsAmount.toString()}
              onChange={(value) => {
                onFieldChange('savingsAmount', value);
                onClearError('savingsAmount');
              }}
              placeholder="Enter amount"
              prefix="$"
              description="*Approximate examples include savings, term deposits etc."
              error={validationErrors.savingsAmount}
              min={minSavings}
              max={maxSavings}
            />

            <OptionSelector
              label={
                formData.hasPartner
                  ? 'Do you or your partner own any investment properties?'
                  : 'Do you own any investment properties?'
              }
              value={formData.ownsInvestmentProperty === true ? 'Yes' : 'No'}
              onChange={(value) => {
                const yes = value === 'Yes';
                onFieldChange('ownsInvestmentProperty', yes);
                if (!yes) {
                  onFieldChange('investmentPropertyValue', '');
                  onFieldChange('investmentPropertyRentPerWeek', '');
                }
                onClearError('investmentPropertiesValue');
                onClearError('investmentPropertiesIncome');
              }}
              options={['Yes', 'No']}
              error={validationErrors.ownsInvestmentProperty}
            />
            {/* Investment properties value - different based on partner status */}
            {formData.ownsInvestmentProperty === true && (
              <>
                <InputField
                  label={
                    formData.hasPartner
                      ? 'Please enter the approximate combined value of any investment properties held by you and your partner, minus any mortgages secured against them.'
                      : 'What is the approximate value of any investment properties held minus any mortgages secured against the property?'
                  }
                  value={formData.investmentPropertyValue.toString()}
                  onChange={(value) => {
                    onFieldChange('investmentPropertyValue', value);
                    onClearError('investmentPropertiesValue');
                  }}
                  placeholder="Enter amount"
                  prefix="$"
                  min={minInvestmentProperty}
                  max={maxInvestmentProperty}
                  error={validationErrors.investmentPropertiesValue}
                />
                {/* Investment properties income */}
                <InputField
                  label="Roughly how much income do you receive from the investment properties?"
                  value={formData.investmentPropertyRentPerWeek.toString()}
                  onChange={(value) => {
                    onFieldChange('investmentPropertyRentPerWeek', value);
                    onClearError('investmentPropertiesIncome');
                  }}
                  placeholder="Enter amount"
                  prefix="$"
                  suffix="Per week"
                  error={validationErrors.investmentPropertiesIncome}
                  min={minRentalIncome}
                  max={maxRentalIncome}
                />
              </>
            )}

            {/* Shares and managed funds value - different based on partner status */}
            <InputField
              label={
                formData.hasPartner
                  ? 'What is the approximate combined value of any shares and/or managed funds you hold?'
                  : 'What is the approximate value of any shares and/or managed funds you hold?'
              }
              value={formData.sharesValue.toString()}
              onChange={(value) => {
                onFieldChange('sharesValue', value);
                onClearError('sharesValue');
              }}
              placeholder="Enter amount"
              prefix="$"
              error={validationErrors.sharesValue}
              min={minShares}
              max={maxShares}
            />

            {/* Are you employed? */}
            <OptionSelector
              label="Are you employed?"
              value={formData.youEmployed ? 'Yes' : 'No'}
              onChange={(value) => {
                onFieldChange('youEmployed', value === 'Yes' ? true : false);
              }}
              options={['Yes', 'No']}
              error={validationErrors.employed}
            />

            {/* Employment years + your income — only when employed */}
            {formData.youEmployed && (
              <>
                <Dropdown
                  label="If so how many more years do you plan to work for?"
                  value={(() => {
                    const displayValue = formData.investor1.employRemainYears
                      ? `${formData.investor1.employRemainYears} year${formData.investor1.employRemainYears === '1' ? '' : 's'}`
                      : 'Select years';
                    return displayValue;
                  })()}
                  onChange={(value) => {
                    // Extract just the number from "1 year", "2 years", etc.
                    const years = value.split(' ')[0];
                    onFieldChange('investor1.employRemainYears', years);
                  }}
                  options={['1 year', '2 years']}
                  description="As this tool is designed for those about to retire, you can't elect a period longer than 2 years."
                />
                <InputField
                  label="Roughly how much income do you receive from employment before tax?"
                  value={formData.investor1.employIncome.toString()}
                  onChange={(value) => {
                    onFieldChange('investor1.employIncome', value);
                    onClearError('investor1EmployIncome');
                  }}
                  placeholder="Enter amount"
                  prefix="$"
                  suffix="Per year"
                  error={validationErrors.investor1EmployIncome}
                  min={minEmployIncome}
                  max={maxEmployIncome}
                />
              </>
            )}

            {/* Partner employment fields - only show if hasPartner */}
            {formData.hasPartner && (
              <>
                {/* Is your partner currently employed? */}
                <OptionSelector
                  label="Is your partner currently employed?"
                  value={formData.partnerEmployed ? 'Yes' : 'No'}
                  onChange={(value) =>
                    onFieldChange('partnerEmployed', value === 'Yes' ? true : false)
                  }
                  options={['Yes', 'No']}
                  error={validationErrors.partnerEmployed}
                />

                {/* Partner employment years + income — only when partner employed */}
                {formData.partnerEmployed && (
                  <>
                    <Dropdown
                      label="If so, how many more years does your partner plan to work for?"
                      value={(() => {
                        const displayValue = formData.investor2.employRemainYears
                          ? `${formData.investor2.employRemainYears} year${formData.investor2.employRemainYears === '1' ? '' : 's'}`
                          : 'Select years';
                        return displayValue;
                      })()}
                      onChange={(value) => {
                        // Extract just the number from "1 year", "2 years", etc.
                        const years = value.split(' ')[0];
                        onFieldChange('investor2.employRemainYears', years);
                      }}
                      options={['1 year', '2 years']}
                      description="As this tool is designed for those about to retire, you can't elect a period longer than 2 years."
                    />
                    <InputField
                      label="Roughly how much income does your partner receive from employment before tax?"
                      value={formData.investor2.employIncome.toString()}
                      onChange={(value) => {
                        onFieldChange('investor2.employIncome', value);
                        onClearError('investor2EmployIncome');
                      }}
                      placeholder="Enter amount"
                      prefix="$"
                      suffix="Per year"
                      error={validationErrors.investor2EmployIncome}
                      min={minEmployIncome}
                      max={maxEmployIncome}
                    />
                  </>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="font-roboto mt-8 cursor-pointer rounded-sm bg-bright-teal px-6 py-3 text-lg font-bold text-bright-navy disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'SUBMITTING...' : 'NEXT'}
          </button>
        </div>
      </div>
    </>
  );
}

export default Step1Financial;
