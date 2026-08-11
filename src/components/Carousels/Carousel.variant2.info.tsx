import {
  ComponentParams,
  ComponentRendering,
  Field,
  RichText,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { Text, Link as JssLink, LinkField } from '@sitecore-content-sdk/nextjs';
import React from 'react';
import { useSitecore } from 'lib/challenger/hooks';
import { isValidLink } from 'components/Card/Card.helpers';
import { Variant } from 'components/Button/Button.types';
import { HeadingType } from 'components/Card/Card.types';
import ButtonSolid from 'components/Button/Button.solid';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

export type CarouselInfoFields = {
  Heading?: Field<string>;
  Content?: Field<string>;
  Link?: LinkField;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
  DisclaimerText?: RichTextField;
};

export interface CarouselVariant2InfoProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: CarouselInfoFields };
}

const CarouselVariant2Info = (props: CarouselVariant2InfoProps) => {
  const { Link, HeadingLevel } = props.rendering.fields;
  const hasValidLink = isValidLink(Link);
  const { isEditMode } = useSitecore();
  let heading = props?.rendering?.fields?.Heading?.value || '';
  const headingTerms = getFixedTermValue(heading, isEditMode);
  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates([...new Set([...headingTerms, ...contentTerms])]);

  const renderHeading = () => {
    const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
    if (!isEditMode && headingTerms?.length > 0) {
      heading = getUpdatedContentReplacedWithRate(heading, rates);
    }

    return (
      <CustomHeading className={classNames('font-roboto-700 text-4xl')}>
        <Text field={isEditMode ? props?.rendering?.fields?.Heading : { value: heading }} />
      </CustomHeading>
    );
  };

  const renderDisclaimerContent = () => {
    if (!isEditMode && !props?.rendering?.fields?.DisclaimerText?.value)
      return (
        <div className="mt-5 text-white">{props?.rendering?.fields?.DisclaimerText?.value}</div>
      );

    return (
      <RichText
        tag={'h6'}
        className={classNames(
          'mt-4 overflow-hidden text-ellipsis font-roboto-400 text-xs text-white'
        )}
        field={props?.rendering?.fields?.DisclaimerText}
        title={props?.rendering?.fields?.DisclaimerText?.value}
      />
    );
  };

  const renderContent = () => {
    if (!isEditMode && contentTerms?.length > 0) {
      content = getUpdatedContentReplacedWithRate(content, rates);
    }
    return (
      <span>
        <RichText
          className={'[&_a]:cursor-pointer [&_a]:underline [&_a]:underline-offset-2'}
          field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
        />
      </span>
    );
  };

  return (
    <div className={'flex flex-col gap-5'}>
      {renderHeading()}
      {renderContent()}
      {isEditMode && (
        <div className={classNames('mt-5 flex')}>
          <JssLink field={Link as LinkField} className="py-4 text-lg" />
        </div>
      )}
      {!isEditMode && hasValidLink && Link && (
        <div className={classNames('mt-5 flex')}>
          <ButtonSolid
            LinkValue={Link}
            Color={{ fields: { Type: { value: 'secondary' } } }}
            HasArrow={{ value: true }}
            className="py-4 text-lg"
            variant={Variant.Link}
          />
        </div>
      )}
      {renderDisclaimerContent()}
    </div>
  );
};

export default CarouselVariant2Info;
