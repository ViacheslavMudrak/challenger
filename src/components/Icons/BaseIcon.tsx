import { IconColor, IconProps, IconSize } from './icon.types';
import { merge } from './helpers';
import { ReactNode, forwardRef, useId } from 'react';

interface BaseIconProps extends IconProps {
  children: ReactNode;
}

const BaseIcon = forwardRef<SVGSVGElement, BaseIconProps>((props, forwardedRef) => {
  const {
    title,
    decorative = true,
    color = IconColor.Black,
    size = IconSize.Sm,
    className = '',
    children,
  } = props;

  const titleId = useId();
  const mergedClassNames = merge(size, className, color);

  return (
    <svg
      viewBox="0 0 16 16"
      role="img"
      fill="none"
      aria-hidden={decorative}
      {...props}
      ref={forwardedRef}
      className={mergedClassNames}
      aria-labelledby={titleId}
    >
      {title && <title id={titleId}>{title}</title>}
      {children}
    </svg>
  );
});

export default BaseIcon;

BaseIcon.displayName = 'BaseIcon';
