export type HeadingType = 'h2' | 'h3' | 'h4';

export type Investment = {
  term: number;
  rate: string;
  income: number;
  frequency: 'monthly' | 'annually';
};

export type Pricing = {
  regularPayment: number;
  annualPayment: number;
  regularPaymentBeforeAsf: number;
  annualPaymentBeforeAsf: number;
  annualEarningRates: AnnualEarningRate[];
  requestId?: string;
};

export type AnnualEarningRate = {
  type: string;
  value: number;
};

export type PricingResponse = {
  accessToken: string;
  pricingUrl: string;
};

export type RatesType = 'ImmediatePayments' | 'DeferredPayments' | 'MarketLinkedPayments';
