import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ChevronDownIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Chevron Down Icon', decorative, color, size, className } = props;

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
        d="M1.131 5.369L2.37 4.13 8 9.763l5.631-5.632L14.87 5.37 8 12.237 1.131 5.37z"
      />
    </BaseIcon>
  );
});

export default ChevronDownIcon;

ChevronDownIcon.displayName = 'ChevronDownIcon';
