import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const HomeIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Home Icon', decorative, color, size, className } = props;

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
      <path d="M12.226 7.53h-.94v4.699h-1.88v-2.82H6.587v2.82h-1.88V7.53h-.933v-.858l4.223-2.9 4.229 2.9v.858z" />
    </BaseIcon>
  );
});

export default HomeIcon;

HomeIcon.displayName = 'HomeIcon';
