import { getCommonSearches } from './Search.helpers';
const getPublicUrl = () => process.env.PUBLIC_URL || '';
import { useRouter } from 'next/router';

interface SearchCommonSearchesProps {
  heading?: string;
  commonSearchStr?: string;
  onClick?: (text: string) => void;
}

const SearchCommonSearches = ({
  commonSearchStr,
  heading = 'Common searches',
  onClick,
}: SearchCommonSearchesProps) => {
  const commonSearches = getCommonSearches(commonSearchStr || '');
  const router = useRouter();

  const handleClick = (text: string) => {
    if (onClick) {
      onClick(text);
      router.push(getPublicUrl() + '/search?keys=' + text);
    }
  };

  const renderItem = (text: string) => {
    return (
      <div
        className="w-fit cursor-pointer rounded-sm border-2 border-bright-navy px-9 py-2"
        onClick={() => handleClick(text)}
      >
        <span className="font-roboto-400 text-base text-bright-navy">{text}</span>
      </div>
    );
  };

  if (commonSearches.length > 0) {
    return (
      <div className="flex w-full flex-col gap-4 pb-3 pt-5">
        <span className="font-roboto-700 text-base text-bright-navy">{heading}</span>
        <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap">
          {commonSearches.map((t) => renderItem(t))}
        </div>
      </div>
    );
  }

  return <></>;
};

export default SearchCommonSearches;
