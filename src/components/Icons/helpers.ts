import { IconColor, IconSize } from './icon.types';

export const merge = (
  size: IconSize,
  className: string,
  color: IconColor = IconColor.Black
): string => {
  return `${size.toString()} fill-current ${color.toString()} ${className}`;
};
