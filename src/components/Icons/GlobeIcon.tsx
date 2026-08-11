import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const GlobeIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Globe Icon', decorative, color, size, className } = props;

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
      <path d="M8.013 3.38c-.674 0-1.35.833-1.739 2.13h3.48c-.391-1.297-1.068-2.13-1.738-2.13h-.003zM12.35 6.428h-1.456a10.349 10.349 0 010 3.144h1.457c.188-.513.282-1.04.282-1.572s-.094-1.059-.282-1.572zM6.061 6.428A9.597 9.597 0 005.933 8c0 .536.043 1.065.128 1.572h3.903a9.602 9.602 0 000-3.144H6.061zM11.893 5.51a4.69 4.69 0 00-1.885-1.673 6.27 6.27 0 01.689 1.673h1.197zM4.128 10.49a4.691 4.691 0 001.886 1.673 6.271 6.271 0 01-.689-1.673H4.128zM10.697 10.49a6.372 6.372 0 01-.69 1.673 4.671 4.671 0 001.886-1.673h-1.196zM5.325 5.51c.17-.636.404-1.206.69-1.673A4.67 4.67 0 004.127 5.51h1.197zM8.013 12.62c.673 0 1.35-.833 1.738-2.13h-3.48c.391 1.297 1.068 2.13 1.738 2.13h.004zM3.671 9.572h1.457A10.317 10.317 0 015.008 8c0-.539.041-1.065.12-1.572H3.67A4.553 4.553 0 003.39 8c0 .533.094 1.059.282 1.572z" />
    </BaseIcon>
  );
});

export default GlobeIcon;

GlobeIcon.displayName = 'GlobeIcon';
