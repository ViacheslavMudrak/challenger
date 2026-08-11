import classNames from 'classnames';
import { DESKTOP_MEDIA_QUERY } from 'components/constants';
import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
import { getFullLink } from './Blog.helpers';

interface BlogCategoryListProps {
  FilterByCategoryText?: Field<string>;
  categoryStr?: string[];
  selectedCategory?: string;
  parentLink?: string;
  allLink?: string;
}

const BlogCategoryList = ({
  categoryStr,
  FilterByCategoryText = { value: 'Filter by category' },
  selectedCategory = 'All',
  parentLink = '/',
  allLink = '/',
}: BlogCategoryListProps) => {
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const [showLessFilters, setShowLessFilters] = useState<boolean>(!isDesktop);

  const getURL = (text: string) => {
    if (text === 'All') {
      return allLink;
    }
    return getFullLink(parentLink, text);
  };

  const renderItem = (text: string) => {
    if (text?.toLowerCase() === selectedCategory?.toLowerCase()) {
      return (
        <div
          className={
            'w-fit cursor-pointer rounded-sm border-2 border-teal bg-bright-teal px-9 py-2'
          }
        >
          <span className="font-roboto-400 text-base text-bright-navy">{text}</span>
        </div>
      );
    }
    return (
      <a
        href={getURL(text)}
        className={
          'w-fit cursor-pointer rounded-sm border-2 border-bright-navy  bg-white px-9 py-2'
        }
      >
        <span className="font-roboto-400 text-base text-bright-navy">{text}</span>
      </a>
    );
  };

  const handleFilterToggle = () => {
    setShowLessFilters(!showLessFilters);
  };

  if (categoryStr && categoryStr.length > 0) {
    if (isDesktop) {
      return (
        <div className="flex w-full flex-col gap-4 pb-3 pt-5">
          <Text
            tag="span"
            field={FilterByCategoryText}
            className={`font-roboto-700 text-base text-bright-navy ${
              'text-left'
              //selectedCategory === 'All' ? 'text-center' : 'text-left'
            }`}
          />
          <div className="flex flex-col gap-5 lg:flex-row lg:flex-wrap">
            {renderItem('All')}
            {categoryStr.map((t) => renderItem(t))}
          </div>
        </div>
      );
    }

    return (
      <div className="flex w-full flex-col gap-4 pb-3 pt-5">
        <Text
          tag="span"
          field={FilterByCategoryText}
          className={`text-center font-roboto-700 text-base text-bright-navy `}
        />
        <div className="flex flex-row flex-wrap justify-center gap-2">
          {renderItem('All')}
          {showLessFilters && categoryStr.slice(0, 4).map((t) => renderItem(t))}
          {!showLessFilters && categoryStr.map((t) => renderItem(t))}
        </div>
        <div
          className={classNames('flex w-full items-center justify-center gap-2 [&_button]:w-fit', {
            hidden: categoryStr?.length <= 4,
          })}
          onClick={handleFilterToggle}
        >
          {showLessFilters && (
            <>
              <span className="text-nowrap font-roboto-400 text-base text-bright-navy">
                See all filters
              </span>

              <IconButton
                type="ChevronDownIcon"
                iconSize={IconSize.Md}
                iconColor={IconColor.Navy}
              />
            </>
          )}
          {!showLessFilters && (
            <>
              <span className="text-nowrap font-roboto-400 text-base text-bright-navy">
                See less filters
              </span>
              <IconButton type="ChevronUpIcon" iconSize={IconSize.Md} iconColor={IconColor.Navy} />
            </>
          )}
        </div>
      </div>
    );
  }

  return <></>;
};

export default BlogCategoryList;
