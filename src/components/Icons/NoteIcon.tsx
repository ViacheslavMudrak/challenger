import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const NoteIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Note Icon', decorative, color, size, className } = props;

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
        d="M4 2.667v10.666h8V2.667H4zm.889 8.444c0 .246.199.445.444.445h5.333a.444.444 0 000-.89H5.333a.444.444 0 00-.444.445zm.444-2.222a.444.444 0 110-.889h5.333a.444.444 0 010 .889H5.333zm0-2.667a.444.444 0 110-.889h5.333a.444.444 0 010 .89H5.333z"
      />
    </BaseIcon>
  );
});

export default NoteIcon;

NoteIcon.displayName = 'NoteIcon';
