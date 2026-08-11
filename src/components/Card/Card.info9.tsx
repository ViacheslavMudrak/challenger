import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from './Card.types';
import { Field, RichText, Text, Link as JssLink, LinkField } from '@sitecore-content-sdk/nextjs';
import { getFormattedDate, isValidDate } from 'lib/challenger/helpers';
import { isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

export type CardInfo9Fields = CardFields & {
  Badge?: Field<string>;
  PublishedDate?: Field<string>;
  ReadInMins?: Field<string>;
};

const CardInfo9 = (props: CardProps<CardInfo9Fields>): React.JSX.Element => {
  const { Content, Heading, HeadingLevel, WithShadow, Badge, PublishedDate, ReadInMins, Link } =
    props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const showCardShadow = !!WithShadow?.value;
  const hasValidLink = isValidLink(Link);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);

  const renderPublishedDate = () => {
    if (isValidDate(PublishedDate?.value || '')) {
      return <li>{getFormattedDate(PublishedDate?.value)}</li>;
    }

    return;
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'flex gap-2',
        'items-start bg-white',
        'rounded-sm border-white',
        'flex-col',
        'w-full lg:w-[400px]',
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div className={classNames('relative flex h-full w-full flex-col justify-between !p-6 py-8')}>
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
              className="mb-4 rounded-sm border-2 border-challenger-green !px-2 py-1 text-left font-roboto-700 text-base text-bright-navy"
            >
              <Text field={Badge} />
            </div>
          )}
          <CustomHeading
            className={classNames(
              'min-h-[32px] text-left text-bright-navy',
              'mb-4 font-roboto-700 text-[28px] xl:text-[32px]'
            )}
          >
            <Text field={Heading} />
          </CustomHeading>
          <RichText
            className={classNames('custom-content', 'text-left text-base')}
            field={Content}
          />
        </div>
        <div className="flex flex-col">
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
                <span className={classNames('flex justify-start [&_a]:text-lg')}>
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

export default CardInfo9;
