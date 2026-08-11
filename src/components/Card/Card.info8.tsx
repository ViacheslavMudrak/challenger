import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from './Card.types';
import { Field, RichText, Text, Link as JssLink, LinkField } from '@sitecore-content-sdk/nextjs';
import CardBaseImage from './Card.base.image';
import { getFormattedDate, isValidDate } from 'lib/challenger/helpers';
import { isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import {
  getFixedTermValue,
  getUpdatedContentReplacedWithRate,
} from 'lib/challenger/fixedTerm.helper';
import { useFixedTermRates } from 'lib/challenger/useFixedTermRates';

export type CardInfo8Fields = CardFields & {
  Badge?: Field<string>;
  PublishedDate?: Field<string>;
  ReadInMins?: Field<string>;
};

const CardInfo8 = (props: CardProps<CardInfo8Fields>): React.JSX.Element => {
  const {
    HeadingLevel,
    WithShadow,
    Badge,
    PublishedDate,
    ReadInMins,
    CardImage = {},
    Link,
  } = props.rendering.fields;
  const showCardShadow = !!WithShadow?.value;
  const hasValidLink = isValidLink(Link);
  const { isEditMode } = useSitecore();

  let heading = props?.rendering?.fields?.Heading?.value || '';
  const headingTerms = getFixedTermValue(heading, isEditMode);
  let content = props?.rendering?.fields?.Content?.value || '';
  const contentTerms = getFixedTermValue(content, isEditMode);
  const rates = useFixedTermRates([...new Set([...headingTerms, ...contentTerms])]);

  const { linkComponent } = useAnalytics(props.rendering);

  const renderPublishedDate = () => {
    if (isValidDate(PublishedDate?.value || '')) {
      return <li>{getFormattedDate(PublishedDate?.value)}</li>;
    }

    return;
  };

  const renderHeading = () => {
    const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
    if (!isEditMode && headingTerms?.length > 0) {
      heading = getUpdatedContentReplacedWithRate(heading, rates);
    }

    return (
      <CustomHeading
        className={classNames(
          'min-h-[32px] text-left font-roboto-700 text-[28px] text-bright-navy xl:text-[32px]'
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
        className={classNames('custom-content', 'text-left text-base', 'mt-4')}
        field={isEditMode ? props?.rendering?.fields?.Content : { value: content }}
      />
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'flex h-fit gap-2 xl:h-[416px]',
        'items-start bg-white',
        'rounded-sm border-white',
        'flex-col xl:flex-row',
        'w-full items-start lg:w-[820px]',
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div
        className={classNames(
          'relative flex h-[235px] w-full md:h-[550px] xl:h-full xl:w-[435px] xl:flex-row'
        )}
      >
        <div
          className={classNames(
            'absolute z-20 h-full w-full',
            'xl:clip-path-polygon-[92%_0,77%_99%,100%_0]',
            'clip-path-polygon-[100%_72%,0%_100%,100%_86%]',
            'from-deep-green to-challenger-green bg-gradient-180 xl:bg-gradient-90'
          )}
        ></div>
        <CardBaseImage
          image={CardImage}
          className={classNames(
            'absolute z-10 h-full w-full',
            'xl:clip-path-polygon-[0_0,92%_0,77%_100%,0%_100%]',
            'clip-path-polygon-[0_0,100%_0,100%_81%,0%_100%]'
          )}
        />
      </div>
      <div
        className={classNames(
          'relative flex min-h-[300px] w-full flex-col justify-between p-6 py-4 xl:h-full xl:w-[445px] xl:px-10 xl:py-8'
        )}
      >
        <div
          className={classNames(
            'relative flex flex-col items-start justify-start gap-2 xl:gap-0',
            'lg:[&_div]:line-clamp-4 lg:[&_p]:line-clamp-4',
            'lg:[&_h1]:line-clamp-3 lg:[&_h2]:line-clamp-3 lg:[&_h3]:line-clamp-3 lg:[&_h4]:line-clamp-3'
          )}
        >
          {Badge?.value && (
            <div
              article_category={Badge.value}
              className="mb-4 rounded-sm border-2 border-challenger-green p-1 !px-2 text-left font-roboto-700 text-bright-navy"
            >
              <Text field={Badge} />
            </div>
          )}
          {renderHeading()}
          {renderContent()}
        </div>
        <div className="flex flex-col gap-2 xl:gap-8">
          <ul
            className={classNames('article-custom-list flex-wrap  gap-2 [&_li::after]:!ml-2', {
              'has-divider': !isEditMode && ReadInMins?.value,
            })}
          >
            {renderPublishedDate()}
            {isEditMode && (
              <li>
                <Text field={ReadInMins} />
              </li>
            )}
            {!isEditMode && ReadInMins?.value && <li>{ReadInMins?.value}</li>}
            <li>
              {isEditMode && (
                <div className={classNames('mt-5 flex')}>
                  <JssLink field={Link as LinkField} className="py-4 text-lg" />
                </div>
              )}
              {!isEditMode && hasValidLink && Link && (
                <span className={classNames('flex  [&_a]:text-lg')}>
                  <ButtonLink
                    LinkValue={Link}
                    Color={{ fields: { Type: { value: 'primary' } } }}
                    HasArrow={{ value: true }}
                    className="text-lg"
                    variant={Variant.Link}
                  />
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardInfo8;
