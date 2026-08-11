import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const LockIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Lock Icon', decorative, color, size, className } = props;

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
      <path d="M3.771 6.594v6.104h8.458V6.594H3.77zM8 10.584a.938.938 0 11.002-1.875A.938.938 0 018 10.584zM10.343 5.529h-.94a1.408 1.408 0 00-2.806 0h-.94A2.344 2.344 0 018 3.305c1.256 0 2.28.983 2.343 2.224z" />
    </BaseIcon>
  );
});

export default LockIcon;

LockIcon.displayName = 'LockIcon';
