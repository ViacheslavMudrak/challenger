import {
  ComponentParams,
  ComponentRendering,
  Field,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

export interface Fields {
  data: {
    items: {
      children: {
        results: LinkItem[];
      };
    };
    Title: TitleItem;
    Link: LinkItem;
  };
}

export interface TitleItem {
  field: {
    Title: Field<string>;
  };
}

export interface LinkItem {
  field: {
    Link: LinkField;
  };
}

export interface FooterMainLinksProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
