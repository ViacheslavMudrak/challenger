import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ExternalLinkIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'External Link Icon', decorative, color, size, className } = props;

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
        d="M8.714 2.188h5.098v5.098h-1.624V4.962L7.324 9.825l-1.15-1.15 4.864-4.863H8.713V2.188zm-6.527.714h4.384v1.625H3.813v7.66h7.839V9.43h1.625v4.383H2.187V2.902z"
      />
    </BaseIcon>
  );
});

export default ExternalLinkIcon;

ExternalLinkIcon.displayName = 'ExternalLinkIcon';
