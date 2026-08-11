import React, { FC } from 'react';
import { ButtonElement, IconBgColor, IconButtonProps } from './IconButton.types';
import { IconColor, IconProps, IconSize } from 'components/Icons/icon.types';
import * as Icon from '../Icons/';
import classNames from 'classnames';

const IconButton = React.forwardRef<ButtonElement, IconButtonProps>((props, forwardedRef) => {
  const {
    id,
    iconColor = IconColor.Navy,
    children,
    bgColor = IconBgColor.None,
    iconSize = IconSize.Lg,
    ariaLabel = 'button',
    type,
    isDisabled = false,
    onClick,
    className,
  } = props;

  const renderIcon = () => {
    const CustomIcon = Icon[type] as FC<IconProps>;
    const primaryClassNames = [
      'bg-bright-teal',
      'p-2',
      'rounded',
      'text-bright-navy',
      'hover:bg-teal',
    ].join(' ');
    const secondaryClassNames = [
      'bg-bright-navy',
      'p-2',
      'rounded',
      'text-white',
      'hover:bg-blue',
    ].join(' ');

    if (bgColor) {
      return (
        <div
          className={classNames(
            { [primaryClassNames]: bgColor === IconBgColor.Primary },
            { [secondaryClassNames]: bgColor === IconBgColor.Secondary }
          )}
        >
          <CustomIcon color={iconColor} size={iconSize} />
        </div>
      );
    }

    return <CustomIcon color={iconColor} size={iconSize} />;
  };

  const baseClassNames = ['w-full', 'sm:w-fit', 'rounded-sm', 'font-roboto-500'].join(' ');
  const disabledClassNames = ['grayscale', 'opacity-25'].join(' ');
  const focusClassNames = ['outline-2', 'outline-offset-2', 'outline-blue', 'focus:outline'].join(
    ' '
  );

  return (
    <button
      type="button"
      id={id}
      ref={forwardedRef}
      aria-label={ariaLabel}
      aria-disabled={isDisabled}
      onClick={onClick}
      disabled={isDisabled}
      className={classNames(className, baseClassNames, focusClassNames, {
        [disabledClassNames]: isDisabled,
      })}
    >
      <div className="flex items-center justify-center gap-2 sm:justify-start">
        {renderIcon()}
        {children}
      </div>
    </button>
  );
});

export default IconButton;

IconButton.displayName = 'IconButton';
