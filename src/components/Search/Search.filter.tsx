/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchResultsActions, useSearchResultsSelectedFilters } from '@sitecore-search/react';

const buildRangeLabel = (min: number | undefined, max: number | undefined): string => {
  return typeof min === 'undefined'
    ? `< $${max}`
    : typeof max === 'undefined'
      ? ` > $${min}`
      : `$${min} - $${max}`;
};
const buildFacetLabel = (selectedFacet: any) => {
  if ('min' in selectedFacet || 'max' in selectedFacet) {
    return `${buildRangeLabel(selectedFacet.min, selectedFacet.max)}`;
  }
  return `${selectedFacet.valueLabel}`;
};

const SearchFilter = () => {
  const selectedFacetsFromApi = useSearchResultsSelectedFilters();
  const { onRemoveFilter, onClearFilters } = useSearchResultsActions();

  return selectedFacetsFromApi.length > 0 ? (
    <div className="mb-4">
      <div className="mb-2 flex flex-row items-center justify-between">
        <h3 className="text-sm font-semibold md:text-base">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-gray-800 dark:text-gray-100 hover:text-gray-900 hover:opacity-1 focus:outline-gray-900 text-sm font-medium text-opacity-75 underline"
        >
          Clear Filters
        </button>
      </div>
      <div className="flex flex-wrap">
        {selectedFacetsFromApi.map((selectedFacet) => (
          <button
            key={`${selectedFacet.facetId}${selectedFacet.facetLabel}${selectedFacet.valueLabel}`}
            onClick={() => onRemoveFilter(selectedFacet)}
            className="bg-gray-400 whitespace-no-wrap focus:outline-indigo-500 relative m-1 max-w-full cursor-pointer overflow-hidden text-ellipsis rounded-md py-1.5 pl-2 pr-5 text-xs font-medium text-white before:absolute before:right-2 before:top-2/4 before:h-0.5 before:w-2.5 before:-rotate-45 before:bg-white before:content-[''] after:absolute after:right-2 after:top-2/4 after:h-0.5 after:w-2.5 after:rotate-45 after:bg-white after:content-['']"
          >
            {buildFacetLabel(selectedFacet)}
          </button>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SearchFilter;
