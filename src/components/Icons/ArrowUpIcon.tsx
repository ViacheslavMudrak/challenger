import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ArrowUpIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Arrow Up Icon', decorative, color, size, className } = props;

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
      <path d="M7.17 14.488V3.654h1.5v10.834h-1.5z" />
      <path d="M3.67 6.24l4.242-4.243 1.06 1.061L4.73 7.301 3.67 6.24z" />
      <path d="M12.154 6.244L7.912 2.002 6.85 3.062l4.243 4.243 1.06-1.06z" />
    </BaseIcon>
  );
});

export default ArrowUpIcon;

ArrowUpIcon.displayName = 'ArrowUpIcon';
