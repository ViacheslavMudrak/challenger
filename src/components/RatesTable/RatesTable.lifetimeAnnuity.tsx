import {
  ComponentParams,
  ComponentRendering,
  Field,
  RichText,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { HeadingType, RatesType } from './RatesTable.types';
import classNames from 'classnames';
import RatesTableLifetimeAnnuityMlp from './RatesTable.lifetimeAnnuity.mlp';
import RatesTableLifetimeAnnuityDfp from './RatesTable.lifetimeAnnuity.dfp';
import RatesTableLifetimeAnnuityIdp from './RatesTable.lifetimeAnnuity.idp';

export type RatesTableLifetimeAnnuityFields = {
  Heading?: Field<string>;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
  Content?: Field<string>;
  Disclaimer?: Field<string>;
  Footnote?: Field<string>;
  FooterContent?: Field<string>;
  RatesTableType?: Field<string>;
};

export interface RatesTableProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: RatesTableLifetimeAnnuityFields;
  };
}

const RatesTableLifetimeAnnuity = (props: RatesTableProps) => {
  const { Content, Heading, HeadingLevel, Footnote, FooterContent, Disclaimer, RatesTableType } =
    props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const rateType = RatesTableType?.value as RatesType;

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
        <span className="mt-4">
          <RichText field={Disclaimer} />
        </span>
        <span className="py-3 text-left text-black">
          <Text field={Content} />
        </span>
      </div>
      <div className="mt-8 w-full">
        {rateType === 'MarketLinkedPayments' && <RatesTableLifetimeAnnuityMlp />}
        {rateType === 'DeferredPayments' && <RatesTableLifetimeAnnuityDfp />}
        {rateType === 'ImmediatePayments' && <RatesTableLifetimeAnnuityIdp />}
      </div>
      <div className="mt-5 w-full">
        <span className="py-3 text-left text-xs text-deep-blue [&_h6]:text-xs">
          <RichText field={Footnote} />
        </span>
      </div>
      <div className="mt-5 w-full">
        <span className="py-3 text-left">
          <RichText field={FooterContent} />
        </span>
      </div>
    </div>
  );
};

export default RatesTableLifetimeAnnuity;
