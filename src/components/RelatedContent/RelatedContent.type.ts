import { ComponentParams, ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';

export type RelatedContentModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  image_url?: string;
  description?: string;
  content_text?: string;
  source_id?: string;
  category?: string[];
  article_description?: string;
  article_link?: string;
  article_title?: string;
  article_type?: string;
  published_date?: string;
  read_in_mins?: string;
};

export interface RelatedContentCardProps {
  article: RelatedContentModel;
  shardType: string;
}

interface CategoryField {
  fields: {
    Category: Field<string>;
  };
}

type RelatedContentField = {
  Categories?: Array<CategoryField>;
  SearchLimit?: Field<string>;
  ShardType?: Field<string>;
};

export interface RelatedContentProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: RelatedContentField };
}
