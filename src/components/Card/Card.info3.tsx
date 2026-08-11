import classNames from 'classnames';
import { CardFields, CardProps, CardSize, HeadingType } from './Card.types';
import { RichText, Text } from '@sitecore-content-sdk/nextjs';
import { useAnalytics } from 'lib/challenger/useAnalytics';
import { useSitecore } from 'lib/challenger/useSitecore';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

const CardInfo3 = (props: CardProps<CardFields>): React.JSX.Element => {
  const { HeadingLevel, WithShadow, Size, Alignment } = props.rendering.fields;

  const { isEditMode } = useSitecore();
  let heading = props?.rendering?.fields?.Heading?.value || '';
  const headingTerms = getFixedTermValue(heading, isEditMode);
  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates([...new Set([...headingTerms, ...contentTerms])]);

  const alignment = (Alignment?.fields?.Alignment?.value || '').toLowerCase() || 'center';
  const customSize = (Size?.fields?.Size?.value || 'md') as CardSize;
  const showCardShadow = !!WithShadow?.value;
  const { linkComponent } = useAnalytics(props.rendering);

  const renderHeading = () => {
    const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
    if (!isEditMode && headingTerms?.length > 0) {
      heading = getUpdatedContentReplacedWithRate(heading, rates);
    }

    return (
      <CustomHeading
        className={classNames(
          'min-h-[32px] font-roboto-700 text-2xl text-bright-navy xl:text-2xl',
          { 'text-left': alignment === 'left' },
          { 'text-center': alignment === 'center' }
        )}
      >
        <Text field={isEditMode ? props?.rendering?.fields?.Heading : { value: heading }} />
      </CustomHeading>
    );
  };

  const renderContent = () => {
    if (!isEditMode && contentTerms?.length > 0) {
      content = getUpdatedContentReplacedWithRate(content, rates);
    }

    return (
      <RichText
        className={classNames(
          'w-full',
          'custom-content-shard',
          'text-base',
          { 'text-left': alignment === 'left' },
          { 'text-center': alignment === 'center' }
        )}
        field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
      />
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'relative flex min-h-[300px] justify-between gap-4 p-0',
        'items-start bg-white',
        'rounded-sm border-white',
        { 'w-full lg:w-[260px]': customSize === 'sm' },
        { 'w-full lg:w-[295px]': customSize === 'md' },
        { 'w-full lg:w-[320px]': customSize === 'lg' },
        { 'w-full': customSize === 'full' },
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div
        className={classNames(
          'clip-path-polygon-[100%_16%,0_0,100%_0]',
          'bg-gradient-to-r from-bright-navy to-blue',
          'absolute h-40 w-full bg-challenger-green'
        )}
      ></div>

      <div
        className={classNames(
          'flex w-full flex-col justify-start gap-4 !px-6 pb-6 pt-10',
          { 'items-start': alignment === 'left' },
          { 'items-center': alignment === 'center' }
        )}
      >
        {renderHeading()}
        {renderContent()}
      </div>
    </div>
  );
};

export default CardInfo3;
