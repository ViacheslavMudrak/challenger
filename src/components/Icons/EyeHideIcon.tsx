import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const EyeHideIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Eye Hide Icon', decorative, color, size, className } = props;

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
      <path d="M2.343 3.975l10.5 9 .814-.95-10.5-9-.814.95zM11.706 9.366a6.02 6.02 0 001.067-1.354C11.747 6.238 9.948 5.125 8.01 5.125c-.378 0-.75.041-1.111.121L5.447 4c.8-.323 1.664-.5 2.564-.5 2.759 0 5.2 1.688 6.421 4.172a.884.884 0 010 .68 7.714 7.714 0 01-1.487 2.075l-1.239-1.061zM3.065 5.581a7.779 7.779 0 00-1.497 2.09.883.883 0 000 .68C2.788 10.837 5.23 12.5 8.01 12.5c.893 0 1.753-.174 2.55-.495l-1.456-1.247a5.162 5.162 0 01-1.094.117c-1.968 0-3.763-1.101-4.783-2.863a6.08 6.08 0 011.076-1.37l-1.239-1.06z" />
      <path d="M6.002 8.099a1.997 1.997 0 002.206 1.89L6.002 8.1zM7.808 6.024l2.19 1.877A2.009 2.009 0 008 6a7.082 7.082 0 00-.192.024z" />
    </BaseIcon>
  );
});

export default EyeHideIcon;

EyeHideIcon.displayName = 'EyeHideIcon';
