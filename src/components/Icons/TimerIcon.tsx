import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const TimerIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Timer Icon', decorative, color, size, className } = props;

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
      <path d="M8 12.5a4.5 4.5 0 00.5-8.973V5H7V2h1a6 6 0 11-3.872 1.416l1.064 1.068A4.5 4.5 0 008 12.5z" />
      <path d="M5.501 6.208l.707-.707 2.62 2.62-.707.707-2.62-2.62z" />
    </BaseIcon>
  );
});

export default TimerIcon;

TimerIcon.displayName = 'TimerIcon';
