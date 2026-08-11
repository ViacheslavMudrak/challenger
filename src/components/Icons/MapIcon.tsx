import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const MapIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Map Icon', decorative, color, size, className } = props;

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
      <path fillRule="evenodd" clipRule="evenodd" d="M9.115 12.338l-2.23-.92V3.57l2.23.89v7.877z" />
      <path d="M3.527 4.742v7.89l2.384-1.07V3.665L3.527 4.742zm8.946 6.516v-7.89l-2.384 1.07v7.897l2.384-1.077z" />
    </BaseIcon>
  );
});

export default MapIcon;

MapIcon.displayName = 'MapIcon';
