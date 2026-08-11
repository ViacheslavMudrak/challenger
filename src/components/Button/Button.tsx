import React, { SyntheticEvent } from 'react';
import { ButtonElement, ButtonComponentProps, Variant } from './Button.types';
import ButtonSolid from './Button.solid';
import ButtonOutline from './Button.outline';
import ButtonLink from './Button.link';
import classNames from 'classnames';

const Button = React.forwardRef<ButtonElement, ButtonComponentProps>((props, forwardedRef) => {
  if (!props?.rendering?.fields) {
    return null;
  }

  const { onClick, isDisabled, className } = props?.rendering?.fields;
  const buttonVariants = props?.rendering?.params?.FieldNames || 'solid';

  const handleClick = (e: SyntheticEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  const buttonStyles = classNames(
    'outline-2',
    'outline-offset-2',
    'outline-blue',
    'focus:outline',
    { 'bg-grey opacity-25': isDisabled },
    className
  );

  if (buttonVariants === Variant.Solid) {
    return (
      <ButtonSolid
        ref={forwardedRef}
        {...props?.rendering?.fields}
        onClick={handleClick}
        className={buttonStyles}
      />
    );
  }

  if (buttonVariants === Variant.Outline) {
    return (
      <ButtonOutline
        ref={forwardedRef}
        {...props.rendering.fields}
        onClick={handleClick}
        className={buttonStyles}
      />
    );
  }

  if (buttonVariants === Variant.Link) {
    return (
      <ButtonLink
        ref={forwardedRef}
        {...props.rendering.fields}
        onClick={handleClick}
        className={buttonStyles}
      />
    );
  }

  return null;
});

export default Button;

Button.displayName = 'Button';
