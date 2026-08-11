import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const LightIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Light Icon', decorative, color, size, className } = props;

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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 6.524A3.525 3.525 0 018.524 3a3.525 3.525 0 013.524 3.524 3.527 3.527 0 01-2.115 3.23v.764H7.114v-.765l-.022-.01A3.524 3.524 0 015 6.524zm4.866.05l-.326.457-1.112 1.554-.689-.495.755-1.059h-.808l-.514-.366.342-.483 1.1-1.532.688.495-.745 1.037h.77l.54.385v.007z"
      />
      <path d="M9.933 12.397v-.94H7.114v.94h2.82z" />
    </BaseIcon>
  );
});

export default LightIcon;

LightIcon.displayName = 'LightIcon';
