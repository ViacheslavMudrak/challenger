import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  LinkField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';

export type IconType =
  | 'UmbrellaIcon'
  | 'CoinIcon'
  | 'PersonIcon'
  | 'CheckIcon'
  | 'ChartBarIcon'
  | 'ChartPieIcon'
  | 'LockIcon'
  | 'ChatIcon'
  | 'ApplyIcon'
  | 'ConnectIcon';

export enum CardType {
  Info1 = 'icon_card',
  Info2 = 'text_card',
  Info3 = 'text_card_with_shards',
  Info4 = 'image_card_with_shards',
  Info5 = 'clipart_card',
  Info6 = 'image_card',
  Info7 = 'landscape_image_card_with_shards',
  Info8 = 'landscape_article_card',
  Info9 = 'article_card_1',
  Info10 = 'article_card_2',
  Info11 = 'landscape_text_card_with_shards',
  Info12 = 'landscape_banner_card_with_shards',
  Info13 = 'social_card',
  Info14 = 'case_study_card',
}

export type CardFields = {
  Heading?: Field<string>;
  SubHeading?: Field<string>;
  Content?: RichTextField;
  HeadingLevel?: {
    fields: {
      Level: Field<string>;
    };
  };
  Type: Field<string>;
  WithShadow?: Field<boolean>;
  WithBorder?: Field<boolean>;
  Size?: {
    fields: {
      Size: Field<string>;
    };
  };
  BorderTopColor?: {
    fields: {
      Color: Field<string>;
    };
  };
  CardImage?: ImageField;
  Link?: LinkField;
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
};

export type HeadingType = 'h2' | 'h3' | 'h4';
export type CardSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
export type GapSize = 'sm' | 'md' | 'lg' | 'none';

export enum ShardColorType {
  Teal = 'bg-deep-teal',
  LightBlue = 'bg-light-blue',
  Navy = 'bg-bright-navy',
  Green = 'bg-green',
  None = '',
}

export type ShardType = 'profile' | 'article';

export interface CardProps<T> {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: T };
}

export enum CardTab {
  Profile = 'profile',
  Strategy = 'strategy',
  Overview = 'overview',
  Result = 'result',
}
