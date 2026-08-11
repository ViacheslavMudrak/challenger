import {
  ComponentParams,
  ComponentRendering,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

export interface Fields {
  items: IconLinkFields[];
}

export interface IconLinkFields {
  fields: {
    Link: LinkField;
    Icon: IconField;
  };
}

export interface IconField {
  fields: {
    IconType: Field<string>;
  };
}

export interface FooterContactLinksProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
