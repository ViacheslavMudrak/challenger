import {
  FilterAnd,
  FilterEqual,
  SearchResultsInitialState,
  SearchResultsStoreState,
  useSearchResults,
  widget,
  WidgetDataType,
} from '@sitecore-search/react';
import { BlogArticleModel } from '../Blog/Blog.type';
import Spinner from '../Blog/Blog.spinner';
import { SEARCH_CONFIG } from 'lib/config';
import { useMemo } from 'react';
import CategoryListRenderer from './ArticleCategoryList.renderer';
import { CategoryListField } from './ArticleCategoryList.types';

type InitialState = SearchResultsInitialState<'itemsPerPage' | 'page' | 'sortType' | 'keyphrase'>;

interface CategoryListResultsProps {
  defaultSortType?: SearchResultsStoreState['sortType'];
  defaultPersona?: string;
  defaultArticleType?: string;
  categoryFromUrl?: string;
  fields: CategoryListField;
  itemsAlignment: string;
}

const CatergoryListResult = ({
  defaultSortType = 'published_date',
  defaultPersona = 'Individual',
  defaultArticleType = 'IndividualArticle',
  categoryFromUrl = 'All',
  fields,
  itemsAlignment,
}: CategoryListResultsProps) => {
  const filters = useMemo(() => {
    return [
      new FilterEqual('type', defaultPersona),
      new FilterEqual('article_type', defaultArticleType),
    ];
  }, [defaultArticleType, defaultPersona]);

  const {
    widgetRef,
    queryResult: { isLoading, isFetching, data: { facet: facets = [] } = {} },
  } = useSearchResults<BlogArticleModel, InitialState>({
    query: (query) => {
      const withFilter = query.getRequest().setSearchOffset(0);

      withFilter.setSearchFilter(new FilterAnd(filters));
      withFilter.setSources([SEARCH_CONFIG.source]);

      return withFilter;
    },
    state: {
      sortType: defaultSortType,
      page: 1,
      itemsPerPage: 1,
      keyphrase: '*',
    },
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex h-[350px] w-full items-center justify-center">
        <Spinner loading />
      </div>
    );
  }

  const categoryFacet = facets.find((f) => f.name === 'category');

  let categoryList: string[] = [];

  if (categoryFacet && categoryFacet?.value.length > 0) {
    const categoryStr = categoryFacet?.value.flatMap((c) => c.text).join(',');
    categoryList = categoryStr.split(',').map((t) => t.trim());
    categoryList = [...new Set(categoryList)];
    categoryList = categoryList.sort();
  }

  return (
    <div ref={widgetRef} className="flex w-full flex-col items-center gap-5">
      {categoryList?.length > 0 && (
        <CategoryListRenderer
          selectedCategory={categoryFromUrl}
          categoryStr={categoryList}
          TitleText={fields?.TitleText}
          parentLink={fields?.ArticleParent?.value?.href}
          allLink={fields?.AllLink?.value?.href}
          itemsAlignment={itemsAlignment}
        />
      )}
    </div>
  );
};

const CategoryListWidget = widget(CatergoryListResult, WidgetDataType.SEARCH_RESULTS, 'content');

export default CategoryListWidget;
