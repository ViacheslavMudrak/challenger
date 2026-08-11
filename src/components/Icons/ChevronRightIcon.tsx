import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ChevronRightIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Chevron Right Icon', decorative, color, size, className } = props;

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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.185 15.053l-1.238-1.237L9.58 8.184l-5.632-5.63 1.238-1.238 6.869 6.868-6.87 6.87z"
      />
    </BaseIcon>
  );
});

export default ChevronRightIcon;

ChevronRightIcon.displayName = 'ChevronRightIcon';
