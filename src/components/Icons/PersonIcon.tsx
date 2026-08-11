import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const PersonIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Person Icon', decorative, color, size, className } = props;

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
        d="M8.038 3.301a3.289 3.289 0 013.289 3.29L12.66 8.94h-1.334v2.349H9.425v1.41H5.688v-2.155C3.6 9.697 2.44 7.028 4.204 4.5c.535-.767 1.434-1.2 2.37-1.2h1.464zm.742 3.29a.668.668 0 101.337.003.668.668 0 00-1.337-.004z"
      />
    </BaseIcon>
  );
});

export default PersonIcon;

PersonIcon.displayName = 'PersonIcon';
