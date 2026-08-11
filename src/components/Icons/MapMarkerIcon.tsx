import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const MapMarkerIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Map Marker Icon', decorative, color, size, className } = props;

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
      <path d="M8 3.301a3.761 3.761 0 00-3.756 3.76A6.027 6.027 0 008 12.697a6.02 6.02 0 003.752-5.575V7.06A3.758 3.758 0 008 3.301zM8 8.47a1.41 1.41 0 110-2.82 1.41 1.41 0 010 2.82z" />
    </BaseIcon>
  );
});

export default MapMarkerIcon;

MapMarkerIcon.displayName = 'MapMarkerIcon';
