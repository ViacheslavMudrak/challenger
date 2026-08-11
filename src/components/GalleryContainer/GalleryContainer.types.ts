import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  TextField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';

export type GalleryCardFields = {
  Heading?: Field<string>;
  Content?: RichTextField;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
  WithShadow?: Field<boolean>;
  CardImage?: ImageField;
  BackgroundColor?: {
    fields: {
      Color: Field<string>;
    };
  };
  Alignment?: {
    fields: {
      Alignment: Field<string>;
    };
  };
  UseModal?: Field<boolean>;
  LinkText?: TextField;
  UseProfileShard?: Field<boolean>;
};

export interface GalleryCardProps<T> {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: T };
}

export type HeadingType = 'h2' | 'h3' | 'h4';
export type GapSize = 'sm' | 'md' | 'lg' | 'none';
export enum GalleryCardBgColor {
  Gray = 'bg-grey-light',
  White = 'bg-white',
  Navy = 'bg-bright-navy',
  Green = 'bg-challenger-green',
  Blue = 'bg-blue',
  Teal = 'bg-deep-teal',
  DeepBlue = 'bg-deep-blue',
  LightBlue = 'bg-light-blue',
  None = '',
}
