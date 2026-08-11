import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const XIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'X Icon', decorative, color, size, className } = props;

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
      <path d="M11.4688 2.58337H13.3073L9.29167 7.17192L14.0156 13.4167H10.3177L7.41927 9.63025L4.10677 13.4167H2.26563L6.5599 8.50785L2.03125 2.58337H5.82292L8.4401 6.04431L11.4688 2.58337ZM10.8229 12.3177H11.8411L5.26823 3.62504H4.17448L10.8229 12.3177Z" />
    </BaseIcon>
  );
});

export default XIcon;

XIcon.displayName = 'XIcon';
