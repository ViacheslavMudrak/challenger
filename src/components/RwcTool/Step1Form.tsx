import { SectionHeader } from './SectionHeader';
import { InputField } from './InputField';
import { OptionSelector } from './OptionSelector';
import { Dropdown } from './Dropdown';
import { useEffect, useRef, useState } from 'react';
import { FormDataInterface } from './types';
import {
  formatCurrency,
  parseNumeric,
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

interface Step1FormProps {
  onNext: () => boolean;
  formData: FormDataInterface;
  validationErrors: { [key: string]: string };
  minAge: number;
  maxAge: number;
  minSuperBalance: number;
  maxSuperBalance: number;
  maxSingleWeeklySpend: number;
  maxCoupleWeeklySpend: number;
  ageShowMonth: number;
  recommendedWeeklySpend: number;
  handleChange: (
    section: 'investor1' | 'investor2' | string,
    field?: string,
    value?: string | number
  ) => void;
  handlePartnerToggle: () => void;
  handleWeeklySpendChange: (value: string) => void;
  clearError: (field: string) => void;
  setValidationErrors: (errors: { [key: string]: string }) => void;
  onResult?: (result: unknown) => void;
}

export function Step1Form({
  onNext,
  formData,
  validationErrors,
  minAge,
  maxAge,
  minSuperBalance,
  maxSuperBalance,
  maxSingleWeeklySpend,
  maxCoupleWeeklySpend,
  ageShowMonth,
  recommendedWeeklySpend,
  handleChange,
  handlePartnerToggle,
  handleWeeklySpendChange,
  clearError,
  setValidationErrors,
  onResult,
}: Step1FormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showLongRunningOverlay = useDelayedVisibility(isSubmitting, LONG_REQUEST_LOADER_DELAY_MS);
  // Set spend per week to the recommended amount (single/couple) when empty/zero or partner changes
  const prevHasPartnerRef = useRef<boolean | null>(null);
  const prevRecommendedRef = useRef<number | null>(null);

  useEffect(() => {
    const currentSpend =
      typeof formData.spendPerWeek === 'number'
        ? formData.spendPerWeek
        : parseFloat(String(formData.spendPerWeek)) || 0;

    const isInitialRun = prevHasPartnerRef.current === null && prevRecommendedRef.current === null;

    // Only update if:
    // 1. This is the first run and spend is unset (0), or
    // 2. Partner status changed and current spend matches the previous recommended value
    const partnerChanged =
      prevHasPartnerRef.current !== null && prevHasPartnerRef.current !== formData.hasPartner;
    const shouldReplace =
      (isInitialRun && currentSpend === 0) ||
      (partnerChanged &&
        prevRecommendedRef.current !== null &&
        currentSpend === prevRecommendedRef.current);
    if (shouldReplace && recommendedWeeklySpend) {
      handleWeeklySpendChange(String(recommendedWeeklySpend));
    }

    prevHasPartnerRef.current = formData.hasPartner;
    prevRecommendedRef.current = recommendedWeeklySpend ?? null;
  }, [formData.hasPartner, recommendedWeeklySpend, handleWeeklySpendChange]);

  const submitFormDataWithLoading = async () => {
    setIsSubmitting(true);
    try {
      // Calculate dateOfBirth using shared utility functions
      const investor1DateOfBirth = getInvestor1DateOfBirth(formData, ageShowMonth);

      const apiData: {
        investor1: {
          gender: string;
          superAmount: number;
          dateOfBirth: string;
        };
        investor2?: {
          gender: string;
          superAmount: number;
          dateOfBirth: string;
        };
        spendPerWeek: number;
        includeAgePension: boolean;
      } = {
        investor1: {
          gender: formData.investor1.gender === 'Other' ? 'Female' : formData.investor1.gender,
          superAmount: parseFloat(formData.investor1.superAmount) || 0,
          dateOfBirth: investor1DateOfBirth,
        },
        spendPerWeek: formData.spendPerWeek || 0,
        includeAgePension: false,
      };

      // Only include investor2 if hasPartner is true
      if (formData.hasPartner) {
        const investor2DateOfBirth = getInvestor2DateOfBirth(formData, ageShowMonth);
        apiData.investor2 = {
          gender: formData.investor2.gender === 'Other' ? 'Female' : formData.investor2.gender,
          superAmount: parseFloat(formData.investor2.superAmount) || 0,
          dateOfBirth: investor2DateOfBirth,
        };
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

  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    const ageMessage = `This tool is designed for people aged ${minAge} to ${maxAge}.`;

    const assertRequiredAndRange = (
      rawValue: unknown,
      min: number,
      max: number,
      fieldKey: keyof typeof validationErrors,
      label: string
    ) => {
      if (rawValue === undefined || rawValue === null || String(rawValue).trim() === '') {
        errors[fieldKey] = 'This field is required.';
        return;
      }
      const numericValue = parseNumeric(rawValue);
      if (numericValue === null) {
        errors[fieldKey] = `Please enter a valid number for ${label}.`;
        return;
      }
      if (numericValue < min || numericValue > max) {
        errors[fieldKey] =
          `This tool supports ${label.toLowerCase()} values between $${formatCurrency(
            min
          )} and $${formatCurrency(max)}.`;
      }
    };

    // Primary super
    assertRequiredAndRange(
      formData.investor1.superAmount,
      minSuperBalance,
      maxSuperBalance,
      'superBalance',
      'Super'
    );

    // Primary gender
    if (!formData.investor1.gender.trim()) {
      errors.gender = 'Please select the gender.';
    }

    // Primary age
    if (!formData.youAge.trim()) {
      errors.age = ageMessage;
    } else {
      const youAgeNum = Number(formData.youAge);
      if (!Number.isInteger(youAgeNum) || youAgeNum < minAge || youAgeNum > maxAge) {
        errors.age = ageMessage;
      }
    }

    // Primary birth month (required if shown)
    if (formData.youAge !== null && parseInt(formData.youAge) === ageShowMonth) {
      if (!formData.youBirthMonth.trim()) {
        errors.birthMonth = 'Please select your birth month.';
      } else {
        const month = Number(formData.youBirthMonth);
        if (!Number.isInteger(month) || month < 1 || month > 12) {
          errors.birthMonth = 'Please enter a valid month (1-12).';
        }
      }
    }

    // Weekly spend
    const spend = Number(formData.spendPerWeek);
    if (!Number.isFinite(spend)) {
      errors.spendPerWeek = 'Please enter a valid number for weekly spend.';
    } else if (!formData.hasPartner && spend > maxSingleWeeklySpend) {
      errors.spendPerWeek = `Weekly spend must not exceed $${formatCurrency(
        maxSingleWeeklySpend
      )} for singles.`;
    } else if (formData.hasPartner && spend > maxCoupleWeeklySpend) {
      errors.spendPerWeek = `Weekly spend must not exceed $${formatCurrency(
        maxCoupleWeeklySpend
      )} for couples.`;
    }

    if (formData.hasPartner) {
      assertRequiredAndRange(
        formData.investor2.superAmount,
        minSuperBalance,
        maxSuperBalance,
        'partnerSuperBalance',
        'Partner super'
      );

      if (!formData.investor2.gender.trim()) {
        errors.partnerGender = 'Please select the gender.';
      }

      if (!formData.partnerAge.trim()) {
        errors.partnerAge = ageMessage;
      } else {
        const partnerAgeNum = Number(formData.partnerAge);
        if (!Number.isInteger(partnerAgeNum) || partnerAgeNum < minAge || partnerAgeNum > maxAge) {
          errors.partnerAge = ageMessage;
        }
      }
      // Primary birth month (required if shown)
      if (formData.partnerAge !== null && parseInt(formData.partnerAge) === ageShowMonth) {
        if (!formData.partnerBirthMonth.trim()) {
          errors.partnerBirthMonth = 'Please select your birth month.';
        } else {
          const month = Number(formData.partnerBirthMonth);
          if (!Number.isInteger(month) || month < 1 || month > 12) {
            errors.partnerBirthMonth = 'Please enter a valid month (1-12).';
          }
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return false;
    }

    setValidationErrors({});
    return true;
  };

  const monthOptions = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const getMonthLabel = (value: string) =>
    monthOptions.find((month) => month.value === value)?.label ?? 'Select month';

  const handleSubmit = async () => {
    // First validate the form
    if (!validateStep1()) {
      return; // Validation failed, don't proceed
    }

    // Calculate and store dateOfBirth in formData before submitting
    const investor1DateOfBirth = getInvestor1DateOfBirth(formData, ageShowMonth);
    handleChange('investor1', 'dateOfBirth', investor1DateOfBirth);

    // Calculate and store partner dateOfBirth if partner exists
    if (formData.hasPartner) {
      const investor2DateOfBirth = getInvestor2DateOfBirth(formData, ageShowMonth);
      handleChange('investor2', 'dateOfBirth', investor2DateOfBirth);
    }

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

  const spendHelpText = `The ASFA Retirement Standard suggests a comfortable retirement for ${
    formData.hasPartner ? 'couples' : 'a single person'
  } can be around $${formatCurrency(recommendedWeeklySpend)} per week`;

  return (
    <>
      <LongRequestOverlay visible={showLongRunningOverlay} />
      <SectionHeader title="You" icon={<PersonIcon />} />

      <InputField
        label="What is your current super balance?"
        value={formData.investor1.superAmount.toString()}
        onChange={(value) => {
          handleChange('investor1', 'superAmount', parseFloat(value) || 0);
          clearError('superBalance');
        }}
        placeholder="Enter amount"
        prefix="$"
        required={true}
        error={validationErrors.superBalance}
        name="superBalance"
        min={minSuperBalance}
        max={maxSuperBalance}
        type="text"
      />

      <OptionSelector
        label="What is your gender?"
        value={formData.investor1.gender}
        onChange={(value) => {
          handleChange('investor1', 'gender', value);
          if (value.trim()) {
            clearError('gender');
          }
        }}
        options={['Male', 'Female', 'Other']}
        error={validationErrors.gender}
      />

      <InputField
        label="What is your age?"
        value={formData.youAge}
        onChange={(value) => {
          handleChange('youAge', value);
          clearError('age');
        }}
        placeholder="Enter age"
        note={`*Note the minimum age for this tool is ${minAge} and the maximum age is ${maxAge}. `}
        error={validationErrors.age}
        name="age"
        min={minAge}
        max={maxAge}
        type="text"
      />

      {formData.youAge.trim() && parseInt(formData.youAge) === ageShowMonth && (
        <Dropdown
          label="What month were you born in?"
          value={getMonthLabel(formData.youBirthMonth)}
          onChange={(selected) => {
            const selectedMonth = monthOptions.find((month) => month.label === selected);
            handleChange('youBirthMonth', selectedMonth ? selectedMonth.value : '');
            clearError('birthMonth');
          }}
          options={['Select month', ...monthOptions.map((month) => month.label)]}
          error={validationErrors.birthMonth}
        />
      )}
      {validationErrors.birthMonth && (
        <p className="font-roboto mb-8 text-xs text-error-red-light">
          {validationErrors.birthMonth}
        </p>
      )}

      <SectionHeader
        title="Add your partner"
        icon={<PersonIcon />}
        action={
          <button
            type="button"
            onClick={handlePartnerToggle}
            className="font-roboto cursor-pointer text-lg font-bold text-bright-navy underline"
          >
            {formData.hasPartner ? 'Remove' : 'Add'}
          </button>
        }
      />

      {formData.hasPartner && (
        <div className="space-y-4">
          <InputField
            label="What is your partner's current super balance?"
            value={formData.investor2.superAmount.toString()}
            onChange={(value) => {
              handleChange('investor2', 'superAmount', parseFloat(value) || 0);
              clearError('partnerSuperBalance');
            }}
            placeholder="Enter amount"
            prefix="$"
            error={validationErrors.partnerSuperBalance}
            name="partnerSuperBalance"
          />

          <OptionSelector
            label="What is your partner's gender?"
            value={formData.investor2.gender}
            onChange={(value) => {
              handleChange('investor2', 'gender', value);
              if (value.trim()) {
                clearError('partnerGender');
              }
            }}
            options={['Male', 'Female', 'Other']}
            error={validationErrors.partnerGender}
          />

          <InputField
            label="What is your partner's age?"
            value={formData.partnerAge}
            onChange={(value) => {
              handleChange('partnerAge', value);
              clearError('partnerAge');
            }}
            placeholder="Enter age"
            note={`*Note the minimum age for this tool is ${minAge} and the maximum age is ${maxAge}. `}
            error={validationErrors.partnerAge}
            name="partnerAge"
            min={minAge}
            max={maxAge}
            type="text"
          />
          {formData.partnerAge.trim() && parseInt(formData.partnerAge) === ageShowMonth && (
            <Dropdown
              label="What month were you born in?"
              value={getMonthLabel(formData.partnerBirthMonth)}
              onChange={(selected) => {
                const selectedMonth = monthOptions.find((month) => month.label === selected);
                handleChange('partnerBirthMonth', selectedMonth ? selectedMonth.value : '');
                clearError('partnerBirthMonth');
              }}
              options={['Select month', ...monthOptions.map((month) => month.label)]}
              error={validationErrors.partnerbirthMonth}
            />
          )}
          {validationErrors.partnerBirthMonth && (
            <p className="font-roboto mb-8 text-xs text-error-red-light">
              {validationErrors.partnerbirthMonth}
            </p>
          )}

          <hr className="my-8 h-px border-0 bg-grey dark:bg-grey" />
        </div>
      )}
      <div className="mt-2">
        {(() => {
          const spendPerWeekValue = formData.spendPerWeek ?? recommendedWeeklySpend ?? '';
          return (
            <InputField
              label="Tell us your estimated weekly spending in retirement"
              value={String(spendPerWeekValue)}
              onChange={handleWeeklySpendChange}
              placeholder="Enter amount"
              prefix="$"
              description={spendHelpText}
              error={validationErrors.spendPerWeek}
            />
          );
        })()}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="font-roboto cursor-pointer rounded-sm bg-bright-teal px-6 py-3 text-lg font-bold text-bright-navy disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'SUBMITTING...' : 'START ESTIMATING'}
      </button>
    </>
  );
}

export default Step1Form;
