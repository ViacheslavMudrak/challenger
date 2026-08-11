import { unstable_cache as cache } from 'next/cache';

export enum PaymentFrequency {
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  HalfYearly = 'HalfYearly',
  Yearly = 'Yearly',
}

interface pricingRequestProp {
  Term: number;
  PaymentFrequency: string;
  InvestmentAmount: number;
  RatesDate: string;
  RcvRate: number;
  RequestID?: string;
}

export const getPricing = async (
  token: string,
  amount: number,
  frequency: PaymentFrequency
): Promise<string> => {
  const pricingUrl = process.env.PRICING_URL || '';
  const australianAnnuityDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Australia/Sydney',
  });
  const currentDateString = getFormattedDateForAPI(australianAnnuityDate);
  //const currentDateString = getFormattedDate(new Date().toISOString(), 'YYYY-MM-DD');
  let termStart = frequency === PaymentFrequency.Yearly ? 2 : 1;
  const jsonData: pricingRequestProp[] = [];

  for (let i = 5; termStart <= i; termStart++) {
    jsonData.push({
      Term: termStart,
      RequestID: `${termStart}`,
      PaymentFrequency: frequency.toString(),
      InvestmentAmount: parseInt(amount.toString()),
      RatesDate: currentDateString,
      RcvRate: 1,
    });
  }
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const response = await fetch(pricingUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(jsonData),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error('Unable to fixed term rates');
  }
  return data;
};

const getFormattedDateForAPI = (dateStr: string) => {
  const [month, date, year] = dateStr.split('/');
  return `${year}-${month?.length == 1 ? '0' + month : month}-${date?.length == 1 ? '0' + date : date}`;
};

export const getStandardPricing = async (token: string, term = 3): Promise<string> => {
  const url = process.env.STANDARD_PRICING_URL || '';
  const australianAnnuityDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Australia/Sydney',
  });
  const currentDateString = getFormattedDateForAPI(australianAnnuityDate);
  //const currentDateString = getFormattedDate(new Date().toISOString(), 'YYYY-MM-DD');
  const jsonData: pricingRequestProp = {
    Term: term,
    PaymentFrequency:
      term === 1 ? PaymentFrequency.Monthly.toString() : PaymentFrequency.Yearly.toString(),
    InvestmentAmount: 10000,
    RatesDate: currentDateString,
    RcvRate: 1,
  };
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(jsonData) });

  const data = await response.json();

  if (data.error) {
    throw new Error(`Unable to get standard fixed term rate ${data.error}`);
  }

  return data;
};

const getOktaAccessToken = async (): Promise<string> => {
  console.log('[from PRICING API: OktaAccessToken] Starting token request');
  const url = process.env.OKTA_URL || '';
  const clientId = process.env.OKTA_CLIENT_ID;
  const clientSecret = process.env.OKTA_CLIENT_SECRET;
  const clientScope = process.env.OKTA_SCOPE;

  console.log('[getOktaAccessToken] Request URL:', url);
  console.log('[getOktaAccessToken] Client ID:', clientId ? '***' : 'missing');
  console.log('[getOktaAccessToken] Client Secret:', clientSecret ? '***' : 'missing');
  console.log('[getOktaAccessToken] Scope:', clientScope);

  const body = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}&scope=${clientScope}`;
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  };
  const response = await fetch(url, { method: 'POST', headers, body });
  console.log('[getOktaAccessToken] Response status:', response.status);
  const data = await response.json();
  console.log(
    '[getOktaAccessToken] Response data:',
    data.error ? { error: data.error } : { success: true }
  );

  if (data.error) {
    console.error('[getOktaAccessToken] Error getting token:', data.error);
    throw new Error('Unable to get token');
  }
  console.log('[getOktaAccessToken] Token retrieved successfully');
  return data.access_token;
};

const getCachedAccessToken = cache(() => getOktaAccessToken(), ['cache-okta-token'], {
  revalidate: 3540,
});

export const getAccessToken = (): Promise<string> => {
  console.log('[from PRICING API getAccessToken] Requesting access token (may use cache)');
  const token = getCachedAccessToken();
  console.log('[from PRICING API getAccessToken] Token promise returned');
  return token;
};
