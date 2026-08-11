import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const GlassesIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Glasses Icon', decorative, color, size, className } = props;

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
      <path d="M3.865 8.486h2.82l.563.513-.188 1.964-.564.533H4.053l-.564-.533-.184-1.967.563-.51h-.003zM12.135 8.486l.563.51-.184 1.967-.564.533H9.507l-.564-.533L8.755 9l.564-.513h2.819-.003z" />
      <path d="M8.852 9.485l.069.636H7.076l.069-.636h1.707zM11.865 7.887h-.695l-.658-1.939-1.322-.827.207-.614 1.679 1.047.79 2.333zM4.135 7.887h.695l.658-1.939 1.322-.827-.207-.614-1.676 1.047-.792 2.333z" />
    </BaseIcon>
  );
});

export default GlassesIcon;

GlassesIcon.displayName = 'GlassesIcon';
