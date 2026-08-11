'use client';
import { useState } from 'react';
import { InputField } from './InputField';
import {
  LONG_API_REQUEST_OPTIONS,
  LONG_REQUEST_LOADER_DELAY_MS,
  postJsonWithRetry,
} from './apiClient';
import ErrorAlert from './ErrorAlert';
import LongRequestOverlay from './LongRequestOverlay';
import { useDelayedVisibility } from './useDelayedVisibility';

interface Step2ContactUsProps {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  onFieldChange: (field: 'firstName' | 'lastName' | 'email' | 'mobile', value: string) => void;
  onNext: () => void;
  employRemainYears?: string | number; // Primary Investor's employRemainYears
  youAge: string | number; // Primary Investor's age (required)
  onApiResult?: (hasError: boolean) => void; // Callback to track API errors
}

/**
 * Format Australian mobile number with spaces: +61 XXX XXX XXX
 * Only keeps digits after the +61 prefix, max 9 digits.
 */
function formatAusMobile(value: string): string {
  // Strip everything except digits
  const digitsOnly = value.replace(/\D/g, '');

  // Remove leading 61 if user typed it (we always prepend +61)
  const withoutCountryCode = digitsOnly.startsWith('61')
    ? digitsOnly.slice(2)
    : digitsOnly.startsWith('0')
      ? digitsOnly.slice(1) // Remove leading 0 if typed (e.g. 0421...)
      : digitsOnly;

  // Limit to 9 digits (standard Australian mobile without country code)
  const trimmed = withoutCountryCode.slice(0, 9);

  if (trimmed.length === 0) {
    return '+61 ';
  }

  // Format as: +61 XXX XXX XXX
  let formatted = '+61 ';
  for (let i = 0; i < trimmed.length; i++) {
    if (i === 3 || i === 6) {
      formatted += ' ';
    }
    formatted += trimmed[i];
  }

  return formatted;
}

export default function Step2ContactUs({
  firstName,
  lastName,
  email,
  mobile,
  onFieldChange,
  onNext,
  employRemainYears,
  youAge,
  onApiResult,
}: Step2ContactUsProps) {
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    submit?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showLongRunningOverlay = useDelayedVisibility(isSubmitting, LONG_REQUEST_LOADER_DELAY_MS);

  // Format mobile for display (always show +61 prefix)
  const displayMobile = mobile ? formatAusMobile(mobile) : '+61 ';

  // Handle mobile input - only accept digits
  const handleMobileChange = (value: string) => {
    const formatted = formatAusMobile(value);
    // Store the formatted value (parent can extract digits if needed)
    onFieldChange('mobile', formatted);
  };

  const validateForm = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
    } = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: undefined }));

    // const pad2 = (value: number) => String(value).padStart(2, '0');

    // Generate date string in dd_MM_yy format
    // const today = new Date();
    // const day = pad2(today.getDate());
    // const month = pad2(today.getMonth() + 1);
    // const year = String(today.getFullYear()).slice(-2);
    // const dateStr = `${day}_${month}_${year}`;

    // Build datakey in the format:
    // RII_yyyyMMddHHmm_<32-char-guid-without-dashes>
    // const dateKeyPart = `${today.getFullYear()}${pad2(
    //   today.getMonth() + 1
    // )}${pad2(today.getDate())}${pad2(today.getHours())}${pad2(today.getMinutes())}`;

    // const browserCrypto =
    //   typeof window !== 'undefined' && window.crypto ? window.crypto : undefined;

    // const guidNoDashes =
    //   browserCrypto && 'randomUUID' in browserCrypto
    //     ? browserCrypto.randomUUID().replace(/-/g, '')
    //     : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    //         .replace(/[xy]/g, (c) => {
    //           const r = (Math.random() * 16) | 0;
    //           const v = c === 'x' ? r : (r & 0x3) | 0x8;
    //           return v.toString(16);
    //         })
    //         .replace(/-/g, '');

    // const dataKey = `RII_${dateKeyPart}_${guidNoDashes}`;

    try {
      // const emailData = {
      //   To: email,
      //   Subject: 'Your retire with confidence guide is ready',
      //   From: 'info@challenger.com.au',
      //   UrlName: 'Drive-SIT4',
      //   Filename: `Retirement_income_guide_results_${dateStr}.pdf`,
      //   Parameters: {
      //     datakey: dataKey,
      //     d_m: '1',
      //     d_c: '1',
      //     d_yrs: '0',
      //     d_samnt: '1',
      //     d_apinc: '1',
      //     d_opt: '0',
      //     d_apstat: '',
      //     d_apsect: '1',
      //     d_ap: '1',
      //   },
      // };

      // Build prospect data with all form values that exist
      const prospectData: Record<string, string | Array<{ Key: string; Value: string }>> = {
        // Hidden mandatory default fields
        sourceSystem: 'Challenger',
        status: 'Pending',
        source: 'Drive tool results',
        type: 'Customer Lead',
      };

      // Add form values if they exist
      if (firstName) prospectData.firstName = firstName;
      if (lastName) prospectData.lastName = lastName;
      if (email) prospectData.email = email;
      if (mobile) prospectData.mobile = mobile;

      // Build options array
      const options: Array<{ Key: string; Value: string }> = [];

      // Add default Country option
      options.push({
        Key: 'Country',
        Value: 'Australia',
      });

      // Add "Year of intended retirement" if Primary Investor's EmployRemainYear is greater than 0
      if (employRemainYears) {
        const years =
          typeof employRemainYears === 'string'
            ? parseInt(employRemainYears, 10)
            : employRemainYears;
        if (!isNaN(years) && years > 0) {
          const currentYear = new Date().getFullYear();
          const retirementYear = currentYear + years;
          options.push({
            Key: 'Year of intended retirement',
            Value: retirementYear.toString(),
          });
        }
      }

      // Add "Year of birth" (required field)
      const age = typeof youAge === 'string' ? parseInt(youAge, 10) : youAge;
      if (!isNaN(age) && age > 0) {
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - age;
        options.push({
          Key: 'Year of birth',
          Value: birthYear.toString(),
        });
      }

      // Always add options array (at minimum it will have Country)
      prospectData.options = options;

      // --- Original: call both APIs concurrently (comment out to use prospect-only below) ---
      // const [emailResponse, prospectResponse] = await Promise.allSettled([
      //   fetch('/api/rwcEmail', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(emailData),
      //   }),
      //   fetch('/api/rwcProspect', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(prospectData),
      //   }),
      // ]);
      // let hasError = false;
      // if (emailResponse.status === 'rejected') {
      //   hasError = true;
      //   throw new Error('Failed to send email');
      // }
      // if (emailResponse.status === 'fulfilled' && !emailResponse.value.ok) {
      //   hasError = true;
      //   const errorData = await emailResponse.value.json().catch(() => ({}));
      //   throw new Error(errorData.error || 'Failed to send email');
      // }
      // if (prospectResponse.status === 'rejected') {
      //   console.error('Failed to submit prospect data:', prospectResponse.reason);
      //   hasError = true;
      // } else if (prospectResponse.status === 'fulfilled' && !prospectResponse.value.ok) {
      //   const errorData = await prospectResponse.value.json().catch(() => ({}));
      //   console.error('Prospect API error:', errorData);
      //   hasError = true;
      // }
      // --- End original ---

      // Call prospect API only
      let hasError = false;
      const prospectResponse = await postJsonWithRetry<Record<string, unknown>>(
        '/api/rwcProspect',
        prospectData,
        LONG_API_REQUEST_OPTIONS
      );
      if (!prospectResponse.ok) {
        console.error('Prospect API error:', prospectResponse.error);
        hasError = true;
        throw new Error(prospectResponse.error || 'Failed to submit. Please try again.');
      }

      // Notify parent component about API result
      if (onApiResult) {
        onApiResult(hasError);
      }

      // Email sent successfully, proceed to next step
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors((prev) => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to submit. Please try again.',
      }));
      // Notify parent component about API error
      if (onApiResult) {
        onApiResult(true);
      }
    } finally {
      setIsSubmitting(false);
      onNext();
    }
  };

  const handleFieldChange = (
    field: 'firstName' | 'lastName' | 'email' | 'mobile',
    value: string
  ) => {
    onFieldChange(field, value);
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof typeof errors];
        return newErrors;
      });
    }
  };

  return (
    <>
      <LongRequestOverlay
        visible={showLongRunningOverlay}
        title="Still submitting your details"
        description="This is taking longer than usual. We are retrying automatically."
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="First name*"
          value={firstName}
          onChange={(value) => handleFieldChange('firstName', value)}
          placeholder="Enter your name"
          type="text"
          required
          labelColor="text-bright-navy"
          error={errors.firstName}
        />
        <InputField
          label="Last name*"
          value={lastName}
          onChange={(value) => handleFieldChange('lastName', value)}
          placeholder="Enter your name"
          type="text"
          required
          labelColor="text-bright-navy"
          error={errors.lastName}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Email address*"
          value={email}
          onChange={(value) => handleFieldChange('email', value)}
          placeholder="Enter your email"
          type="email"
          required
          labelColor="text-bright-navy"
          error={errors.email}
        />
        <InputField
          label="Mobile (optional)"
          value={displayMobile}
          onChange={handleMobileChange}
          placeholder="+61 XXX XXX XXX"
          type="tel"
          labelColor="text-bright-navy"
        />
      </div>
      <p className="font-roboto mb-8 text-base text-bright-navy">
        By subscribing, I confirm I live in Australia and agree to receive marketing updates from
        Challenger. I accept the terms of Challenger&apos;s Privacy Policy and understand I can
        unsubscribe anytime via the link in the communication or by calling{' '}
        <a href="tel:133566">13 35 66</a>.
      </p>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="font-roboto w-full cursor-pointer rounded-sm bg-bright-teal px-4 py-3 text-base font-bold text-bright-navy disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-6 sm:text-lg"
        >
          {isSubmitting ? 'SUBMITTING...' : 'SEE MY RESULTS'}
        </button>
        {errors.submit && (
          <ErrorAlert
            className="mt-4"
            title="We couldn't submit your details"
            message="Please check your connection and try again."
            details={errors.submit}
          />
        )}
      </div>
    </>
  );
}
