import LatestArticleFeature from './LatestArticles.articleFeature';
import LatestArticleStandard from './LatestArticles.articleStandard';
import { LatestArticleModel } from './LatestArticles.type';

export interface LatestArticleListProps {
  articles: LatestArticleModel[];
  parentLink: string;
}

const LatestArticleList = (props: LatestArticleListProps) => {
  const { articles, parentLink } = props;

  return (
    <div className="flex w-full flex-col flex-wrap items-start justify-center gap-x-6 gap-y-6 lg:flex-row ">
      {articles?.length > 0 && (
        <LatestArticleFeature article={articles[0]} key={'article0'} parentLink={parentLink} />
      )}
      {articles?.length > 1 && (
        <div className="flex h-full flex-col  gap-6 lg:flex-row 2xl:max-h-[408px]  2xl:flex-col">
          <LatestArticleStandard article={articles[1]} key={'article1'} parentLink={parentLink} />
          {articles?.length > 2 && (
            <LatestArticleStandard article={articles[2]} key={'article2'} parentLink={parentLink} />
          )}
        </div>
      )}
    </div>
  );
};

export default LatestArticleList;
