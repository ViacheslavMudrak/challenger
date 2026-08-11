import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const PlaneIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Plane Icon', decorative, color, size, className } = props;

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
      <path d="M8.122 5.306L6.688 6.741 3.756 5.206l1.287-.608 3.08.708zM10.744 12.197L9.212 9.272l1.432-1.432.708 3.067-.608 1.29z" />
      <path d="M8.72 8.332l-2.023 2.023.357 2.159-.2.2-1.441-2.177-2.177-1.44.2-.201 2.161.354 5.705-5.704 1.105-.266.364.363-.37 1.005-3.68 3.678v.006z" />
    </BaseIcon>
  );
});

export default PlaneIcon;

PlaneIcon.displayName = 'PlaneIcon';
