import { getFormattedAmount } from 'lib/challenger/helpers';
import { RatesTableDropDown } from './RatesTable.dropDown';
import { fiProp } from 'lib/challenger/interfaces';
import { usePricing } from 'lib/challenger/usePricing';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const RatesTableLifetimeAnnuityIdp = () => {
  const { immediatePayments } = usePricing('getFI');
  const [gender, setGender] = useState<string>('F');
  const [filteredImmediatePayments, setFilteredImmediatePayments] = useState<fiProp>();

  useEffect(() => {
    if (immediatePayments?.Rates) {
      setFilteredImmediatePayments({
        ValidFromDate: immediatePayments.ValidFromDate,
        ValidToDate: immediatePayments.ValidToDate,
        Rates: immediatePayments?.Rates.filter((p) => p.Gender === gender),
      });
    }
  }, [immediatePayments, gender]);

  const renderRates = () => {
    return (
      filteredImmediatePayments?.Rates &&
      filteredImmediatePayments.Rates.map((r) => {
        return (
          <tr key={r.Age}>
            <td>{r.Age}</td>
            <td>{r.WithPeriod}</td>
            <td>{getFormattedAmount(r.Full, 0)}</td>
            <td>{getFormattedAmount(r.Partial, 0)}</td>
            <td>{getFormattedAmount(r.Nil, 0)}</td>
            <td>{getFormattedAmount(r.RBACashLinked, 0)}</td>
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
    return `Current from ${dayjs(immediatePayments?.ValidFromDate).format(dateFormat)} to ${dayjs(immediatePayments?.ValidToDate).format(dateFormat)}`;
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="text-left">{renderDate()}</span>
      <RatesTableDropDown onClick={handleClick} />
      <div className="w-full overflow-auto">
        <table className="rates-table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Withdrawal period</th>
              <th colSpan={4}>Amount of inflation protection</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Full</th>
              <th>Partial</th>
              <th>Nil</th>
              <th>RBA Cash Linked</th>
            </tr>
          </thead>
          <tbody>{renderRates()}</tbody>
        </table>
      </div>
    </div>
  );
};

// Lifetime annuity | Immediate payments

export default RatesTableLifetimeAnnuityIdp;
