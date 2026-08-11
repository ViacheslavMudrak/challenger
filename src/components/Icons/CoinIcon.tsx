import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const CoinIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Coin Icon', decorative, color, size, className } = props;

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
      <path d="M9.41 12.698a2.82 2.82 0 110-5.638 2.82 2.82 0 010 5.638zM6.356 6.525c1.428 0 2.584-.72 2.584-1.61 0-.89-1.156-1.61-2.584-1.61-1.429 0-2.585.72-2.585 1.61 0 .89 1.156 1.61 2.585 1.61z" />
      <path d="M5.967 8.376c.17-.382.385-.711.645-1-.084.01-.166.02-.253.02-1.429 0-2.585-.721-2.585-1.61V6.79c0 .808.956 1.466 2.196 1.585h-.003zM5.717 10.562a3.584 3.584 0 01-.05-1.018C4.572 9.356 3.77 8.74 3.77 8v1.005c0 .752.827 1.379 1.946 1.557zM6.356 12.698c.178 0 .353-.012.526-.034H6.86a2.324 2.324 0 01-.31-.348l-.007-.006a3.567 3.567 0 01-.426-.614l-.009-.019c-1.31-.078-2.337-.758-2.337-1.594v1.005c0 .89 1.156 1.61 2.585 1.61z" />
    </BaseIcon>
  );
});

export default CoinIcon;

CoinIcon.displayName = 'CoinIcon';
