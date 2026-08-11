import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ArrowDownIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Arrow Down Icon', decorative, color, size, className } = props;

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
      <path d="M8.654 1.997v10.834h-1.5V1.997h1.5z" />
      <path d="M12.154 10.245l-4.242 4.243-1.061-1.061 4.243-4.243 1.06 1.061z" />
      <path d="M3.67 10.24l4.242 4.243 1.06-1.06L4.73 9.18l-1.06 1.06z" />
    </BaseIcon>
  );
});

export default ArrowDownIcon;

ArrowDownIcon.displayName = 'ArrowDownIcon';
