import classNames from 'classnames';
import IconButton from 'components/IconButton/IconButton';
import { IconBgColor } from 'components/IconButton/IconButton.types';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useEffect, useState } from 'react';

interface GalleryContainerPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageNumberClick: (page: number) => void;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

const GalleryContainerPagination = ({
  currentPage,
  totalPages,
  onPageNumberClick,
  onPreviousClick,
  onNextClick,
}: GalleryContainerPaginationProps) => {
  const { isEditMode, isPreviewMode } = useSitecore();
  const [isLoaded, setIsLoaded] = useState(isEditMode || isPreviewMode);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getURLforPage = (page = 1) => {
    if (typeof window == 'undefined') return;
    if (isEditMode || isPreviewMode) return `#${page}`;
    try {
      const parsedURL = new URL(window.location.href);
      if (page == 1) {
        parsedURL.searchParams.delete('galleryPage');
        return parsedURL.pathname + parsedURL.search;
      } else {
        parsedURL.searchParams.set('galleryPage', `${page}`);
        return parsedURL.pathname + parsedURL.search;
      }
    } catch (error) {
      console.error('invalid URL', error);
      return '/';
    }
  };

  const getPaginationNumberList = () => {
    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(
        <a
          href={getURLforPage(page)}
          onClick={(e) => {
            e.preventDefault();
            onPageNumberClick(page);
          }}
          aria-label={`Page ${page}`}
          className={classNames(
            'font-roboto-700 text-2xl text-bright-navy',
            'mx-2 cursor-pointer px-3 pt-1 hover:text-bright-navy focus:outline-bright-navy',
            { 'bg-white': currentPage === page }
          )}
        >
          {page}
        </a>
      );
    }
    return pages;
  };

  return (
    <>
      {isLoaded && (
        <nav className="flex w-full items-center justify-center gap-2">
          {currentPage !== 1 && (
            <div className="mx-2 flex cursor-pointer items-center">
              <a
                href={getURLforPage(currentPage - 1)}
                title="Previous page"
                aria-label="previous page"
                onClick={(e) => e.preventDefault()}
              >
                <IconButton
                  type="ArrowLeftIcon"
                  bgColor={IconBgColor.Primary}
                  iconColor={IconColor.Navy}
                  iconSize={IconSize.Md}
                  onClick={() => onPreviousClick()}
                ></IconButton>
              </a>
            </div>
          )}
          <div className="flex items-center gap-4">{getPaginationNumberList()}</div>
          {currentPage < totalPages && (
            <div className="mx-2 flex cursor-pointer items-center">
              <a
                href={getURLforPage(currentPage + 1)}
                title="Next page"
                aria-label="next page"
                onClick={(e) => e.preventDefault()}
              >
                <IconButton
                  type="ArrowRightIcon"
                  bgColor={IconBgColor.Primary}
                  iconColor={IconColor.Navy}
                  iconSize={IconSize.Md}
                  onClick={() => onNextClick()}
                ></IconButton>
              </a>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default GalleryContainerPagination;
