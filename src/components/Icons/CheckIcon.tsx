import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const CheckIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Check Icon', decorative, color, size, className } = props;

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
        d="M13.369 5.369L6.5 12.237 2.631 8.37 3.87 7.13 6.5 9.763l5.631-5.632L13.37 5.37z"
      />
    </BaseIcon>
  );
});

export default CheckIcon;

CheckIcon.displayName = 'CheckIcon';
