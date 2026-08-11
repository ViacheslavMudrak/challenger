import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const TwitterIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Twitter Icon', decorative, color, size, className } = props;

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
      <path d="M13.31 5.314a5.757 5.757 0 001.357-1.388c-.47.206-1.018.36-1.566.411a2.644 2.644 0 001.2-1.49 5.84 5.84 0 01-1.722.668 2.76 2.76 0 00-2.009-.848c-1.513 0-2.74 1.208-2.74 2.698 0 .206.026.412.079.617a7.99 7.99 0 01-5.662-2.827 2.595 2.595 0 00-.366 1.362c0 .926.47 1.748 1.227 2.236-.444-.025-.888-.128-1.253-.334v.026c0 1.31.94 2.39 2.192 2.647-.209.052-.47.103-.705.103-.182 0-.339-.026-.521-.051.339 1.08 1.356 1.85 2.557 1.876a5.561 5.561 0 01-3.392 1.157 5.16 5.16 0 01-.653-.052c1.2.771 2.636 1.208 4.201 1.208 5.036 0 7.776-4.086 7.776-7.66v-.359z" />
    </BaseIcon>
  );
});

export default TwitterIcon;

TwitterIcon.displayName = 'TwitterIcon';
