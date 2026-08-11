import classNames from 'classnames';
import { CardFields, CardProps, CardSize, HeadingType } from './Card.types';
import {
  Field,
  Image,
  ImageField,
  Text,
  Link as JssLink,
  LinkField,
  RichText,
} from '@sitecore-content-sdk/nextjs';
import CardBaseIcon from './Card.base.icon';
import { IconColor } from 'components/Icons/icon.types';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useState } from 'react';
import { isValidLink } from './Card.helpers';
import { useSitecore, useAnalytics } from 'lib/challenger/hooks';

export type CardInfo1Fields = CardFields & {
  WithHoverEffect?: Field<boolean>;
  DisplayLogo?: Field<boolean>;
  Icon?: {
    fields: {
      IconType: Field<string>;
    };
  };
  WithIconBgColor?: Field<boolean>;
};

const CardInfo1 = (props: CardProps<CardInfo1Fields>): React.JSX.Element => {
  const {
    Content,
    Heading,
    HeadingLevel,
    BackgroundColor,
    WithBorder,
    Alignment,
    WithShadow,
    WithHoverEffect,
    DisplayLogo,
    Icon,
    Link,
    Size,
    WithIconBgColor,
  } = props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const alignment = (Alignment?.fields.Alignment.value || '').toLowerCase() || 'center';
  const bgColor = (BackgroundColor?.fields.Color.value || '').toLowerCase();
  const showCardShadow = !!WithShadow?.value;
  const customSize = (Size?.fields?.Size?.value || 'md') as CardSize;
  const withHoverEffect = !!WithHoverEffect?.value;
  const iconType = Icon?.fields.IconType.value || 'none';
  const withIconBgColor = !!WithIconBgColor?.value;
  const [isHover, setIsHover] = useState<boolean>(false);
  const hasValidLink = isValidLink(Link);
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);

  const renderLogo = () => {
    const image: ImageField = {
      value: {
        src: '/challenger_logo.svg',
        alt: 'challenger logo',
      },
    };

    if (DisplayLogo && DisplayLogo.value) {
      return (
        <Image
          field={image}
          editable={false}
          priority="true"
          className="h-14 w-36 lg:h-16 lg:w-52"
        />
      );
    }

    return null;
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      link_component={linkComponent}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={classNames(
        'flex w-full cursor-default flex-col justify-between gap-4 !p-6 lg:max-w-lg',
        { 'hover:bg-white hover:shadow-lg': withHoverEffect },
        { 'items-start': alignment === 'left' },
        { 'items-center': alignment === 'center' },
        { 'items-end': alignment === 'right' },
        { 'bg-white': bgColor === 'white' },
        { 'bg-grey-light': bgColor === 'gray' },
        { 'w-full lg:w-[260px]': customSize === 'sm' },
        { 'w-full lg:w-[280px] 2xl:w-[320px]': customSize === 'md' },
        { 'w-full lg:w-[400px]': customSize === 'lg' },
        { 'w-full': customSize === 'full' },
        { 'rounded-sm border border-grey': WithBorder?.value },
        { 'shadow-lg': showCardShadow }
      )}
    >
      <div
        className={classNames(
          'flex flex-col justify-center gap-4',
          { 'items-start': alignment === 'left' },
          { 'items-center': alignment === 'center' },
          { 'items-end': alignment === 'right' }
        )}
      >
        {renderLogo()}
        <CardBaseIcon
          icon={iconType}
          color={IconColor.Navy}
          withBackgroundColor={withIconBgColor}
        />
        <CustomHeading
          className={classNames(
            'font-roboto-700 text-xl text-bright-navy xl:text-2xl',
            { 'text-left': alignment === 'left' },
            { 'text-center': alignment === 'center' },
            { 'text-end': alignment === 'right' }
          )}
        >
          <Text field={Heading} />
        </CustomHeading>
        <RichText
          field={Content}
          className={classNames(
            'custom-content text-base [&_a:hover]:underline [&_a]:text-blue',
            { 'text-left': alignment === 'left' },
            { 'text-center': alignment === 'center' },
            { 'text-end': alignment === 'right' }
          )}
        />
      </div>
      {isEditMode && (
        <div className={classNames('mt-5 flex')}>
          <JssLink field={Link as LinkField} className="py-4 text-lg" />
        </div>
      )}
      {!isEditMode && hasValidLink && Link && (
        <div
          className={classNames(
            'mt-5 flex',
            isHover && withHoverEffect && alignment === 'center'
              ? 'w-full justify-center rounded-sm bg-bright-teal'
              : ''
          )}
        >
          <ButtonLink
            LinkValue={Link}
            Color={{ fields: { Type: { value: 'primary' } } }}
            HasArrow={{ value: true }}
            disableHoverState={isHover && withHoverEffect && alignment === 'center'}
            className="w-full items-center py-4 text-lg [&_div]:justify-center"
            variant={Variant.Link}
          />
        </div>
      )}
    </div>
  );
};

export default CardInfo1;
