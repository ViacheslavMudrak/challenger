import {
  FilterAnd,
  FilterEqual,
  SearchResultsInitialState,
  SearchResultsStoreState,
  useSearchResults,
  widget,
  WidgetDataType,
} from '@sitecore-search/react';
import BlogArticleList from './Blog.articleList';
import BlogPaginator from './Blog.paginator';
import { BlogArticleModel } from './Blog.type';
import Spinner from './Blog.spinner';
import { SEARCH_CONFIG } from 'lib/config';
import BlogCategoryList from './Blog.categoryList';
import { useEffect, useMemo, useState } from 'react';
import { BlogField } from './Blog.type';
import { getParentLinkFromPersona } from './Blog.helpers';
import { CATEGORY_NAME_SEARCH_PREFIX, CATEGORY_NAME_SEARCH_WORD_SEPARATOR } from './Blog.constants';

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'page' | 'sortType' | 'keyphrase'>;

interface BlogResultsProps {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPage?: SearchResultsStoreState['page'];
  defaultItemsPerPage?: SearchResultsStoreState['itemsPerPage'];
  defaultKeyphrase?: SearchResultsStoreState['keyphrase'];
  defaultPersona?: string;
  defaultArticleType?: string;
  categoryFromUrl?: string;
  fields: BlogField;
}

const BlogResults = ({
  defaultSortType = 'published_date',
  defaultPage = 1,
  defaultItemsPerPage = 8,
  defaultPersona = 'Individual',
  defaultArticleType = 'IndividualArticle',
  categoryFromUrl = 'All',
  fields,
}: BlogResultsProps) => {
  const defaultFilters = useMemo(() => {
    return [
      new FilterEqual('type', defaultPersona),
      new FilterEqual('article_type', defaultArticleType),
    ];
  }, [defaultArticleType, defaultPersona]);

  const [filters, setFilters] = useState<FilterEqual[]>(defaultFilters);

  const keyword =
    categoryFromUrl && categoryFromUrl?.toLowerCase() !== 'all'
      ? CATEGORY_NAME_SEARCH_PREFIX +
        categoryFromUrl?.toLowerCase()?.replaceAll(' ', CATEGORY_NAME_SEARCH_WORD_SEPARATOR)
      : '*';
  const {
    widgetRef,
    state: { page },
    queryResult: {
      isLoading,
      isFetching,
      data: { total_item: totalItems = 0, content: articles = [], facet: facets = [] } = {},
    },
  } = useSearchResults<BlogArticleModel, InitialState>({
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
      keyphrase: keyword ?? '*',
    },
  });

  useEffect(() => {
    if (categoryFromUrl) {
      defaultFilters.push(new FilterEqual('category', categoryFromUrl));

      setFilters(defaultFilters);
    }
  }, [categoryFromUrl, defaultFilters]);

  if (isLoading || isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner loading />
      </div>
    );
  }

  const totalPages = Math.ceil(totalItems / defaultItemsPerPage);

  const categoryFacet = facets.find((f) => f.name === 'category');

  let categoryList: string[] = [];

  if (categoryFacet && categoryFacet?.value.length > 0) {
    const categoryStr = categoryFacet?.value.flatMap((c) => c.text).join(',');
    categoryList = categoryStr.split(',').map((t) => t.trim());
    categoryList = [...new Set(categoryList)];
    categoryList = categoryList.sort();
  }

  if (page > totalPages) {
    return (
      <div ref={widgetRef} className="flex w-full flex-col items-center gap-5">
        <h2>No articles found</h2>
      </div>
    );
  }

  return (
    <div ref={widgetRef} className="flex w-full flex-col items-center gap-5">
      <BlogCategoryList
        selectedCategory={categoryFromUrl}
        categoryStr={categoryList}
        FilterByCategoryText={fields.FilterByCategoryText}
        allLink={fields?.AllLink?.value?.href}
        parentLink={getParentLinkFromPersona(defaultPersona, fields)}
      />
      <BlogArticleList
        currentPage={page}
        articles={articles}
        parentLink={getParentLinkFromPersona(defaultPersona, fields)}
      />
      {totalPages > 1 && <BlogPaginator currentPage={page} totalPages={totalPages} />}
    </div>
  );
};

const BlogResultsWidget = widget(BlogResults, WidgetDataType.SEARCH_RESULTS, 'content');

export default BlogResultsWidget;
