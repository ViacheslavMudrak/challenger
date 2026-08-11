import { LinkField } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import ButtonSolid from 'components/Button/Button.solid';
import { Variant } from 'components/Button/Button.types';
import { useCallback, useEffect, useState } from 'react';
import { Investment, Pricing } from './RatesTable.types';
import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';
import { useDebounceValue } from 'usehooks-ts';
import RatesTableSpinner from './RatesTable.spinner';
import { RatesTableProps } from './RatesTable';
import { getFormattedAmount } from 'lib/challenger/helpers';
import { PaymentFrequency } from 'lib/challenger/pricing';

const RatesTableItem = (props: RatesTableProps) => {
  const monthlyButton: LinkField = { value: { href: '', text: 'Monthly', target: '_blank' } };
  const annuallyButton: LinkField = { value: { href: '', text: 'Annually', target: '_blank' } };

  const {
    MaxAmount,
    MinAmount,
    InitialAmount,
    MaxAmountErrorMessage,
    MinAmountErrorMessage,
    RequiredErrorMessage,
  } = props.rendering.fields;
  const initialAmount = InitialAmount?.value;

  const [isMonthly, setIsMonthly] = useState<boolean>(false);
  const [rateList, setRateList] = useState<Investment[]>();
  const [validationError, setValidationError] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | undefined>(initialAmount);
  const [debouncedAmount, setDebouncedAmount] = useDebounceValue(initialAmount, 2000);
  const [isBusy, setIsBusy] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const maxAmount = MaxAmount?.value || 3999999;
  const minAmount = MinAmount?.value || 10000;

  const requiredErrorMessage = RequiredErrorMessage?.value || 'Investment amount is required';
  const maxAmountErrorMessage =
    MaxAmountErrorMessage?.value || `Max investment amount is ${getFormattedAmount(maxAmount)}`;
  const minAmountErrorMessage =
    MinAmountErrorMessage?.value || `Min investment amount is ${getFormattedAmount(minAmount)}`;

  const defaultRateData: Investment[] = [
    { term: 1, rate: '', income: 0, frequency: 'monthly' },
    { term: 2, rate: '', income: 0, frequency: 'monthly' },
    { term: 3, rate: '', income: 0, frequency: 'monthly' },
    { term: 4, rate: '', income: 0, frequency: 'monthly' },
    { term: 5, rate: '', income: 0, frequency: 'monthly' },
  ];

  const getRates = useCallback(async (amount: number, isMonthly: boolean) => {
    if (amount > 0) {
      setIsBusy(true);
      setHasError(false);

      const rateData: Investment[] = [];

      try {
        const frequency = isMonthly ? PaymentFrequency.Monthly : PaymentFrequency.Yearly;
        const response = await fetch(
          `${process.env.PUBLIC_URL}/api/pricing?amount=${amount}&frequency=${frequency}`
        );

        const jsonResponse = await response.json();
        const pricingList = jsonResponse.data.responses as Pricing[];

        if (pricingList && pricingList.length > 0) {
          pricingList.forEach((p) => {
            rateData.push({
              term: parseInt(p?.requestId ?? '0'),
              income: isMonthly ? p.regularPayment : p.annualPayment,
              rate: (p.annualEarningRates[0].value * 100).toPrecision(3),
              frequency: isMonthly ? 'monthly' : 'annually',
            });
          });
          rateData.sort((a, b) => a.term - b.term);
        }

        setRateList(
          rateData.filter((r) =>
            isMonthly ? r.frequency === 'monthly' : r.frequency === 'annually'
          )
        );
      } catch (error) {
        console.error('An error has occurred', error);
        setHasError(true);
      } finally {
        setIsBusy(false);
      }
    }
  }, []);

  const isFieldValid = useCallback(() => {
    const actualAmount = debouncedAmount || 0;

    if (actualAmount === 0 || actualAmount.toString().length === 0) {
      setErrorMessage(requiredErrorMessage);
      setValidationError(true);
      return false;
    }

    if (actualAmount > maxAmount) {
      setErrorMessage(maxAmountErrorMessage);
      setValidationError(true);
      return false;
    }

    if (actualAmount < minAmount) {
      setErrorMessage(minAmountErrorMessage);
      setValidationError(true);
      return false;
    }

    setValidationError(false);

    return true;
  }, [
    debouncedAmount,
    maxAmount,
    maxAmountErrorMessage,
    minAmount,
    minAmountErrorMessage,
    requiredErrorMessage,
  ]);

  useEffect(() => {
    if (debouncedAmount && debouncedAmount > 0) {
      const isValid = isFieldValid();

      if (isValid) {
        getRates(debouncedAmount, isMonthly);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAmount, getRates, isFieldValid]);

  const renderItem = (investment: Investment, idx: number) => {
    const yearPlural = investment.term <= 1 ? 'year' : 'years';
    const term = `${investment.term} ${yearPlural}`;
    const income = investment.income > 0 ? getFormattedAmount(investment.income) : '-';

    const frequencyLabel = isMonthly ? 'Monthly income payment' : 'Annual income payment';

    return (
      <div className="mt-5 flex w-full gap-2" key={idx}>
        <div className="flex w-full flex-col bg-white px-5 py-6 md:flex-row md:px-7">
          <div className="flex w-full flex-row md:w-8/12">
            <div className="flex w-6/12 flex-col justify-start gap-1 border-r-[1px] border-r-grey-dark pr-2">
              <span className="text-left font-roboto-700 text-sm text-blue md:text-base">
                Investment term
              </span>
              <span className="text-left font-roboto-700 text-[32px] text-bright-navy">{term}</span>
            </div>
            <div className="flex w-6/12 flex-col gap-1 pl-3 md:border-r-[1px] md:border-r-grey-dark md:pl-7">
              <span className="text-left font-roboto-700 text-sm text-blue md:text-base">
                Earning rate
              </span>
              <div className="flex items-start gap-2">
                <span className="text-left font-roboto-700 text-[32px] text-bright-navy">
                  {investment.rate !== '' ? investment.rate : '-'}
                </span>
                {investment.rate !== '' && (
                  <div className="relative flex flex-col text-bright-navy">
                    <span className="pt-2 font-roboto-700 text-base leading-none">%*</span>
                    <span className="absolute top-5 font-roboto-700 text-sm">p.a.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full flex-col gap-1 border-t-[1px] border-t-grey-dark pt-5 text-left md:mt-0 md:w-4/12 md:border-t-0 md:pl-7 md:pt-0">
            <span className="font-roboto-700 text-sm text-blue md:text-base">{frequencyLabel}</span>
            <span className="text-left font-roboto-700 text-[32px] text-bright-navy">{income}</span>
          </div>
        </div>
      </div>
    );
  };

  const handleClick = (isMonthly: boolean) => {
    const isValid = isFieldValid();

    if (isValid) {
      setIsMonthly(isMonthly);
      getRates(amount || 0, isMonthly);
    }
  };

  const handleValueChange = (
    _value: string,
    _name: string,
    values: CurrencyInputOnChangeValues
  ) => {
    setAmount(values.float || 0);
    setDebouncedAmount(values.float || 0);
  };

  const renderBusy = () => {
    if (!isBusy) {
      return <></>;
    }

    return (
      <div className="absolute z-30 m-auto flex h-full w-full items-center justify-center bg-black-25">
        <RatesTableSpinner />
      </div>
    );
  };

  const renderError = () => {
    return (
      <div
        className={classNames(
          'mt-4 flex w-full gap-3 bg-white p-4',
          'border-l-4 border-l-error-red-dark',
          'border-r-2 border-r-error-red-dark',
          'border-y-2 border-y-error-red-dark'
        )}
      >
        <span className="text-left text-error-red-dark">
          Something went wrong. Please wait a moment before trying again.
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <div className="flex flex-col gap-4 text-left">
          <label className="font-roboto-700 text-base text-bright-navy">Investment amount</label>
          <div className="flex flex-col gap-1">
            <CurrencyInput
              id="amount"
              name="inputAmount"
              placeholder="Amount"
              defaultValue={initialAmount}
              maxLength={10}
              prefix="$"
              disabled={isBusy}
              className={classNames(
                'h-14 w-full rounded-sm border-2 px-4 text-xl focus:border-blue focus:outline-none md:w-[320px]',
                { 'border-error-red-dark focus:border-error-red-dark': validationError },
                { 'border-grey-dark': !validationError }
              )}
              onValueChange={handleValueChange}
            />
            {validationError && <span className="text-sm text-error-red-dark">{errorMessage}</span>}
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <label className="text-left font-roboto-700 text-base text-bright-navy">
            Income payment frequency
          </label>
          <div className="flex flex-col xs:flex-row [&_button]:h-14 md:[&_button]:w-1/2 lg:[&_button]:w-60">
            <ButtonSolid
              variant={Variant.Solid}
              as="button"
              LinkValue={monthlyButton}
              onClick={() => handleClick(true)}
              isDisabled={isBusy}
              className={classNames(
                'rounded-none px-6',
                isMonthly ? 'bg-deep-blue text-white' : 'bg-grey text-bright-navy'
              )}
            />
            <ButtonSolid
              variant={Variant.Solid}
              as="button"
              LinkValue={annuallyButton}
              onClick={() => handleClick(false)}
              isDisabled={isBusy}
              className={classNames(
                'rounded-none px-6',
                !isMonthly ? 'bg-deep-blue text-white' : 'bg-grey text-bright-navy'
              )}
            />
          </div>
        </div>
      </div>
      {hasError && renderError()}
      <div className="relative h-fit w-full">
        {renderBusy()}
        {!isBusy &&
          !validationError &&
          (debouncedAmount || 0) > 0 &&
          rateList &&
          rateList.map((rate, idx) => renderItem(rate, idx))}
        {(isBusy || validationError || !rateList || rateList.length == 0 || debouncedAmount == 0) &&
          defaultRateData.map((rate, idx) => renderItem(rate, idx))}
      </div>
    </div>
  );
};

export default RatesTableItem;
