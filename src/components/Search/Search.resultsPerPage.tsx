import { useSearchResultsActions } from '@sitecore-search/react';
import { Select, SortSelect } from '@sitecore-search/ui';

interface ResultsPerPageProps {
  defaultItemsPerPage: number;
}

const ResultsPerPage = ({ defaultItemsPerPage }: ResultsPerPageProps) => {
  const { onResultsPerPageChange } = useSearchResultsActions();
  return (
    <div>
      <label className="pr-1">Results Per Page</label>
      <Select.Root
        defaultValue={String(defaultItemsPerPage)}
        onValueChange={(v) =>
          onResultsPerPageChange({
            numItems: Number(v),
          })
        }
      >
        <Select.Trigger className="inline-flex h-10 cursor-pointer items-center gap-1 border-0 bg-transparent px-4 py-1 focus:outline-grey">
          <Select.SelectValue />
          <Select.Icon />
        </Select.Trigger>
        <Select.SelectContent className="z-[100] min-w-[100px] rounded-md bg-grey-dark shadow-[2px_2px_4px_#CFCFCF] ">
          <Select.Viewport className="p-1">
            <Select.SelectItem
              value="10"
              className="whitespace-no-wrap data-[state=checked]:bg-gray-100 focus:outline-gray-700 flex h-6 cursor-pointer select-none  items-center rounded-sm  px-1 leading-none hover:bg-grey-darker hover:text-grey-darkest data-[state=checked]:text-grey-darkest"
            >
              <SortSelect.OptionText>10</SortSelect.OptionText>
            </Select.SelectItem>

            <Select.SelectItem
              value="25"
              className="whitespace-no-wrap focus:outline-gray-700 flex h-6 cursor-pointer select-none items-center  rounded-sm px-1 leading-none hover:bg-grey  hover:text-grey-darkest data-[state=checked]:bg-grey-darkest data-[state=checked]:text-grey"
            >
              <SortSelect.OptionText>25</SortSelect.OptionText>
            </Select.SelectItem>

            <Select.SelectItem
              value="50"
              className="whitespace-no-wrap data-[state=checked]:text-gray-700 flex h-6 cursor-pointer select-none items-center rounded-sm px-1 leading-none hover:bg-grey hover:text-grey-darker focus:outline-grey-darkest data-[state=checked]:bg-grey-light"
            >
              <SortSelect.OptionText>50</SortSelect.OptionText>
            </Select.SelectItem>
          </Select.Viewport>
        </Select.SelectContent>
      </Select.Root>
    </div>
  );
};

export default ResultsPerPage;
