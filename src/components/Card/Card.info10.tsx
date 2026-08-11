import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from './Card.types';
import { Field, RichText, Text, Link as JssLink, LinkField } from '@sitecore-content-sdk/nextjs';
import { getFormattedDate, isValidDate } from 'lib/challenger/helpers';
import { isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

export type CardInfo10Fields = CardFields & {
  Badge?: Field<string>;
  PublishedDate?: Field<string>;
  ReadInMins?: Field<string>;
};

const CardInfo10 = (props: CardProps<CardInfo10Fields>): React.JSX.Element => {
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
          className={classNames('relative flex flex-col items-start justify-start gap-2 xl:gap-0')}
        >
          <div className="mb-4 flex w-full flex-col gap-4 xl:hidden">
            {Badge?.value && (
              <div className="line-clamp-1 w-full rounded-sm border-2 border-challenger-green px-2 py-1 text-center font-roboto-700 text-base text-bright-navy xl:min-w-[80px]">
                <Text field={Badge} />
              </div>
            )}
            <ul className="custom-list">
              {renderPublishedDate()}
              {ReadInMins?.value && <li>{ReadInMins?.value}</li>}
            </ul>
          </div>
          <ul className="custom-list mb-4 hidden items-center xl:flex">
            {Badge?.value && (
              <li title={Badge.value} className="flex">
                <div
                  article_category={Badge.value}
                  className="line-clamp-1 min-w-[80px] max-w-[100px] rounded-sm border-2 border-challenger-green p-1 text-center font-roboto-700 text-base text-bright-navy"
                >
                  {Badge.value}
                </div>
              </li>
            )}
            {renderPublishedDate()}
            {isEditMode && (
              <li>
                <Text field={ReadInMins} />
              </li>
            )}
            {!isEditMode && ReadInMins?.value && <li>{ReadInMins?.value}</li>}
          </ul>
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
        {isEditMode && (
          <div className={classNames('mt-5 flex')}>
            <JssLink field={Link as LinkField} className="py-4 text-lg" />
          </div>
        )}
        {!isEditMode && hasValidLink && Link && (
          <div className={classNames('mt-6 flex justify-start [&_a]:text-lg')}>
            <ButtonLink
              LinkValue={Link}
              Color={{ fields: { Type: { value: 'primary' } } }}
              HasArrow={{ value: true }}
              className="py-4 text-lg"
              variant={Variant.Link}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardInfo10;
