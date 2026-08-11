const getPublicUrl = () => process.env.PUBLIC_URL || '';
import { SearchIcon } from 'components/Icons';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  onChange?: (value: string) => void;
  onKeyDown?: (value: string) => void;
  defaultValue?: string;
}

const SearchInput = (props: SearchInputProps) => {
  const [searchStr, setSearchStr] = useState<string>(props.defaultValue || '');
  const searchInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setSearchStr(props.defaultValue || '');
  }, [props.defaultValue]);

  useEffect(() => {
    searchInput?.current?.focus();
  }, []);

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value || '';
    setSearchStr(value);

    if (props.onChange) {
      props.onChange(value);
      router.push(getPublicUrl() + '/search?keys=' + value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.onKeyDown) {
      if (e.key === 'Enter') {
        const value = e.currentTarget.value || '';
        props.onKeyDown(value);
        router.push(getPublicUrl() + '/search?keys=' + value);
      }
    }
  };

  return (
    <div className="mb-5 flex w-full items-center gap-3 border-b-4 border-b-challenger-green text-bright-navy">
      <SearchIcon size={IconSize.Lg} color={IconColor.Navy} />
      <input
        ref={searchInput}
        type="text"
        placeholder="Search"
        search_term={searchStr}
        value={searchStr}
        defaultValue={props.defaultValue}
        maxLength={100}
        className="w-full p-2 font-roboto-700 text-3xl outline-none"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
};

export default SearchInput;
