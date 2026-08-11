import classNames from 'classnames';
import { CardFields, CardProps, CardSize, HeadingType } from './Card.types';
import {
  Text,
  NextImage as JssImage,
  Link as JssLink,
  LinkField,
  NextImage,
} from '@sitecore-content-sdk/nextjs';

import { isValidLink } from './Card.helpers';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

const CardInfo5 = (props: CardProps<CardFields>): React.JSX.Element => {
  const {
    Heading,
    HeadingLevel,
    WithShadow,
    Size,
    CardImage = {},
    BackgroundColor,
    Link,
  } = props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const customSize = (Size?.fields?.Size?.value || 'md') as CardSize;
  const showCardShadow = !!WithShadow?.value;
  const bgColor = (BackgroundColor?.fields?.Color.value || '').toLowerCase();
  const hasValidLink = isValidLink(Link);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'flex flex-col items-center gap-4',
        !isEditMode && !hasValidLink ? 'min-h-[200px]' : 'min-h-[300px]',
        { 'bg-white': bgColor === 'white' },
        { 'bg-grey-light': bgColor === 'gray' },
        { 'shadow-lg': showCardShadow },
        { 'w-full lg:w-[260px]': customSize === 'sm' },
        { 'w-full lg:w-[294px]': customSize === 'md' },
        { 'w-full lg:w-[325px]': customSize === 'lg' },
        { 'w-full': customSize === 'full' }
      )}
    >
      <div className={classNames('relative flex h-[104px] w-full justify-center')}>
        {isEditMode && (
          <JssImage
            field={CardImage}
            width={100}
            height={100}
            className="h-full w-auto object-cover"
          />
        )}
        {!isEditMode && (
          <NextImage
            field={CardImage}
            alt="image"
            width={100}
            height={100}
            unoptimized={true}
            className="h-full w-auto object-cover"
            onError={(event) => ((event.target as HTMLImageElement).style.display = 'none')}
          />
        )}
      </div>
      <div className={classNames('relative flex h-full w-full flex-col justify-between !p-6 pt-4')}>
        <div className={classNames('relative flex flex-col items-center justify-start gap-2')}>
          <CustomHeading
            className={classNames(
              'min-h-[32px] text-center font-roboto-700 text-2xl text-bright-navy',
              isEditMode || (hasValidLink && Link) ? 'mb-8' : ''
            )}
          >
            <Text field={Heading} />
          </CustomHeading>
        </div>
        {isEditMode && (
          <div className={classNames('mt-2 flex justify-center [&_a]:text-lg')}>
            <JssLink field={Link as LinkField} className="py-4 text-lg" />
          </div>
        )}
        {!isEditMode && hasValidLink && Link && (
          <div className={classNames('mt-2 flex justify-center [&_a]:text-lg')}>
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

export default CardInfo5;
