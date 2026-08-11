import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const UserFilledIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'User Filled Icon', decorative, color, size, className } = props;

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
      <path d="M8.065 8.06a2.46 2.46 0 002.469-2.451 2.461 2.461 0 00-2.47-2.452A2.461 2.461 0 005.596 5.61a2.461 2.461 0 002.47 2.45zm4.322 4.904l-1.235-3.985H4.977l-1.235 3.985h8.645z" />
    </BaseIcon>
  );
});

export default UserFilledIcon;

UserFilledIcon.displayName = 'UserFilledIcon';
