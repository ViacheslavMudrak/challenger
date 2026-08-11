import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ChartPieIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Chart Pie Icon', decorative, color, size, className } = props;

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
      <path d="M9.685 9.685H5.394a3.482 3.482 0 104.291-4.291v4.291z" />
      <path d="M4 8.974A4.974 4.974 0 018.974 4v4.974H4z" />
    </BaseIcon>
  );
});

export default ChartPieIcon;

ChartPieIcon.displayName = 'ChartPieIcon';
