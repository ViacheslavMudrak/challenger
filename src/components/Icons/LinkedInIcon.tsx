import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const LinkedInIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'LinkedIn Icon', decorative, color, size, className } = props;

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
      <path d="M5.054 13.333H2.843V6.212h2.211v7.121zM3.947 5.24a1.291 1.291 0 01-.905-2.198 1.28 1.28 0 012.186.905c0 .708-.574 1.293-1.28 1.293zm7.177 8.093V9.867c0-.827-.016-1.886-1.15-1.886-1.15 0-1.325.897-1.325 1.826v3.526h-2.21V6.212H8.56v.971h.031c.296-.56 1.017-1.15 2.093-1.15 2.238 0 2.65 1.474 2.65 3.388v3.912h-2.21z" />
    </BaseIcon>
  );
});

export default LinkedInIcon;

LinkedInIcon.displayName = 'LinkedInIcon';
