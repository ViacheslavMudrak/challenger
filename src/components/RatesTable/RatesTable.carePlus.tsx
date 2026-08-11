import {
  ComponentParams,
  ComponentRendering,
  Field,
  RichText,
  Text,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { getFormattedAmount } from 'lib/challenger/helpers';
import { usePricing } from 'lib/challenger/usePricing';
import { HeadingType } from './RatesTable.types';

export type RatesTableLifetimeAnnuityFields = {
  Heading?: Field<string>;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
  Footnote?: Field<string>;
};

export interface RatesTableProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: RatesTableLifetimeAnnuityFields;
  };
}

const RatesTableCarePlus = (props: RatesTableProps) => {
  const { Footnote, Heading, HeadingLevel } = props.rendering.fields;
  const { carePlusRates } = usePricing('getCarePlus');
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';

  const renderRates = () => {
    return carePlusRates?.DataTable.map((r) => {
      return (
        <tr key={r.Age}>
          <td>{r.Age}</td>
          <td>{getFormattedAmount(r.Male, 0)}</td>
          <td>{getFormattedAmount(r.Female, 0)}</td>
        </tr>
      );
    });
  };

  const renderDate = () => {
    const dateFormat = 'DD MMM YYYY';
    return `Current from ${dayjs(carePlusRates?.ValidFromDate).format(dateFormat)} to ${dayjs(carePlusRates?.ValidToDate).format(dateFormat)}`;
  };

  return (
    <div
      className="flex w-full flex-col bg-grey-light p-5"
      {...(props.rendering?.params?.RenderingIdentifier && {
        id: props.rendering.params.RenderingIdentifier,
      })}
    >
      <div className="flex w-full flex-col gap-1 text-left">
        <CustomHeading
          className={classNames(
            'font-roboto-700 text-[32px] leading-[3rem] text-bright-navy xl:leading-none'
          )}
        >
          <Text field={Heading} />
        </CustomHeading>
      </div>
      <div className="mt-8 flex w-full flex-col gap-3">
        <span className="text-left">{renderDate()}</span>
        <table className="rates-table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Male</th>
              <th>Female</th>
            </tr>
          </thead>
          <tbody>{renderRates()}</tbody>
        </table>
      </div>
      <div className="mt-5 w-full">
        <span className="py-3 text-left text-xs text-deep-blue [&_h6]:text-xs">
          <RichText field={Footnote} />
        </span>
      </div>
    </div>
  );
};

export default RatesTableCarePlus;
