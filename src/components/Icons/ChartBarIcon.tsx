import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ChartBarIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Chart Bar Icon', decorative, color, size, className } = props;

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
      <path d="M10.688 3.301h2.5v8.458h1.108v.94H1.707v-.94H2.81V8h2.5v3.759h1.44V5.65h2.5v6.108h1.438V3.3z" />
    </BaseIcon>
  );
});

export default ChartBarIcon;

ChartBarIcon.displayName = 'ChartBarIcon';
