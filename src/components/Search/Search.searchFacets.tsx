import { CheckIcon } from '@radix-ui/react-icons';
import type { SearchResponseFacet } from '@sitecore-search/react';
import { useSearchResultsActions } from '@sitecore-search/react';
import {
  AccordionFacets,
  FacetItem,
  RangeFacet,
  SearchResultsAccordionFacets,
  SearchResultsFacetValueRange,
} from '@sitecore-search/ui';

interface PriceFacetProps {
  min: number;
  max: number;
}

const PriceFacet = ({ min, max }: PriceFacetProps) => {
  return (
    <SearchResultsFacetValueRange
      max={max}
      min={min}
      autoAdjustValues={false}
      className="relative mb-8 flex h-5 w-full touch-none select-none items-center"
    >
      <RangeFacet.Track className="bg-gray-400 relative h-[3px] grow rounded-full">
        <RangeFacet.Range className="bg-gray-700 absolute h-full rounded-full" />
      </RangeFacet.Track>
      <RangeFacet.Start className="hover:bg-gray-700 block h-5 w-5 cursor-pointer rounded-[10px] bg-[white] text-center text-[10px] leading-5 shadow-[0_2px_10px_grey] focus:shadow-[0_0_0_3px_grey]">
        {(value) => <span className="absolute left-0 top-[30px] text-sm">${value}</span>}
      </RangeFacet.Start>
      <RangeFacet.End className="hover:bg-gray-700 block h-5 w-5 cursor-pointer rounded-[10px] bg-[white] text-center text-[10px] leading-5 shadow-[0_2px_10px_grey] focus:shadow-[0_0_0_3px_grey]">
        {(value) => <span className="absolute left-0 top-[30px] text-sm">${value}</span>}
      </RangeFacet.End>
    </SearchResultsFacetValueRange>
  );
};

type SearchFacetsProps = {
  facets: SearchResponseFacet[];
};

const SearchFacets = ({ facets }: SearchFacetsProps) => {
  const { onFacetClick } = useSearchResultsActions();
  return (
    <SearchResultsAccordionFacets
      defaultFacetTypesExpandedList={[]}
      onFacetTypesExpandedListChange={() => {
        return;
      }}
      onFacetValueClick={onFacetClick}
      className="w-full"
    >
      {facets.map((f) => (
        <AccordionFacets.Facet
          facetId={f.name}
          key={f.name}
          className="border-gray-200 dark:border-gray-600 mb-4 block border-b pb-4"
        >
          <AccordionFacets.Header className="flex">
            <AccordionFacets.Trigger className="focus:outline-gray-700 text-sm font-semibold md:text-base">
              {f.label}
            </AccordionFacets.Trigger>
          </AccordionFacets.Header>
          <AccordionFacets.Content className="mt-8">
            {f.name !== 'price' ? (
              <AccordionFacets.ValueList className="mt-2 flex list-none flex-col space-y-2">
                {f.value.map((v, index: number) => (
                  <FacetItem
                    {...{
                      index,
                      facetValueId: v.id,
                    }}
                    key={v.id}
                    className="group flex cursor-pointer items-center text-sm"
                  >
                    <AccordionFacets.ItemCheckbox className="form-checkbox border-gray-300 hover:border-heading focus:outline-gray-700 aria-checked:bg-gray-700 aria-checked:hover:bg-heading aria-checked:focus:bg-heading h-5 w-5 flex-none cursor-pointer rounded border transition duration-500 ease-in-out">
                      <AccordionFacets.ItemCheckboxIndicator className="h-5 w-5 text-white ">
                        <CheckIcon />
                      </AccordionFacets.ItemCheckboxIndicator>
                    </AccordionFacets.ItemCheckbox>
                    <AccordionFacets.ItemLabel className="-mt-0.5 ms-4 text-sm">
                      {v.text} {v.count && `(${v.count})`}
                    </AccordionFacets.ItemLabel>
                  </FacetItem>
                ))}
              </AccordionFacets.ValueList>
            ) : (
              <PriceFacet
                min={Math.floor(f.value[0].min)}
                max={Math.floor(f.value[f.value.length - 1].max)}
              />
            )}
          </AccordionFacets.Content>
        </AccordionFacets.Facet>
      ))}
    </SearchResultsAccordionFacets>
  );
};

export default SearchFacets;
