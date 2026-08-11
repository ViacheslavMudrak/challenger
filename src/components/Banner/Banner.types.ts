import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import { ColorType, Variant } from 'components/Button/Button.types';

export type ButtonType = {
  label: string;
  url: string;
  variant: Variant;
  withArrow?: boolean;
  color: ColorType;
  isDisabled: boolean;
};

export type ImageType = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

export enum TemplateMapping {
  Default = 'Default',
  IND_T1_Header_Banner = 'Template1',
  CTA_Middle_Banner_Large = 'Template2',
  ADV_T1_Header_Banner = 'Template3',
  INSTO_T1_Header_Banner = 'Template4',
  CTA_Footer_Banner_No_Image = 'Template5',
  IND_T2_Header_Banner = 'Template6',
  ADV_T2_Header_Banner = 'Template7',
  INSTO_T2_Header_Banner = 'Template8',
  GEN_T3_Header_Banner = 'Template9',
  GEN_T3_Product_Banner = 'Template10',
  ADV_T3_Header_Banner = 'Template11',
  GEN_T4_Header_Banner = 'Template12',
  ADV_T4_Header_Banner = 'Template13',
  IND_T4_Header_Banner = 'Template14',
  INSTO_T4_Header_Banner = 'Template15',
  GEN_T4_Header_Banner_Blue = 'Template16',
  GEN_T4_Header_Banner_Small = 'Template17',
  CTA_Footer_Banner_Image = 'Template18',
  CTA_Middle_Banner_Small = 'Template19',
  GEN_T2_Header_Icon_Banner = 'Template20',
  GEN_T2_FTD_Rates_Banner = 'Template21',
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

export type ArticleSummaryType = {
  ProfileImage?: ImageField;
  FullName?: Field<string>;
  Role?: Field<string>;
  PublishedDate?: Field<string>;
  DurationInMins?: Field<string>;
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

export interface BannerProps extends ArticleSummaryType {
  id?: string;
  BannerImage?: ImageField;
  BannerHeading: RichTextField;
  BannerContent?: Field<string>;
  BannerBgColor?: BgColorField;
  bgColorClass?: string;
  template: string;
  BannerWithAnimation?: Field<boolean>;
  BannerHeadingLevel?: HeadingLevelField;
  BannerSubHeading?: RichTextField;
  ProfileImage?: ImageField;
  ShowRate?: Field<boolean>;
  ShowSharePrice?: Field<boolean>;
  DisclaimerText?: RichTextField;
  Icon1?: ImageField;
  Text1?: RichTextField;
  Icon2?: ImageField;
  Text2?: RichTextField;
  Icon3?: ImageField;
  Text3?: RichTextField;
  Icon4?: ImageField;
  Text4?: RichTextField;
}

export interface BannerComponentProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: BannerProps };
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
