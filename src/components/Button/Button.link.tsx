import React from 'react';
import { ButtonElement, ButtonProps, ColorType } from './Button.types';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { ArrowRightIcon, ChevronRightIcon } from 'components/Icons';
import classNames from 'classnames';
import { Link as JssLink } from '@sitecore-content-sdk/nextjs';
import { useSitecore } from 'lib/challenger/hooks';

const ButtonLink = React.forwardRef<ButtonElement, ButtonProps>((props, forwardedRef) => {
  const {
    id,
    Color,
    HasArrow,
    ariaLabel,
    isDisabled = false,
    onClick,
    as = 'link',
    LinkValue,
    className,
    useChevron = false,
    disableHoverState = false,
  } = props;

  const { isEditMode, isPreviewMode } = useSitecore();

  const renderIcon = () => {
    let iconColor = IconColor.Navy;
    let hoverIconColor = 'text-blue';

    if (Color?.fields?.Type?.value === ColorType.Secondary) {
      iconColor = IconColor.White;
      hoverIconColor = 'text-white';
    }

    if (Color?.fields?.Type?.value === ColorType.Tertiary) {
      iconColor = IconColor.Teal;
      hoverIconColor = 'text-bright-teal';
    }

    if (HasArrow?.value) {
      if (useChevron) {
        return (
          <ChevronRightIcon
            size={IconSize.Sm}
            color={iconColor}
            className={classNames(!disableHoverState ? `group-hover:${hoverIconColor}` : '')}
          />
        );
      }

      return (
        <ArrowRightIcon
          size={IconSize.Md}
          color={iconColor}
          className={classNames(!disableHoverState ? `group-hover:${hoverIconColor}` : '')}
        />
      );
    }

    return null;
  };

  const buttonStyles = classNames(
    'group w-fit rounded-sm bg-transparent font-roboto-500',
    { ' hover:text-blue group-hover:text-blue': !disableHoverState },
    {
      'text-bright-navy': Color?.fields?.Type?.value === ColorType.Primary,
    },
    { 'text-white': Color?.fields?.Type?.value === ColorType.Secondary },
    { 'text-bright-teal': Color?.fields?.Type?.value === ColorType.Tertiary },
    className
  );

  const renderChildren = () => {
    if (as === 'link') {
      return (
        <div className="flex items-center gap-2">
          {(isEditMode || isPreviewMode) && <JssLink field={LinkValue} />}
          {!isEditMode && !isPreviewMode && LinkValue.value.text}
          {renderIcon()}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2 ">
        {LinkValue.value.text}
        {renderIcon()}
      </div>
    );
  };

  if (as === 'link') {
    if (isEditMode) {
      return <>{renderChildren()}</>;
    }

    return (
      <JssLink
        field={LinkValue}
        link_name={LinkValue.value.text}
        aria-label={ariaLabel}
        onClick={onClick}
        className={buttonStyles}
      >
        {renderChildren()}
      </JssLink>
    );
  }

  return (
    <button
      type="button"
      id={id}
      ref={forwardedRef}
      disabled={isDisabled}
      aria-label={ariaLabel}
      link_name={LinkValue.value.text}
      onClick={onClick}
      className={buttonStyles}
    >
      <div className="flex items-center gap-2">{renderChildren()}</div>
    </button>
  );
});

export default ButtonLink;

ButtonLink.displayName = 'ButtonLink';
