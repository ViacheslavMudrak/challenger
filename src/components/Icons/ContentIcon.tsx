import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ContentsIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Content Icon', decorative, color, size, className } = props;

  return (
    <BaseIcon
      {...props}
      ref={forwardedRef}
      title={title}
      color={color}
      size={size}
      decorative={decorative}
      className={className}
    >
      <path d="M0 0H12V1H0V0Z" />
      <path d="M5.96046e-08 3H8V4H5.96046e-08V3Z" />
      <path d="M5.96046e-08 6H12V7H5.96046e-08V6Z" />
      <path d="M5.96046e-08 9H8V10H5.96046e-08V9Z" />
    </BaseIcon>
  );
});

export default ContentsIcon;

ContentsIcon.displayName = 'ContentsIcon';
