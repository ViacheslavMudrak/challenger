import { getFormattedAmount } from 'lib/challenger/helpers';
import { RatesTableDropDown } from './RatesTable.dropDown';
import { usePricing } from 'lib/challenger/usePricing';
import { mlaProp } from 'lib/challenger/interfaces';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const RatesTableLifetimeAnnuityMlp = () => {
  const { marketLinkedPayments } = usePricing('getMLA');
  const [gender, setGender] = useState<string>('F');
  const [filteredMarketLinkedPayments, setFilteredMarketLinkedPayments] = useState<mlaProp>();

  useEffect(() => {
    if (marketLinkedPayments?.Rates) {
      setFilteredMarketLinkedPayments({
        ValidFromDate: marketLinkedPayments.ValidFromDate,
        ValidToDate: marketLinkedPayments.ValidToDate,
        Rates: marketLinkedPayments?.Rates.filter((p) => p.Gender === gender),
      });
    }
  }, [marketLinkedPayments, gender]);

  const renderRates = () => {
    return (
      filteredMarketLinkedPayments?.Rates &&
      filteredMarketLinkedPayments.Rates.map((r) => {
        return (
          <tr key={r.Age}>
            <td>{r.Age}</td>
            <td>{r.WithPeriod}</td>
            <td>{getFormattedAmount(r.Cash, 0)}</td>
            <td>{getFormattedAmount(r.Conservative, 0)}</td>
            <td>{getFormattedAmount(r.ConsBalanced, 0)}</td>
            <td>{getFormattedAmount(r.Balanced, 0)}</td>
            <td>{getFormattedAmount(r.Growth, 0)}</td>
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
    return `Current from ${dayjs(marketLinkedPayments?.ValidFromDate).format(dateFormat)} to ${dayjs(marketLinkedPayments?.ValidToDate).format(dateFormat)}`;
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
              <th colSpan={5}>Market-linked indexation payment option</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th>Cash</th>
              <th>Conservative</th>
              <th>Conservative balanced</th>
              <th>Balanced</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>{renderRates()}</tbody>
        </table>
      </div>
    </div>
  );
};

// Lifetime annuity | Market-linked payments

export default RatesTableLifetimeAnnuityMlp;
