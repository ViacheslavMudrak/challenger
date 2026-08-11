export enum IconSize {
  Xs = 'w-3 h-3',
  Sm = 'w-4 h-4',
  Md = 'w-6 h-6',
  Lg = 'w-8 h-8',
  Xl = 'w-12 h-12',
  None = '',
}

export enum IconColor {
  White = 'text-white',
  Blue = 'text-deep-blue',
  Green = 'text-challenger-green',
  Teal = 'text-bright-teal',
  Navy = 'text-bright-navy',
  Gray = 'text-grey',
  Black = 'text-black',
  None = '',
}

export type IconUtilityType =
  | 'SearchIcon'
  | 'UserIcon'
  | 'ChevronDownIcon'
  | 'ChevronUpIcon'
  | 'ChevronLeftIcon'
  | 'ChevronRightIcon'
  | 'ArrowDownIcon'
  | 'ArrowUpIcon'
  | 'ArrowLeftIcon'
  | 'ArrowRightIcon'
  | 'CloseIcon'
  | 'CheckIcon'
  | 'EyeOpenIcon'
  | 'EyeHideIcon'
  | 'CalendarIcon'
  | 'TimerIcon'
  | 'ExternalLinkIcon'
  | 'DownloadIcon'
  | 'ContentIcon'
  | 'PlayIcon';

export type IconGeneralType =
  | 'CoinIcon'
  | 'ChartBarIcon'
  | 'ChartPieIcon'
  | 'CommentIcon'
  | 'ConnectIcon'
  | 'ChatIcon'
  | 'CogIcon'
  | 'DatabaseIcon'
  | 'EyeIcon'
  | 'GlassesIcon'
  | 'GlobeIcon'
  | 'UmbrellaIcon'
  | 'SuitcaseIcon'
  | 'PlaneIcon'
  | 'PersonIcon'
  | 'HomeIcon'
  | 'LightIcon'
  | 'LockIcon'
  | 'MailIcon'
  | 'MapMarkerIcon'
  | 'MapIcon'
  | 'PhoneIcon'
  | 'ApplyIcon'
  | 'NoteIcon'
  | 'SearchUserIcon'
  | 'SearchListIcon'
  | 'UserFilledIcon'
  | 'PuzzleIcon'
  | 'BoxCheckIcon';

export type IconSocialType =
  | 'FacebookIcon'
  | 'XIcon'
  | 'TwitterIcon'
  | 'InstagramIcon'
  | 'LinkedInIcon'
  | 'YoutubeIcon';

export interface IconProps extends React.SVGAttributes<SVGElement> {
  color?: IconColor;
  title?: string;
  decorative?: boolean;
  size?: IconSize;
  className?: string;
}

export type IconType = IconSocialType | IconUtilityType | IconGeneralType;

export type IconGroup = {
  name: string;
  icons: string[];
};
