/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SearchResponseSortChoice } from '@sitecore-search/react';
import { useSearchResultsActions } from '@sitecore-search/react';
import { SortSelect } from '@sitecore-search/ui';
import { ChevronDownIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { useState } from 'react';

interface SortOrderProps {
  options: Array<SearchResponseSortChoice>;
  selected: string;
}

const SortOrder = ({ options, selected }: SortOrderProps) => {
  const selectedSortIndex = options.findIndex((s) => s.name === selected);
  const { onSortChange } = useSearchResultsActions();
  const [selectedIndex, setSelectedIndex] = useState<number>(selectedSortIndex);

  const handleSortChange = (e: SearchResponseSortChoice) => {
    setSelectedIndex(options.findIndex((s) => s.name === e.name));

    onSortChange(e);
  };

  return (
    <SortSelect.Root defaultValue={options[selectedIndex]?.name} onValueChange={handleSortChange}>
      <SortSelect.Trigger className="inline-flex h-10 w-full cursor-pointer items-center justify-between gap-8 text-nowrap rounded-sm border-[1px] border-solid border-grey bg-white px-4 py-1 focus:outline-grey-darkest lg:w-fit">
        <SortSelect.SelectValue>
          {selectedIndex > -1 ? options[selectedIndex].label : ''}
        </SortSelect.SelectValue>
        <ChevronDownIcon size={IconSize.Sm} color={IconColor.Navy} />
      </SortSelect.Trigger>
      <SortSelect.Content className="absolute top-8 z-[100] min-w-[150px] rounded-md bg-white shadow-[2px_2px_4px_#CFCFCF] focus-within:border-grey-dark">
        <SortSelect.Viewport className="z-[50000] p-1">
          {options.map((option: any) => (
            <SortSelect.Option
              value={option}
              key={option.name}
              className="whitespace-no-wrap data-[state=checked]:text-gray-700  m-1 flex h-6 cursor-pointer select-none items-center rounded-sm p-1 px-1 leading-none hover:bg-grey-dark hover:text-grey-darkest focus:outline-grey data-[state=checked]:bg-white"
            >
              <SortSelect.OptionText>{option.label}</SortSelect.OptionText>
            </SortSelect.Option>
          ))}
        </SortSelect.Viewport>
      </SortSelect.Content>
    </SortSelect.Root>
  );
};

export default SortOrder;
