import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ArrowLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Arrow Left Icon', decorative, color, size, className } = props;

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
      <path d="M14.157 8.985H3.324v-1.5h10.833v1.5z" />
      <path d="M5.91 12.485L1.666 8.242l1.06-1.06 4.243 4.242-1.06 1.061z" />
      <path d="M5.914 4L1.67 8.243l1.06 1.06 4.243-4.242L5.914 4z" />
    </BaseIcon>
  );
});

export default ArrowLeftIcon;

ArrowLeftIcon.displayName = 'ArrowLeftIcon';
