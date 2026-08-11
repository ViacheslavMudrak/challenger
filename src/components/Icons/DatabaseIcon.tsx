import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const DatabaseIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Database Icon', decorative, color, size, className } = props;

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
      <path d="M4.241 10.738c0 .52 1.682.94 3.759.94s3.759-.42 3.759-.94v-.896c-1.143.429-3.017.48-3.759.48s-2.616-.048-3.759-.48v.896zM4.241 6.637c.279.21 1.591.674 3.759.674s3.48-.464 3.759-.674V5.265c-1.012.508-2.631.777-3.759.777-1.128 0-2.747-.27-3.759-.777v1.372zM4.241 8.95c.279.209 1.591.566 3.759.566s3.48-.357 3.759-.567V7.637c-1.012.507-2.631.61-3.759.61-1.128 0-2.747-.103-3.759-.61v1.312z" />
      <path d="M8 6.205c-2.077 0-3.759-.42-3.759-.94s1.682-.94 3.759-.94 3.759.424 3.759.94c0 .517-1.682.94-3.759.94z" />
    </BaseIcon>
  );
});

export default DatabaseIcon;

DatabaseIcon.displayName = 'DatabaseIcon';
