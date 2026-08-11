import type { SearchResultsInitialState, SearchResultsStoreState } from '@sitecore-search/react';
import {
  FilterAnd,
  FilterEqual,
  WidgetDataType,
  useSearchResults,
  widget,
} from '@sitecore-search/react';
import Spinner from './Search.spinner';
import QueryResultsSummary from './Search.queryResultsSummary';
import ArticleHorizontalItemCard from './Search.articleHorizontalItemCard';
import SearchPagination from './Search.searchPagination';
import SortOrder from './Search.sortOrder';

export type ArticleModel = {
  id: string;
  type?: string;
  title?: string;
  name?: string;
  subtitle?: string;
  url?: string;
  description?: string;
  content_text?: string;
  image_url?: string;
  source_id?: string;
};

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'keyphrase' | 'page' | 'sortType'>;

interface ArticleSearchResultsProps {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
}

export const SearchResultsComponent = ({
  defaultSortType = 'featured_desc',
  defaultPage = 1,
  defaultKeyphrase = '',
  defaultItemsPerPage = 10,
}: ArticleSearchResultsProps) => {
  const defaultFilters = [new FilterEqual('hidefromsearch', 'false')];
  const {
    widgetRef,
    actions: { onItemClick },
    state: { page, itemsPerPage },
    queryResult: {
      isLoading,
      isFetching,
      data: { total_item: totalItems = 0, content: articles = [] } = {},
    },
  } = useSearchResults<ArticleModel, InitialState>({
    query: (query) => {
      const withFilter = query.getRequest().setSearchOffset(0);

      withFilter.setSearchFilter(new FilterAnd(defaultFilters));

      return withFilter;
    },
    state: {
      sortType: defaultSortType,
      page: defaultPage,
      itemsPerPage: defaultItemsPerPage,
      keyphrase: defaultKeyphrase,
    },
  });
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner loading />
      </div>
    );
  }
  return (
    <div search_result_status={totalItems > 0 ? 'found' : 'not found'} ref={widgetRef}>
      <div className="relative flex max-w-full flex-col text-black text-opacity-75">
        {isFetching && (
          <div className="fixed bottom-0 left-0 right-0 top-0 z-30 h-full w-full bg-white opacity-50">
            <div className="absolute left-[50%] top-[50%] z-40 flex -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center">
              <Spinner loading />
            </div>
          </div>
        )}

        <section className="flex w-full flex-col">
          <div className="flex flex-col justify-between gap-2 lg:flex-row">
            <div className="flex w-full flex-col">
              {totalItems > 0 && (
                <section className="flex gap-1">
                  <span className="text-base text-bright-navy">Showing results for</span>
                  <span className="font-roboto-700 text-base text-bright-navy">
                    {defaultKeyphrase}
                  </span>
                </section>
              )}
              <section className="flex justify-between pt-2 text-xs">
                {totalItems > 0 && (
                  <QueryResultsSummary
                    currentPage={page}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    totalItemsReturned={articles.length}
                  />
                )}
              </section>
            </div>
            {totalItems > 0 && (
              <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
                <label className="text-nowrap font-roboto-700">Sort by</label>
                <SortOrder
                  options={[
                    { label: 'Relevance', name: 'featured_desc' },
                    { label: 'Latest date', name: 'featured_date' },
                  ]}
                  selected={defaultSortType}
                />
              </div>
            )}
          </div>

          {totalItems > 0 && (
            <div className="w-full">
              {articles.map((a, index) => (
                <ArticleHorizontalItemCard
                  key={a.id}
                  article={a as ArticleModel}
                  index={index}
                  onItemClick={onItemClick}
                  displayText={true}
                />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex w-full flex-col p-4 md:flex-row md:justify-center">
              <SearchPagination currentPage={page} totalPages={totalPages} />
            </div>
          )}
        </section>

        {totalItems <= 0 && !isFetching && (
          <div className="flex w-full justify-start pt-5">
            <h3 className="font-roboto-400 text-lg text-bright-navy">
              There are no results for <span className="font-bold">{defaultKeyphrase}</span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};
const SearchResultsWidget = widget(
  SearchResultsComponent,
  WidgetDataType.SEARCH_RESULTS,
  'content'
);
export default SearchResultsWidget;
