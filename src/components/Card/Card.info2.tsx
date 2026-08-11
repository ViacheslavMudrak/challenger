import classNames from 'classnames';
import { CardFields, CardProps, CardSize, HeadingType } from './Card.types';
import { RichText, Text, Link as JssLink, LinkField } from '@sitecore-content-sdk/nextjs';
import { isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import ButtonSolid from 'components/Button/Button.solid';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

export type CardInfo2Fields = CardFields & {
  Link2?: LinkField;
};

const CardInfo2 = (props: CardProps<CardInfo2Fields>): React.JSX.Element => {
  const { HeadingLevel, WithShadow, Size, Alignment, BorderTopColor, Link, Link2 } =
    props.rendering.fields;
  const alignment = (Alignment?.fields?.Alignment?.value || '').toLowerCase() || 'center';
  const customSize = (Size?.fields?.Size?.value || 'md') as CardSize;
  const showCardShadow = !!WithShadow?.value;
  const borderTopColor = (BorderTopColor?.fields?.Color?.value || '').toLocaleLowerCase();
  const hasValidLink = isValidLink(Link);
  const hasValidLink2 = isValidLink(Link2);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);

  let heading = props?.rendering?.fields?.Heading?.value || '';
  const headingTerms = getFixedTermValue(heading, isEditMode);
  let subHeading = props?.rendering?.fields?.SubHeading?.value || '';
  const subHeadingTerms = getFixedTermValue(subHeading, isEditMode);
  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates([
    ...new Set([...headingTerms, ...subHeadingTerms, ...contentTerms]),
  ]);

  const renderHeading = () => {
    const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
    if (!isEditMode && headingTerms?.length > 0) {
      heading = getUpdatedContentReplacedWithRate(heading, rates);
    }

    return (
      <CustomHeading
        className={classNames(
          'min-h-[32px] font-roboto-700 text-xl text-bright-navy xl:text-2xl',
          { 'text-left': alignment === 'left' },
          { 'text-center': alignment === 'center' },
          { 'text-right': alignment === 'right' }
        )}
      >
        <Text field={isEditMode ? props?.rendering?.fields?.Heading : { value: heading }} />
      </CustomHeading>
    );
  };

  const renderSubHeading = () => {
    if (!isEditMode && subHeadingTerms?.length > 0) {
      subHeading = getUpdatedContentReplacedWithRate(subHeading, rates);
    }
    return (
      <Text field={isEditMode ? props?.rendering?.fields?.SubHeading : { value: subHeading }} />
    );
  };

  const renderContent = () => {
    if (!isEditMode && contentTerms?.length > 0) {
      content = getUpdatedContentReplacedWithRate(content, rates);
    }
    return (
      <RichText
        className={classNames(
          'custom-content',
          'text-base',
          '[&>div>p:last-child]:pb-0',
          '[&_p>span:last-child]:pb-0',
          { 'text-left': alignment === 'left' },
          { 'text-center': alignment === 'center' },
          { 'text-right': alignment === 'right' }
        )}
        field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
      />
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'flex min-h-[300px] flex-col justify-between gap-4 !p-6',
        'items-start bg-white',
        { 'border-t-8  border-t-deep-teal': borderTopColor === 'teal' },
        { 'border-t-8  border-t-light-blue': borderTopColor === 'blue' },
        { 'border-t-8  border-t-bright-navy': borderTopColor === 'navy' },
        'rounded-sm border-white',
        { 'items-start': alignment === 'left' },
        { 'items-center': alignment === 'center' },
        { 'items-end': alignment === 'right' },
        { 'w-full lg:w-[260px]': customSize === 'sm' },
        { 'w-full lg:w-[270px]': customSize === 'md' },
        { 'w-full lg:w-[320px]': customSize === 'lg' },
        { 'w-full lg:w-[600px]': customSize === 'xl' },
        { 'w-full': customSize === 'full' },
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div
        className={classNames(
          'flex flex-col justify-start gap-2',
          { 'items-start': alignment === 'left' },
          { 'items-center': alignment === 'center' },
          { 'items-end': alignment === 'right' }
        )}
      >
        {(isEditMode || heading) && renderHeading()}
        {(isEditMode || subHeading) && (
          <span
            className={classNames(
              'font-roboto-700 text-bright-navy',
              { 'text-left': alignment === 'left' },
              { 'text-center': alignment === 'center' },
              { 'text-right': alignment === 'right' }
            )}
          >
            {renderSubHeading()}
          </span>
        )}
        {(isEditMode || content) && renderContent()}
      </div>
      {isEditMode && (
        <div className={classNames('mt-5 flex gap-2')}>
          <JssLink field={Link as LinkField} className="py-4 text-lg" />
          <JssLink field={Link2 as LinkField} className="py-4 text-lg" />
        </div>
      )}
      <div
        className={classNames(
          'mt-5 flex w-full flex-col gap-2 lg:flex-row [&_a]:flex [&_a]:w-full [&_a]:justify-center'
        )}
      >
        {!isEditMode && hasValidLink && Link && (
          <ButtonSolid
            LinkValue={Link}
            Color={{ fields: { Type: { value: 'secondary' } } }}
            HasArrow={{ value: false }}
            className="py-4 text-lg"
            variant={Variant.Solid}
          />
        )}
        {!isEditMode && hasValidLink2 && Link2 && (
          <ButtonLink
            LinkValue={Link2}
            Color={{ fields: { Type: { value: 'primary' } } }}
            HasArrow={{ value: true }}
            className="py-4 text-lg"
            variant={Variant.Link}
          />
        )}
      </div>
    </div>
  );
};

export default CardInfo2;
