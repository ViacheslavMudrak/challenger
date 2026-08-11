import {
  FilterAnd,
  FilterEqual,
  SearchResultsInitialState,
  SearchResultsStoreState,
  useSearchResults,
  widget,
  WidgetDataType,
} from '@sitecore-search/react';
import LatestArticleList from './LatestArticles.articleList';
import { LatestArticleModel } from './LatestArticles.type';
import Spinner from './LatestArticles.spinner';
import { SEARCH_CONFIG } from 'lib/config';
import { useMemo } from 'react';

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'page' | 'sortType' | 'keyphrase'>;

interface LatestArticleResultsProps {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
  defaultPersona?: string;
  defaultArticleType?: string;
  parentLink?: string;
}

const LatestArticleResults = ({
  defaultSortType = 'published_date',
  defaultPage = 1,
  defaultItemsPerPage = 3,
  defaultPersona = 'Individual',
  defaultArticleType = 'IndividualArticle',
  parentLink = '/',
}: LatestArticleResultsProps) => {
  const filters = useMemo(() => {
    return [
      new FilterEqual('type', defaultPersona),
      new FilterEqual('article_type', defaultArticleType),
    ];
  }, [defaultArticleType, defaultPersona]);

  const {
    widgetRef,
    queryResult: { isLoading, isFetching, data: { content: articles = [] } = {} },
  } = useSearchResults<LatestArticleModel, InitialState>({
    query: (query) => {
      const withFilter = query.getRequest().setSearchOffset(0);

      withFilter.setSearchFilter(new FilterAnd(filters));
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

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner loading />
      </div>
    );
  }

  return (
    <div ref={widgetRef} className="flex w-full flex-col items-center gap-5">
      <LatestArticleList articles={articles} parentLink={parentLink} />
    </div>
  );
};

const LatestArticleResultsWidget = widget(
  LatestArticleResults,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);

export default LatestArticleResultsWidget;
