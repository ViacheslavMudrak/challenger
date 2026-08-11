import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const UserIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'User Icon', decorative, color, size, className } = props;

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
        d="M8 6.095a1.875 1.875 0 100-3.75 1.875 1.875 0 000 3.75zM8 7.72a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM3.944 9.22h8.332l1.945 6.125H2L3.944 9.22zm1.19 1.625L4.22 13.72H12l-.913-2.875H5.133z"
      />
    </BaseIcon>
  );
});

export default UserIcon;

UserIcon.displayName = 'UserIcon';
