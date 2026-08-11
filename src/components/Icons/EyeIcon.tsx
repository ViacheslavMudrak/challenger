import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const EyeIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Eye Icon', decorative, color, size, className } = props;

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
      <path d="M3.302 8c2.593 4.385 6.803 4.385 9.396 0-2.593-4.385-6.803-4.385-9.396 0zm3.426.608a1.41 1.41 0 011.88-1.88h.01L6.73 8.614s-.003-.006-.003-.01v.004zM8 9.41c-.216 0-.423-.05-.608-.138a.898.898 0 01-.131-.075L9.197 7.26c.028.04.053.084.075.131A1.41 1.41 0 018 9.41z" />
    </BaseIcon>
  );
});

export default EyeIcon;

EyeIcon.displayName = 'EyeIcon';
