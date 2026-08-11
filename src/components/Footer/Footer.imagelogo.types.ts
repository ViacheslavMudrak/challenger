import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

export interface Fields {
  Image: ImageField;
  ImageCaption: Field<string>;
  TargetUrl: LinkField;
}

export interface FooterLogoProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
