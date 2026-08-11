import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const SuitcaseIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Suitcase Icon', decorative, color, size, className } = props;

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
      <path d="M6.327 3h3.346v1.792h-.53V3.53H6.857v1.262h-.53V3.001z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.564 12.348V5.372h6.872v6.976H9.78v.654h-.664v-.654h-2.23v.654H6.22v-.654H4.564zm1.995-1.178c.21 0 .38-.17.38-.38V6.855a.381.381 0 10-.762 0v3.937c0 .21.172.379.382.379zm2.92 0c.21 0 .378-.17.378-.38V6.855a.379.379 0 00-.379-.383.382.382 0 00-.382.383v3.937c0 .21.173.379.382.379z"
      />
    </BaseIcon>
  );
});

export default SuitcaseIcon;

SuitcaseIcon.displayName = 'SuitcaseIcon';
