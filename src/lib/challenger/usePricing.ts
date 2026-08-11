import { Pricing } from 'components/RatesTable/RatesTable.types';
import { useEffect, useState } from 'react';
import { careplusProp, dlaProp, fiProp, mlaProp } from './interfaces';

export type PricingMode = 'getCarePlus' | 'standard' | 'getDLA' | 'getFI' | 'getMLA';

export const usePricing = (mode: PricingMode = 'standard') => {
  const [rate, setRate] = useState<string>();
  const [carePlusRates, setCarePlusRates] = useState<careplusProp>();
  const [deferredPayments, setDeferredPayments] = useState<dlaProp>();
  const [immediatePayments, setImmediatePayments] = useState<fiProp>();
  const [marketLinkedPayments, setMarketLinkedPayments] = useState<mlaProp>();

  useEffect(() => {
    const getData = async () => {
      if (mode === 'standard') {
        const res = await fetch(`${process.env.PUBLIC_URL}/api/standardPricing?mode=${mode}`);
        const jsonResponse = await res.json();
        const pricing = jsonResponse.data as Pricing;
        const earningRate = pricing.annualEarningRates.find((t) => t.type === 'EffectiveBeforeAsf');

        if (earningRate) {
          setRate((earningRate.value * 100).toPrecision(3));
          return;
        }
      }

      // carePlus
      if (mode === 'getCarePlus') {
        const res = await fetch(`${process.env.PUBLIC_URL}/api/standardPricing?mode=${mode}`);
        const data = (await res.json()) as careplusProp;

        setCarePlusRates(data);
        return;
      }

      // Deferred payments
      if (mode === 'getDLA') {
        const res = await fetch(`${process.env.PUBLIC_URL}/api/standardPricing?mode=${mode}`);
        const data = (await res.json()) as dlaProp;

        setDeferredPayments(data);
        return;
      }

      // Immediate payments
      if (mode === 'getFI') {
        const res = await fetch(`${process.env.PUBLIC_URL}/api/standardPricing?mode=${mode}`);
        const data = (await res.json()) as fiProp;

        setImmediatePayments(data);
        return;
      }

      // Market-linked payments
      if (mode === 'getMLA') {
        const res = await fetch(`${process.env.PUBLIC_URL}/api/standardPricing?mode=${mode}`);
        const data = (await res.json()) as mlaProp;

        setMarketLinkedPayments(data);
        return;
      }
    };

    getData();
  }, [mode]);

  return {
    rate,
    carePlusRates,
    deferredPayments,
    immediatePayments,
    marketLinkedPayments,
  };
};
