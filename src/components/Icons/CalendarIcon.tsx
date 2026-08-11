import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const CalendarIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Calendar Icon', decorative, color, size, className } = props;

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
      <path d="M2.5 3H14v2.5H2.5V3zM2.5 12H14v1.5H2.5V12zM2.5 5.5H4V12H2.5V5.5zM12.5 5.5H14V12h-1.5V5.5zM5 1.5h1V3H5V1.5zM10 1.5h1V3h-1V1.5z" />
    </BaseIcon>
  );
});

export default CalendarIcon;

CalendarIcon.displayName = 'CalendarIcon';
