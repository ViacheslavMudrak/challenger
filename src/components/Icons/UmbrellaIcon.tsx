import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const UmbrellaIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Umbrella Icon', decorative, color, size, className } = props;

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
      <path d="M3.584 8.022h1.913C5.57 5.6 6.412 3.925 7.33 3.364a4.57 4.57 0 00-3.89 4.514c0 .078.062.144.144.144zM10.503 8.022c-.072-2.421-.912-4.097-1.832-4.658a4.568 4.568 0 013.893 4.514.144.144 0 01-.144.144h-1.917zM10.553 12.636v-.664H8.319V8.746H7.68v3.226H5.444v.664h5.109z" />
      <path d="M6.096 8.022C6.17 5.782 7.07 3.759 8 3.759h.003c.927 0 1.826 2.02 1.905 4.263H6.096z" />
    </BaseIcon>
  );
});

export default UmbrellaIcon;

UmbrellaIcon.displayName = 'UmbrellaIcon';
