export type LatestArticleModel = {
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

export interface LatestArticleProps {
  article: LatestArticleModel;
  parentLink?: string;
}
