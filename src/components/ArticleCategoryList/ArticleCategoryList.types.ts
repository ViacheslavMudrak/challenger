import { Field, LinkField } from '@sitecore-content-sdk/nextjs';

export type CategoryListField = {
  SearchTitle?: Field<string>;
  ShowResultsCount?: Field<number>;
  TitleText?: Field<string>;
  AllLink: LinkField;
  ArticleParent?: LinkField;
};

export enum HorizontalFlexAlignment {
  left = 'start',
  center = 'center',
  right = 'end',
}
