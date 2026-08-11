import BlogArticleFeature from './Blog.articleFeature';
import BlogArticleStandard from './Blog.articleStandard';
import { BlogArticleModel } from './Blog.type';

export interface BlogArticleListProps {
  articles: BlogArticleModel[];
  currentPage: number;
  parentLink?: string;
}

const BlogArticleList = (props: BlogArticleListProps) => {
  const { articles, currentPage } = props;

  return (
    <div className="flex w-full flex-col flex-wrap items-start justify-stretch gap-x-6 gap-y-6 lg:flex-row">
      {articles.map((a, idx) => {
        if (idx === 0 && currentPage <= 1) {
          return <BlogArticleFeature article={a} key={a.id} parentLink={props?.parentLink} />;
        }

        return <BlogArticleStandard article={a} key={a.id} parentLink={props?.parentLink} />;
      })}
    </div>
  );
};

export default BlogArticleList;
