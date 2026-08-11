import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const BoxCheckIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Box Check Icon', decorative, color, size, className } = props;

  return (
    <BaseIcon
      {...props}
      ref={forwardedRef}
      title={`${title}`}
      color={color}
      size={size}
      decorative={decorative}
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.903 3.286H3.226v9.678h9.677V3.286zM11.483 6.4L7.026 10.77 4.516 8.311l.803-.79 1.706 1.67 3.656-3.582.803.79z"
      />
    </BaseIcon>
  );
});

export default BoxCheckIcon;

BoxCheckIcon.displayName = 'BoxCheckIcon';
