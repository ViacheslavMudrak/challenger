import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

export interface CarouselVariant2Props {
  rendering: ComponentRendering & { params: ComponentParams } & { variant: CarouselVariant };
}

export type HeadingType = 'h2' | 'h3' | 'h4';

export enum CarouselVariant {
  Default = 'Default',
  CarouselBlue = 'CarouselBlue',
  CarouselGreen = 'CarouselGreen',
}

export enum CarouselBgColor {
  Grey = 'bg-grey-light',
  White = 'bg-white',
  Navy = 'bg-bright-navy',
  Green = 'bg-challenger-green',
  Blue = 'bg-blue',
  Teal = 'bg-deep-teal',
  DeepBlue = 'bg-deep-blue',
  LightBlue = 'bg-light-blue',
  None = '',
}
