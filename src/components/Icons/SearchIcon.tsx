import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const SearchIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Search Icon', decorative, color, size, className } = props;

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
        d="M7.029 9.955A2.965 2.965 0 0010.003 7 2.965 2.965 0 007.03 4.046 2.965 2.965 0 004.055 7a2.965 2.965 0 002.974 2.955zm0 1.38c2.41 0 4.362-1.941 4.362-4.335 0-2.393-1.953-4.333-4.362-4.333-2.41 0-4.362 1.94-4.362 4.333 0 2.394 1.953 4.334 4.362 4.334z"
      />
      <path d="M10.452 9.496l2.881 2.862-.981.975-2.881-2.862.981-.975z" />
    </BaseIcon>
  );
});

export default SearchIcon;

SearchIcon.displayName = 'SearchIcon';
