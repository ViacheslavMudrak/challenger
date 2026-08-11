import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const CommentIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Comment Icon', decorative, color, size, className } = props;

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
      <path d="M12.229 3.774H3.77v6.578h2.82L8 12.23l1.41-1.877h2.819V3.774zM8 8.943H6.12a.471.471 0 01-.47-.47c0-.257.21-.47.47-.47H8a.47.47 0 110 .94zm1.88-2.35H6.12a.471.471 0 01-.47-.47c0-.256.21-.47.47-.47h3.76a.47.47 0 110 .94z" />
    </BaseIcon>
  );
});

export default CommentIcon;

CommentIcon.displayName = 'CommentIcon';
