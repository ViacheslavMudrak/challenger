import { RelatedContentModel } from './RelatedContent.type';
import RelatedContentCard from './RelatedContent.articleCard';
import classNames from 'classnames';

export interface RelatedContentListProps {
  articles: RelatedContentModel[];
  currentPage: number;
  shardType: string;
  alignment: string;
}

const RelatedContentList = (props: RelatedContentListProps) => {
  const { articles, shardType, alignment } = props;

  return (
    <div
      className={classNames(
        'flex w-full flex-col flex-wrap items-start justify-center gap-x-6 gap-y-6 md:flex-row md:items-stretch',
        alignment
      )}
    >
      {articles?.length > 0 && (
        <RelatedContentCard article={articles[0]} key={'article0'} shardType={shardType} />
      )}
      {articles?.length > 1 && (
        <RelatedContentCard article={articles[1]} key={'article1'} shardType={shardType} />
      )}
      {articles?.length > 2 && (
        <RelatedContentCard article={articles[2]} key={'article2'} shardType={shardType} />
      )}
    </div>
  );
};

export default RelatedContentList;
