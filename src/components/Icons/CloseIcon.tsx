import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const CloseIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Close Icon', decorative, color, size, className } = props;

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
        d="M11.5 12.737L3 4.237 4.237 3l8.5 8.5-1.237 1.237z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.237 12.737l8.5-8.5L11.5 3 3 11.5l1.237 1.237z"
      />
    </BaseIcon>
  );
});

export default CloseIcon;

CloseIcon.displayName = 'CloseIcon';
