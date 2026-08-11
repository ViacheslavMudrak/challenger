import { unstable_cache as cache } from 'next/cache';

export const formatCurrency = (
  value: number,
  locale = 'en-AU',
  options: Intl.NumberFormatOptions = {}
) => {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  });

  return formatter.format(value);
};

export const parseNumeric = (value: unknown): number | null => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value === 'string') {
    const cleaned = value.replace(/,/g, '').trim();
    if (cleaned === '') return null;
    const asNumber = Number(cleaned);
    return Number.isFinite(asNumber) ? asNumber : null;
  }
  return null;
};

/**
 * Parse a value to a float, returning undefined if it's not a valid positive number.
 * Used for parsing financial values (income, amounts, etc.)
 */
export const parseValue = (value: string | number | undefined): number | undefined => {
  const parsed = typeof value === 'number' ? value : parseFloat(String(value || ''));
  return !isNaN(parsed) && parsed > 0 ? parsed : undefined;
};

/**
 * Parse a value to an integer, returning undefined if it's not a valid positive number.
 * Used for parsing integer values (years, counts, etc.)
 */
export const parseIntValue = (value: string | number | undefined): number | undefined => {
  const parsed = typeof value === 'number' ? value : parseInt(String(value || ''), 10);
  return !isNaN(parsed) && parsed > 0 ? parsed : undefined;
};

// Transform Step1Financial API response into Step2Results-friendly shape
export const transformCalcResult = (raw: unknown): Record<string, unknown> | null => {
  const r = (raw as Record<string, unknown>) || {};
  if (!r || typeof r !== 'object') return null;
  const success = r.success as boolean | undefined;
  const data = r.data as Record<string, unknown> | undefined;
  if (!success || !data || typeof data !== 'object') return null;

  const numberOfIncomeYears = data.numberOfIncomeYears as number | undefined;
  const twentyFivePercentSurvivalYear = data.twentyFivePercentSurvivalYear as number | undefined;
  const agePensionStatus = data.agePensionStatus as string | undefined;
  const agePensionPerFortnight = data.agePensionPerFortnight as number | undefined;

  // Format pension amount as currency-like string for display
  const formattedPension =
    typeof agePensionPerFortnight === 'number'
      ? `$${agePensionPerFortnight.toLocaleString()}`
      : undefined;

  return {
    yearsToRunOut: numberOfIncomeYears,
    twentyFivePercentSurvivalYear: twentyFivePercentSurvivalYear,
    combinedYears: numberOfIncomeYears,
    agePensionStatus: agePensionStatus,
    partPensionAmount: formattedPension,
    // Chart fields not provided by API; Step2Results will fallback
    chartStartAge: undefined,
    chartEndAge: undefined,
    superLastsUntilAge: undefined,
    investorAge: undefined,
    partnerAge: undefined,
  };
};

/**
 * Calculate date of birth from age and birth month
 * @param age - The age as a string
 * @param birthMonth - The birth month as a string (1-12)
 * @returns Date of birth in format "01-Jan-YYYY" or empty string if invalid
 */
export function calculateBirthDate(age: string, birthMonth: string): string {
  if (!age || !birthMonth) return '';

  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - parseInt(age);
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const monthIndex = parseInt(birthMonth) - 1;
  const monthName = monthNames[monthIndex];

  return `01-${monthName}-${birthYear}`;
}

/**
 * Internal helper to calculate dateOfBirth from an existing DOB or age + birth month.
 * Shared by investor 1 and investor 2 helpers.
 */
function getInvestorDateOfBirth(age: string, birthMonth: string, ageShowMonth?: number): string {
  // // Use stored dateOfBirth if available
  // if (existingDateOfBirth) {
  //   return existingDateOfBirth;
  // }

  // Otherwise calculate from age and birth month
  const ageNum = age ? parseInt(age, 10) : null;
  const shouldUseBirthMonth =
    ageNum !== null && !isNaN(ageNum) && ageShowMonth !== undefined && ageNum === ageShowMonth;
  const effectiveBirthMonth = shouldUseBirthMonth ? birthMonth || '1' : '1';
  return calculateBirthDate(age, effectiveBirthMonth);
}

/**
 * Calculate dateOfBirth for investor1 from formData
 * Uses stored dateOfBirth if available, otherwise calculates from youAge and youBirthMonth
 * @param formData - The form data containing age and birth month info
 * @param ageShowMonth - The age threshold where birth month is required
 * @returns Date of birth string
 */
export function getInvestor1DateOfBirth(
  formData: { investor1: { dateOfBirth: string }; youAge: string; youBirthMonth: string },
  ageShowMonth?: number
): string {
  return getInvestorDateOfBirth(formData.youAge, formData.youBirthMonth, ageShowMonth);
}

/**
 * Calculate dateOfBirth for investor2 (partner) from formData
 * Uses stored dateOfBirth if available, otherwise calculates from partnerAge and partnerBirthMonth
 * @param formData - The form data containing age and birth month info
 * @param ageShowMonth - The age threshold where birth month is required
 * @returns Date of birth string
 */
export function getInvestor2DateOfBirth(
  formData: { investor2: { dateOfBirth: string }; partnerAge: string; partnerBirthMonth: string },
  ageShowMonth?: number
): string {
  return getInvestorDateOfBirth(formData.partnerAge, formData.partnerBirthMonth, ageShowMonth);
}

export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

export function toString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  return typeof value === 'string' && value.length > 0 ? value : null;
}

const getEmailOktaAccessToken = async (): Promise<string> => {
  console.log('[getEmailOktaAccessToken] Starting token request');
  const url = process.env.OKTA_URL || '';
  const clientId = process.env.EMAIL_OKTA_CLIENT_ID;
  const clientSecret = process.env.EMAIL_OKTA_CLIENT_SECRET;
  const clientScope = process.env.EMAIL_OKTA_SCOPE;

  const body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=${clientScope}`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };

  const response = await fetch(url, { method: 'POST', headers, body });
  console.log('[getEmailOktaAccessToken] Response status:', response.status);

  const data = await response.json();
  console.log(
    '[getEmailOktaAccessToken] Response data:',
    data.error ? { error: data.error } : { success: true }
  );

  if (data.error) {
    console.error('[getEmailOktaAccessToken] Error getting token:', data.error);
    throw new Error('Unable to get token');
  }

  console.log('[getEmailOktaAccessToken] Token retrieved successfully');
  return data.access_token;
};

const getCachedAccessToken = cache(() => getEmailOktaAccessToken(), ['cache-email-okta-token'], {
  revalidate: 3540,
});

export const getAccessToken = (): Promise<string> => {
  console.log('[getAccessToken] Requesting access token (may use cache)');
  const token = getCachedAccessToken();
  console.log('[getAccessToken] Token promise returned');
  return token;
};

export const sendRwcValues = async (token: string, payload: unknown) => {
  const rwcUrl = `${process.env.RETIREMENT_INCOME_BASE_URL}/retirementIncome/calculate`;
  const headers = {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    // 'Ocp-Apim-Subscription-Key': `${token}`,
    'X-Correlation-ID': 'test',
  };

  // Log request details (without payload or credentials)
  console.log('[RWC Calculate] Request URL:', rwcUrl);

  const response = await fetch(rwcUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload), // forward the JSON body
  });

  if (!response.ok) {
    // Try to read the error response body
    let errorBody: string | unknown = null;
    let errorMessage = `HTTP ${response.status} ${response.statusText}`;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorBody = await response.json();
        console.error('[RWC Calculate] Error response body:', JSON.stringify(errorBody, null, 2));

        // Extract error message from response if available
        if (typeof errorBody === 'object' && errorBody !== null) {
          const errorObj = errorBody as Record<string, unknown>;
          if (errorObj.message) {
            errorMessage = String(errorObj.message);
          } else if (errorObj.error) {
            errorMessage = String(errorObj.error);
          } else if (errorObj.errors) {
            errorMessage = JSON.stringify(errorObj.errors);
          }
        }
      } else {
        const textBody = await response.text();
        errorBody = textBody;
        console.error('[RWC Calculate] Error response body (text):', textBody);
        errorMessage = textBody || errorMessage;
      }
    } catch (parseError) {
      console.error('[RWC Calculate] Failed to parse error response:', parseError);
    }

    console.error('[RWC Calculate] Response status:', response.status);

    throw new Error(
      `Unable to send RWC calculate values: ${errorMessage} (Status: ${response.status})`
    );
  }

  const data = await response.json();
  console.log(
    '[RWC Calculate] Response data received:',
    data.error ? { error: data.error } : { success: true, hasData: !!data }
  );

  if (data.error) {
    console.error('[RWC Calculate] API returned error in response data:', data.error);
    throw new Error(
      `Unable to send RWC calculate values: ${typeof data.error === 'string' ? data.error : JSON.stringify(data.error)}`
    );
  }

  console.log('[RWC Calculate] Successfully completed request');
  return data;
};

export const sendRwcEmail = async (token: string, payload: unknown) => {
  const rwcUrl = `${process.env.EMAIL_BASE_URL}/emails`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  console.log('[RWC Email] Request URL:', rwcUrl);

  const response = await fetch(rwcUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload), // forward the JSON body
  });

  if (!response.ok) {
    let errorBody: string | unknown = null;
    let errorMessage = `HTTP ${response.status} ${response.statusText}`;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorBody = await response.json();
        console.error('[RWC Email] Error response body:', JSON.stringify(errorBody, null, 2));

        if (typeof errorBody === 'object' && errorBody !== null) {
          const errorObj = errorBody as Record<string, unknown>;
          if (errorObj.message) {
            errorMessage = String(errorObj.message);
          } else if (errorObj.error) {
            errorMessage = String(errorObj.error);
          }
        }
      } else {
        const textBody = await response.text();
        errorBody = textBody;
        console.error('[RWC Email] Error response body (text):', textBody);
        errorMessage = textBody || errorMessage;
      }
    } catch (parseError) {
      console.error('[RWC Email] Failed to parse error response:', parseError);
    }

    throw new Error(
      `Unable to send RWC email values: ${errorMessage} (Status: ${response.status})`
    );
  }

  console.log('[RWC Email] Response status:', response.status);

  const data = await response.json();
  console.log(
    '[RWC Email] Response data received:',
    data.error ? { error: data.error } : { success: true, hasData: !!data }
  );

  if (data.error) {
    console.error('[RWC Email] API returned error in response data:', data.error);
    throw new Error(
      `Unable to send RWC email values: ${typeof data.error === 'string' ? data.error : JSON.stringify(data.error)}`
    );
  }

  console.log('[RWC Email] Successfully completed request');
  return data;
};

export const sendRwcProspect = async (payload: unknown) => {
  const rwcUrl = `${process.env.PROSPECT_BASE_URL}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-API-KEY': `${process.env.X_API_KEY}`,
  };

  console.log('[RWC Prospect] Request URL:', rwcUrl);

  const response = await fetch(rwcUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload), // forward the JSON body
  });

  if (!response.ok) {
    let errorBody: string | unknown = null;
    let errorMessage = `HTTP ${response.status} ${response.statusText}`;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorBody = await response.json();
        console.error('[RWC Prospect] Error response body:', JSON.stringify(errorBody, null, 2));

        if (typeof errorBody === 'object' && errorBody !== null) {
          const errorObj = errorBody as Record<string, unknown>;
          if (errorObj.message) {
            errorMessage = String(errorObj.message);
          } else if (errorObj.error) {
            errorMessage = String(errorObj.error);
          }
        }
      } else {
        const textBody = await response.text();
        errorBody = textBody;
        console.error('[RWC Prospect] Error response body (text):', textBody);
        errorMessage = textBody || errorMessage;
      }
    } catch (parseError) {
      console.error('[RWC Prospect] Failed to parse error response:', parseError);
    }

    throw new Error(
      `Unable to send RWC prospect values: ${errorMessage} (Status: ${response.status})`
    );
  }

  console.log('[RWC Prospect] Response status:', response.status);

  const data = await response.json();
  console.log(
    '[RWC Prospect] Response data received:',
    data.error ? { error: data.error } : { success: true, hasData: !!data }
  );

  if (data.error) {
    console.error('[RWC Prospect] API returned error in response data:', data.error);
    throw new Error(
      `Unable to send RWC prospect values: ${typeof data.error === 'string' ? data.error : JSON.stringify(data.error)}`
    );
  }

  console.log('[RWC Prospect] Successfully completed request');
  return data;
};

export const getRwcDefaultValues = async (token: string): Promise<string> => {
  console.log('[getRwcDefaultValues] Starting request');
  const rwcUrl = `${process.env.RETIREMENT_INCOME_BASE_URL}/defaults` || '';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };

  console.log('[getRwcDefaultValues] Request URL:', rwcUrl);

  const response = await fetch(rwcUrl, {
    method: 'GET',
    headers,
  });

  console.log('[getRwcDefaultValues] Response status:', response.status);
  console.log('[getRwcDefaultValues] Response headers:', Array.from(response.headers.entries()));

  const data = await response.json();
  console.log(
    '[getRwcDefaultValues] Response data:',
    data.error ? { error: data.error } : { success: true, hasData: !!data }
  );

  if (data.error) {
    console.error('[getRwcDefaultValues] Error in response:', data.error);
    throw new Error('Unable to get RWC Default values');
  }

  console.log('[getRwcDefaultValues] Successfully retrieved default values');
  return data;
};
