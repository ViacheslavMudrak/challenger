import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const FacebookIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Facebook Icon', decorative, color, size, className } = props;

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
      <path d="M10.318 8.667H8.863v4.666h-1.94V8.667h-1.59V6.75h1.59V5.27c0-1.666.932-2.603 2.347-2.603.68 0 1.397.146 1.397.146v1.645h-.795c-.776 0-1.009.5-1.009 1.042v1.25h1.726l-.271 1.917z" />
    </BaseIcon>
  );
});

export default FacebookIcon;

FacebookIcon.displayName = 'FacebookIcon';
