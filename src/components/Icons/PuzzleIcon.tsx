import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const PuzzleIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Puzzle Icon', decorative, color, size, className } = props;

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
      <path d="M12.116 12.899H4.05V4.834h2.77a1.432 1.432 0 011.226-2.168A1.43 1.43 0 019.27 4.835h2.845V7.57a1.43 1.43 0 100 2.596v2.734z" />
    </BaseIcon>
  );
});

export default PuzzleIcon;

PuzzleIcon.displayName = 'PuzzleIcon';
