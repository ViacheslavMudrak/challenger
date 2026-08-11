import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const EyeOpenIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Eye Open  Icon', decorative, color, size, className } = props;

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
        d="M12.773 8.012C11.747 6.238 9.948 5.125 8.01 5.125c-1.96 0-3.76 1.115-4.783 2.887 1.02 1.762 2.815 2.863 4.783 2.863 1.945 0 3.74-1.1 4.762-2.863zm1.66.34C13.21 10.836 10.77 12.5 8.01 12.5c-2.78 0-5.222-1.664-6.443-4.148a.883.883 0 010-.68C2.788 5.188 5.23 3.5 8.01 3.5c2.759 0 5.2 1.688 6.421 4.172a.884.884 0 010 .68z"
      />
      <path d="M7.428 6.09C7.59 6.053 7.84 6.017 8 6c1.107 0 2 .91 2 2 0 1.107-.893 2-2 2s-2-.893-2-2c0-.16.036-.393.09-.554.106.072.338.125.481.125.536 0 1-.446 1-1a1.65 1.65 0 00-.143-.482z" />
    </BaseIcon>
  );
});

export default EyeOpenIcon;

EyeOpenIcon.displayName = 'EyeOpenIcon';
