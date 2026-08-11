import { useEffect, useState } from 'react';
import SearchInput from './Search.input';
import SearchResults from './Search.results';
import { useRouter } from 'next/router';
import { useDebounceValue } from 'usehooks-ts';
import { ComponentParams, ComponentRendering, Field } from '@sitecore-content-sdk/nextjs';
import SearchCommonSearches from './Search.commonSearches';
import { useAnalytics } from 'lib/challenger/useAnalytics';

type SearchField = {
  PageTitle?: Field<string>;
  CommonSearchesText?: Field<string>;
  SearchBoxPlaceholder?: Field<string>;
  CommonSearchesTitle?: Field<string>;
};

export interface SearchProps {
  rendering: ComponentRendering & { params: ComponentParams } & { fields: SearchField };
}

const Search = (props: SearchProps) => {
  const { CommonSearchesText, CommonSearchesTitle } = props.rendering?.fields;
  const { linkComponent } = useAnalytics(props.rendering);

  const router = useRouter();
  const minLength = 3;
  const query = (router?.query['q'] as string) || '';
  const [currentQuery, setCurrentQuery] = useDebounceValue<string>(query, 1000);
  const [keyDownQuery, setKeyDownQuery] = useState<string>(query);
  const [newQuery, setNewQuery] = useState<string>(query);

  useEffect(() => {
    if (currentQuery) {
      setNewQuery(currentQuery);
    }
  }, [currentQuery]);

  useEffect(() => {
    if (keyDownQuery) {
      setNewQuery(keyDownQuery);
    }
  }, [keyDownQuery]);

  const handleChange = (value: string) => {
    setCurrentQuery(value);
    setNewQuery('');
  };

  const handleKeyDown = (value: string) => {
    setCurrentQuery(value);
    setKeyDownQuery(value);
    setNewQuery('');
  };

  return (
    <div link_component={linkComponent} className="flex w-full flex-col gap-3 py-4">
      <h2 className="text-left font-roboto-700 text-2xl text-bright-navy">
        What are you looking for?
      </h2>
      <SearchInput onChange={handleChange} onKeyDown={handleKeyDown} defaultValue={currentQuery} />
      <SearchCommonSearches
        commonSearchStr={CommonSearchesText?.value}
        heading={CommonSearchesTitle?.value}
        onClick={handleKeyDown}
      />
      {newQuery.length >= minLength && (
        <SearchResults
          key={`${query}-search`}
          rfkId="rfkid_7"
          defaultKeyphrase={newQuery}
          defaultSortType={'featured_desc'}
          defaultPage={1}
          defaultItemsPerPage={20}
        />
      )}
    </div>
  );
};

export default Search;
