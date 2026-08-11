import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ChevronUpIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Chevron Up Icon', decorative, color, size, className } = props;

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
        d="M14.869 11l-1.237 1.237L8 6.607l-5.631 5.63L1.132 11 8 4.131 14.87 11z"
      />
    </BaseIcon>
  );
});

export default ChevronUpIcon;

ChevronUpIcon.displayName = 'ChevronUpIcon';
