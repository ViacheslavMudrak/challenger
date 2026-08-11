import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const CogIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Cog Icon', decorative, color, size, className } = props;

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
      <path d="M12.633 7.182l-1.112-.234a3.824 3.824 0 00-.232-.561l.62-.952-1.303-1.307-.952.62a3.777 3.777 0 00-.56-.231l-.236-1.112H7.013l-.235 1.112a3.835 3.835 0 00-.56.232l-.953-.62L3.962 5.43l.62.953c-.093.181-.169.366-.231.56l-1.112.235v1.845l1.112.235c.062.194.14.382.232.56l-.62.953 1.302 1.303.953-.62c.181.094.37.17.56.232l.235 1.112h1.845l.235-1.112c.194-.063.382-.141.56-.232l.953.62 1.303-1.306-.62-.952c.094-.182.17-.37.232-.56l1.112-.236V7.176v.006zm-3.89 2.3c-1.473.748-2.936-.715-2.187-2.187.122-.244.326-.445.57-.57 1.472-.748 2.935.714 2.186 2.187a1.302 1.302 0 01-.57.57z" />
    </BaseIcon>
  );
});

export default CogIcon;

CogIcon.displayName = 'CogIcon';
