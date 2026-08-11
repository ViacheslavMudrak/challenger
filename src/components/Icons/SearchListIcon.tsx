import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const SearchListIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Search List Icon', decorative, color, size, className } = props;

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
      <path d="M5.935 5.609v1.032h4.259V5.61H5.935zM5.935 8.964v1.032h4.259V8.964H5.935zM5.935 7.286h4.259V8.32H5.935V7.286z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.065 2.641c-2.887 0-5.226 2.31-5.226 5.162 0 2.85 2.34 5.16 5.226 5.16 1.04 0 2.008-.299 2.822-.816l1.461 1.462.942-.943-1.374-1.375a5.108 5.108 0 001.374-3.488c0-2.851-2.34-5.162-5.225-5.162zm0 1.322c2.143 0 3.888 1.722 3.888 3.84 0 2.117-1.745 3.84-3.888 3.84-2.144 0-3.888-1.723-3.888-3.84 0-2.118 1.744-3.84 3.888-3.84z"
      />
    </BaseIcon>
  );
});

export default SearchListIcon;

SearchListIcon.displayName = 'SearchListIcon';
