import { Pricing } from 'components/RatesTable/RatesTable.types';
import { useEffect, useState } from 'react';

type TermValues = '1' | '2' | '3' | '4' | '5';

type RatesData = {
  [key in TermValues]: string | undefined;
};

export const useFixedTermRates = (terms = ['3']) => {
  const [ratesData, setRatesData] = useState<RatesData>({
    '1': undefined,
    '2': undefined,
    '3': undefined,
    '4': undefined,
    '5': undefined,
  });

  useEffect(() => {
    const getData = async () => {
      if (terms && terms?.length === 0) return;

      terms.forEach(async (term) => {
        if (ratesData && ratesData[term as TermValues]) return;

        const res = await fetch(
          `${process.env.PUBLIC_URL}/api/standardPricing?mode=standard&term=${term}`
        );
        const jsonResponse = await res.json();
        const pricing = jsonResponse.data as Pricing;
        let earningRate;

        if (term === '1') {
          earningRate = pricing.annualEarningRates.find((t) => t.type === 'Nominal');
        } else {
          earningRate = pricing.annualEarningRates.find((t) => t.type === 'EffectiveBeforeAsf');
        }

        if (earningRate) {
          const fixedTermRate = (earningRate.value * 100).toPrecision(3);

          setRatesData((rates) => {
            return { ...rates, [`${term as TermValues}`]: fixedTermRate };
          });
        }
      });
    };

    getData();
  }, []);

  return {
    oneYearFixedTermRate: ratesData['1'],
    twoYearFixedTermRate: ratesData['2'],
    threeYearFixedTermRate: ratesData['3'],
    fourYearFixedTermRate: ratesData['4'],
    fiveYearFixedTermRate: ratesData['5'],
  };
};
