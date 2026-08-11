import { getFormattedAmount } from 'lib/challenger/helpers';
import { RatesTableDropDown } from './RatesTable.dropDown';
import { dlaProp } from 'lib/challenger/interfaces';
import { usePricing } from 'lib/challenger/usePricing';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const RatesTableLifetimeAnnuityDfp = () => {
  const { deferredPayments } = usePricing('getDLA');
  const [gender, setGender] = useState<string>('F');
  const [filteredDeferredPayments, setFilteredDeferredPayments] = useState<dlaProp>();

  useEffect(() => {
    if (deferredPayments?.Rates) {
      setFilteredDeferredPayments({
        ValidFromDate: deferredPayments.ValidFromDate,
        ValidToDate: deferredPayments.ValidToDate,
        Rates: deferredPayments?.Rates.filter((p) => p.Gender === gender),
      });
    }
  }, [deferredPayments, gender]);

  const renderRates = () => {
    return (
      filteredDeferredPayments &&
      filteredDeferredPayments.Rates.map((r) => {
        return (
          <tr key={r.Age}>
            <td>{r.Age}</td>
            <td>{r.WithPeriod}</td>
            <td>{getFormattedAmount(r.AgePayment80, 0)}</td>
            <td>{getFormattedAmount(r.AgePayment85, 0)}</td>
            <td>{getFormattedAmount(r.AgePayment90, 0)}</td>
          </tr>
        );
      })
    );
  };

  const handleClick = (value: string) => {
    setGender(value);
  };

  const renderDate = () => {
    const dateFormat = 'DD MMM YYYY';
    return `Current from ${dayjs(deferredPayments?.ValidFromDate).format(dateFormat)} to ${dayjs(deferredPayments?.ValidToDate).format(dateFormat)}`;
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="text-left">{renderDate()}</span>
      <RatesTableDropDown onClick={handleClick} />
      <div className="w-full overflow-auto">
        <table className="rates-table overflow-auto">
          <thead>
            <tr>
              <th>Age</th>
              <th>Withdrawal period</th>
              <th colSpan={3}>Payment commence age</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Age 80</th>
              <th>Age 85</th>
              <th>Age 90</th>
            </tr>
          </thead>
          <tbody>{renderRates()}</tbody>
        </table>
      </div>
    </div>
  );
};

// Lifetime Annuity | Deferred payments

export default RatesTableLifetimeAnnuityDfp;
