import { IconColor, IconSize } from 'components/Icons/icon.types';
import { ReactNode, SyntheticEvent } from 'react';

export enum IconBgColor {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  None = '',
}

export type ButtonElement = React.ElementRef<'button'>;
export type IconType =
  | 'ArrowLeftIcon'
  | 'ArrowRightIcon'
  | 'ChevronLeftIcon'
  | 'ChevronRightIcon'
  | 'CloseIcon'
  | 'ChevronDownIcon'
  | 'PlayIcon'
  | 'ChevronUpIcon'
  | 'SearchIcon'
  | 'ContentIcon'
  | 'PhoneIcon'
  | 'FacebookIcon'
  | 'LinkedInIcon'
  | 'ApplyIcon'
  | 'XIcon'
  | 'UserIcon';

export interface IconButtonProps {
  id?: string;
  bgColor?: IconBgColor;
  iconColor?: IconColor;
  iconSize?: IconSize;
  className?: string;
  children?: ReactNode;
  isDisabled?: boolean;
  ariaLabel?: string;
  type: IconType;
  onClick?: (e: SyntheticEvent) => void;
}
