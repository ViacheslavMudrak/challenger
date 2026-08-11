import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const DownloadIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Download Icon', decorative, color, size, className } = props;

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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.188 7.632V2h1.625v5.632l2.566-2.606 1.158 1.14L8 10.773 3.463 6.166l1.158-1.14 2.566 2.606zM13 12.188v1.624H3v-1.624h10z"
      />
    </BaseIcon>
  );
});

export default DownloadIcon;

DownloadIcon.displayName = 'DownloadIcon';
