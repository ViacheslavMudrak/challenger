import { Field, ImageField } from '@sitecore-content-sdk/nextjs';

export type ArticleBannerImageType = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export type ArticleSummaryType = {
  ProfileImage?: ImageField;
  FullName?: Field<string>;
  PublishedDate?: Field<string>;
  ReadInMins?: Field<string>;
};

export interface HeadingLevelField {
  fields: {
    Level: Field<string>;
  };
}
export interface BgColorField {
  fields: {
    Color: Field<string>;
  };
}

export enum BannerBgColor {
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

export interface PageFields {
  ArticleTitle?: Field<string>;
  BannerSubheading?: Field<string>;
  BannerBgColor: BgColorField;
  ProfileImage?: ImageField;
  FullName?: Field<string>;
  PublishedDate?: Field<string>;
  ArticleImageUrl?: ImageField;
  ReadInMins?: Field<string>;
  HeadingLevel?: Field<string>;
}
