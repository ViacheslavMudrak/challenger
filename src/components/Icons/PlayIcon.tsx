import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const PlayIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Play Icon', decorative, color, size, className } = props;

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
      <path d="M14.6665 7.99998L3.99984 14.6666L3.99984 1.33331L14.6665 7.99998Z" />
    </BaseIcon>
  );
});

export default PlayIcon;

PlayIcon.displayName = 'PlayIcon';
