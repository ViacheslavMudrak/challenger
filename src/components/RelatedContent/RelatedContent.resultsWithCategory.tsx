import {
  FilterAnd,
  FilterEqual,
  SearchResultsInitialState,
  SearchResultsStoreState,
  useSearchResults,
  widget,
  WidgetDataType,
} from '@sitecore-search/react';
import RelatedContentList from './RelatedContent.articleList';
import { RelatedContentModel } from './RelatedContent.type';
import Spinner from './RelatedContent.spinner';
import { SEARCH_CONFIG } from 'lib/config';
import { useMemo } from 'react';

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'page' | 'sortType' | 'keyphrase'>;

interface RelatedContentResultsProps {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
  defaultPersona?: string;
  defaultArticleType?: string;
  category: Array<string>;
  shardType: string;
  alignment: string;
}

const RelatedContentMultiCategoryResults = ({
  defaultSortType = 'published_date',
  defaultPage = 1,
  defaultItemsPerPage = 50,
  defaultPersona = 'Individual',
  defaultArticleType = 'IndividualArticle',
  category = [],
  shardType,
  alignment,
}: RelatedContentResultsProps) => {
  const defaultFilters = useMemo(() => {
    return [
      new FilterEqual('type', defaultPersona),
      new FilterEqual('article_type', defaultArticleType),
    ];
  }, [defaultArticleType, defaultPersona]);

  const {
    widgetRef,
    state: { page },
    queryResult: { isLoading, isFetching, data: { content: articles = [] } = {} },
  } = useSearchResults<RelatedContentModel, InitialState>({
    query: (query) => {
      const withFilter = query.getRequest().setSearchOffset(0);

      withFilter.setSearchFilter(new FilterAnd(defaultFilters));
      withFilter.setSources([SEARCH_CONFIG.source]);

      return withFilter;
    },
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: '*',
    },
  });

  const getArticlesForSelectedCategories = (): RelatedContentModel[] => {
    return articles
      .filter(
        (article) =>
          article?.category &&
          article?.category?.length >= 1 &&
          article.category[0].split(',')?.some((cat) => {
            return category.includes(cat.trim());
          })
      )
      .slice(0, 3);
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner loading />
      </div>
    );
  }

  return (
    <div ref={widgetRef} className="flex w-full flex-col items-center gap-5">
      <RelatedContentList
        currentPage={page}
        articles={getArticlesForSelectedCategories()}
        shardType={shardType}
        alignment={alignment}
      />
    </div>
  );
};

const RelatedContentCategoryResultsWidget = widget(
  RelatedContentMultiCategoryResults,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);

export default RelatedContentCategoryResultsWidget;
