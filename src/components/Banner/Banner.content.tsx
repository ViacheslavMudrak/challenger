import { BannerComponentProps, HeadingLevel } from './Banner.types';
import classNames from 'classnames';
import { ComponentParams, Placeholder, RichText, Text } from '@sitecore-content-sdk/nextjs';
import { ReactNode } from 'react';
import { useSitecore } from 'lib/challenger/useSitecore';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

interface BannerContentProps extends BannerComponentProps {
  headingColor?: string;
  textColor?: string;
  showHeadingOnly?: boolean;
  children?: ReactNode;
  params?: ComponentParams;
}

export const BannerComponentContent = (props: BannerContentProps) => {
  const { isEditMode } = useSitecore();
  const headingTerms = getFixedTermValue(
    props?.rendering?.fields?.BannerHeading?.value,
    isEditMode
  );
  const contentTerms = getFixedTermValue(
    props?.rendering?.fields?.BannerContent?.value,
    isEditMode
  );
  const terms = [...new Set([...headingTerms, ...contentTerms])];
  const rates = useFixedTermRates(terms);

  const {
    showHeadingOnly = false,
    headingColor = 'text-bright-navy',
    textColor = 'text-bright-navy',
  } = props;

  const renderButtons = () => {
    if (showHeadingOnly) {
      return null;
    }

    if (props?.rendering?.params?.DynamicPlaceholderId) {
      const phKey = `ph-button-${props?.rendering?.params?.DynamicPlaceholderId}`;
      return (
        <div
          className={classNames(
            'mt-6 flex flex-col items-center gap-8 md:flex-row  sm:[&_a]:w-fit',
            { '[&:empty]:hidden': !isEditMode }
          )}
        >
          <Placeholder key={phKey} name={phKey} rendering={props?.rendering} />
        </div>
      );
    }
    return <></>;
  };

  const renderHeading = () => {
    const level =
      (props?.rendering?.fields?.BannerHeadingLevel?.fields?.Level?.value as
        | HeadingLevel
        | undefined) || 'h1';
    const title = props?.rendering?.fields?.BannerHeading;

    if (!isEditMode && title?.value) {
      title.value = getUpdatedContentReplacedWithRate(title.value, rates);
    }

    if (showHeadingOnly) {
      return (
        <RichText
          tag={level}
          role="heading"
          article_name={title?.value}
          className={`mb-5 overflow-hidden text-ellipsis font-roboto-700 ${headingColor}`}
          field={title}
          title={title?.value}
        />
      );
    }

    return (
      <RichText
        tag={level}
        role="heading"
        className={`mb-5 overflow-hidden text-ellipsis font-roboto-700 ${headingColor}`}
        field={title}
        title={title?.value}
      />
    );
  };

  const renderContent = () => {
    if (showHeadingOnly) {
      return null;
    }

    if (isEditMode) {
      return (
        <Text
          tag="p"
          className={classNames(
            `overflow-hidden text-ellipsis font-roboto-400 text-2xl ${textColor}`
          )}
          field={props?.rendering?.fields?.BannerContent}
        />
      );
    }

    if (props?.rendering?.fields?.BannerContent?.value) {
      let content = props?.rendering?.fields?.BannerContent?.value;

      if (!isEditMode && content) {
        content = getUpdatedContentReplacedWithRate(content, rates);
      }

      return (
        <Text
          tag="p"
          className={classNames(
            `overflow-hidden text-ellipsis font-roboto-400 text-2xl ${textColor}`
          )}
          field={{ value: content }}
        />
      );
    }

    return null;
  };

  const renderDisclaimerContent = () => {
    const allowedVariants = [
      'IND_T1_Header_Banner',
      'IND_T2_Header_Banner',
      'ADV_T1_Header_Banner',
      'ADV_T2_Header_Banner',
      'INSTO_T1_Header_Banner',
      'CTA_Middle_Banner_Small',
      'CTA_Middle_Banner_Large',
      'GEN_T3_Header_Banner',
      'GEN_T3_Product_Banner',
      'ADV_T3_Header_Banner',
      'GEN_T4_Header_Banner',
      'ADV_T4_Header_Banner',
      'IND_T4_Header_Banner',
      'INSTO_T4_Header_Banner',
      'GEN_T4_Header_Banner_Blue',
      'GEN_T4_Header_Banner_Small',
      'CTA_Footer_Banner_No_Image',
      'CTA_Footer_Banner_Image',
    ];

    if (
      !allowedVariants.includes(props?.rendering?.params?.FieldNames ?? '') ||
      (!isEditMode && !props?.rendering?.fields?.DisclaimerText?.value)
    )
      return <></>;

    return (
      <RichText
        tag={'h6'}
        className={classNames(
          'mt-4 overflow-hidden text-ellipsis font-roboto-400 [&_h6]:text-xs',
          { 'line-clamp-2': props?.rendering?.params?.FieldNames === 'CTA_Middle_Banner_Small' },
          textColor
        )}
        field={props?.rendering?.fields?.DisclaimerText}
        title={props?.rendering?.fields?.DisclaimerText?.value}
      />
    );
  };

  return (
    <>
      {renderHeading()}
      {renderContent()}
      {props.children}
      {renderButtons()}
      {renderDisclaimerContent()}
    </>
  );
};
