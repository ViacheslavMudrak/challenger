import { IconProps } from './icon.types';
import { forwardRef } from 'react';
import BaseIcon from './BaseIcon';

export const ApplyIcon = forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => {
  const { title = 'Apply Icon', decorative, color, size, className } = props;

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
        d="M8.93376 8.88885C9.395 9.34085 9.99637 9.65038 10.6667 9.74626V13.3333H2.66667V2.66666H10.6667V3.58705C9.61799 3.73705 8.73802 4.41002 8.29941 5.3333H4.00022C3.75476 5.3333 3.55577 5.53228 3.55577 5.77774C3.55577 6.0232 3.75476 6.22218 4.00022 6.22218H8.03151C8.01075 6.36735 8 6.51575 8 6.66666C8 7.1438 8.10742 7.59586 8.29938 7.99996H4.00022C3.75476 7.99996 3.55577 8.19895 3.55577 8.44441C3.55577 8.68987 3.75476 8.88885 4.00022 8.88885H8.93376ZM4 11.5555C3.75454 11.5555 3.55556 11.3566 3.55556 11.1111C3.55556 10.8656 3.75454 10.6667 4 10.6667H9.33333C9.57879 10.6667 9.77778 10.8656 9.77778 11.1111C9.77778 11.3566 9.57879 11.5555 9.33333 11.5555H4Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1111 8.88888C12.3384 8.88888 13.3333 7.89396 13.3333 6.66666C13.3333 5.43936 12.3384 4.44443 11.1111 4.44443C9.88381 4.44443 8.88889 5.43936 8.88889 6.66666C8.88889 7.89396 9.88381 8.88888 11.1111 8.88888ZM10.7392 7.55552L12.4451 6.04913L12.1378 5.77774L10.7392 7.01275L10.0858 6.43568L9.77843 6.70706L10.7392 7.55552Z"
      />
    </BaseIcon>
  );
});

export default ApplyIcon;

ApplyIcon.displayName = 'ApplyIcon';
