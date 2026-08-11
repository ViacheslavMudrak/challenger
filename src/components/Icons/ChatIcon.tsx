import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ChatIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Chat Icon', decorative, color, size, className } = props;

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
      <path d="M6.587 9.723c-.554 0-1.102-.15-1.585-.436H5l-.16-.094s-.122.047-.16.06l-1.136.379.413-1.237.025-.072-.04-.063c-.577-.912-.64-2.036-.173-3.082A2.827 2.827 0 015.25 3.734c.442-.182.89-.276 1.337-.276 1.047 0 2.02.52 2.603 1.39.596.89.693 2.006.26 3.058a2.843 2.843 0 01-1.456 1.507c-.464.206-.937.31-1.407.31z" />
      <path d="M12.038 11.214l.412 1.233-1.236-.412-.072-.026-.063.041a3.142 3.142 0 01-1.673.486 3.144 3.144 0 01-2.831-1.801h.019c.692 0 1.394-.176 2.03-.508.369-.194.701-.451.986-.767.749-.824 1.134-1.817 1.125-2.888a3.152 3.152 0 011.804 2.834c0 .592-.166 1.172-.486 1.673l-.04.063.025.072z" />
    </BaseIcon>
  );
});

export default ChatIcon;

ChatIcon.displayName = 'ChatIcon';
