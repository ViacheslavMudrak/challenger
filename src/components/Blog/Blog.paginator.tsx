import { useSearchResultsActions } from '@sitecore-search/react';
import { Pagination } from '@sitecore-search/ui';
import classNames from 'classnames';
import IconButton from 'components/IconButton/IconButton';
import { IconBgColor } from 'components/IconButton/IconButton.types';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { useSitecore } from 'lib/challenger/useSitecore';
import { useRouter } from 'next/router';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

const BlogPagination = ({ currentPage, totalPages }: BlogPaginationProps) => {
  const { onPageNumberChange } = useSearchResultsActions();
  const router = useRouter();
  const { isEditMode, isPreviewMode } = useSitecore();

  const getURLforPage = (page = 1) => {
    if (typeof window == 'undefined') return;
    if (isEditMode || isPreviewMode) return `#${page}`;
    try {
      const parsedURL = new URL(window.location.href);
      if (page == 1) {
        parsedURL.searchParams.delete('blogPage');
        return parsedURL.pathname + parsedURL.search;
      } else {
        parsedURL.searchParams.set('blogPage', `${page}`);
        return parsedURL.pathname + parsedURL.search;
      }
    } catch (error) {
      console.error('invalid URL', error);
      return '/';
    }
  };

  const handlePageClickEvents = (page = 1) => {
    if (isEditMode || isPreviewMode) return;

    router.push(
      {
        pathname: router.asPath?.split('?')[0],
        query: { ...router.query, blogPage: page == 1 ? [] : `${page}`, path: [] },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <Pagination.Root
      currentPage={currentPage}
      defaultCurrentPage={1}
      totalPages={totalPages}
      onPageChange={(v) =>
        onPageNumberChange({
          page: v,
        })
      }
      className="flex w-full items-center justify-center gap-2"
    >
      <Pagination.PrevPage
        href={getURLforPage(currentPage - 1)}
        onClick={(e) => {
          e.preventDefault();
          handlePageClickEvents(currentPage - 1);
        }}
        className="mx-2 flex cursor-pointer items-center data-[current=true]:hidden"
      >
        <IconButton
          type="ArrowLeftIcon"
          bgColor={IconBgColor.Primary}
          iconColor={IconColor.Navy}
          iconSize={IconSize.Md}
        ></IconButton>
      </Pagination.PrevPage>
      <Pagination.Pages className="flex items-center gap-4">
        {(pagination) =>
          Pagination.paginationLayout(pagination, {
            boundaryCount: 1,
            siblingCount: 1,
          }).map(({ page, type }) =>
            type === 'page' ? (
              <Pagination.Page
                key={page}
                aria-label={`Page ${page}`}
                page={page as number}
                href={getURLforPage(page)}
                onClick={(e) => {
                  handlePageClickEvents(page);
                  e.preventDefault();
                }}
                className={classNames(
                  'font-roboto-700 text-2xl text-bright-navy',
                  'mx-2 cursor-pointer px-3 pt-1 hover:text-bright-navy focus:outline-bright-navy',
                  { 'bg-white': currentPage === page }
                )}
              >
                {page}
              </Pagination.Page>
            ) : (
              <span className="font-roboto-700 text-2xl text-bright-navy" key={type}>
                ...
              </span>
            )
          )
        }
      </Pagination.Pages>
      <Pagination.NextPage
        href={getURLforPage(currentPage + 1)}
        onClick={(e) => {
          handlePageClickEvents(currentPage + 1);
          e.preventDefault();
        }}
        className="mx-2 flex cursor-pointer items-center data-[current=true]:hidden"
      >
        <IconButton
          type="ArrowRightIcon"
          bgColor={IconBgColor.Primary}
          iconColor={IconColor.Navy}
          iconSize={IconSize.Md}
        ></IconButton>
      </Pagination.NextPage>
    </Pagination.Root>
  );
};

export default BlogPagination;
