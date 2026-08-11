import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const MailIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Mail Icon', decorative, color, size, className } = props;

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
      <path d="M12.698 4.241v2.35L8 8.47 3.301 6.59V4.241h9.397z" />
      <path d="M3.301 7.602v4.157h9.397V7.602L8 9.482l-4.699-1.88z" />
    </BaseIcon>
  );
});

export default MailIcon;

MailIcon.displayName = 'MailIcon';
