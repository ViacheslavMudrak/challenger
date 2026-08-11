import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  LinkField,
} from '@sitecore-content-sdk/nextjs';

export interface Fields {
  CardTitle: Field<string>;
  CardContent: Field<string>;
  CardLink: LinkField;
  CardImage: ImageField;
  CardTitleStyle?: HeaderType;
  CardTags?: Tag[];
}

export interface HeaderType {
  fields: {
    HeaderType: Field<string>;
  };
}

export interface Tag {
  fields: {
    TagTitle: Field<string>;
  };
}

export interface POCCardProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: Fields };
}
