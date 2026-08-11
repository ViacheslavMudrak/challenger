import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ArrowRightIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Arrow Right Icon', decorative, color, size, className } = props;

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
      <path d="M1.667 7.5H12.5V9H1.667V7.5z" />
      <path d="M9.914 4l4.243 4.243-1.06 1.06-4.243-4.242L9.914 4z" />
      <path d="M9.91 12.485l4.242-4.243-1.06-1.06-4.243 4.242 1.06 1.061z" />
    </BaseIcon>
  );
});

export default ArrowRightIcon;

ArrowRightIcon.displayName = 'ArrowRightIcon';
