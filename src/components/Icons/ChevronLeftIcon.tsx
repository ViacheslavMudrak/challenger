import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ChevronLeftIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Chevron Left Icon', decorative, color, size, className } = props;

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
        d="M10.816 1.316l1.237 1.237-5.63 5.631 5.63 5.632-1.237 1.237-6.869-6.869 6.87-6.868z"
      />
    </BaseIcon>
  );
});

export default ChevronLeftIcon;

ChevronLeftIcon.displayName = 'ChevronLeftIcon';
