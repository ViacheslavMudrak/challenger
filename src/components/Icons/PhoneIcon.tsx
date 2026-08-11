import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const PhoneIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Phone Icon', decorative, color, size, className } = props;

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
      <path d="M2.667 3.333l3-.666 1.666 3-1.745 1.396a8.04 8.04 0 003.35 3.35l1.395-1.746 3 1.666-.666 3H12A9.334 9.334 0 012.667 4v-.667z" />
    </BaseIcon>
  );
});

export default PhoneIcon;

PhoneIcon.displayName = 'PhoneIcon';
