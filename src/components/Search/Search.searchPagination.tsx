import { useSearchResultsActions } from '@sitecore-search/react';
import { Pagination } from '@sitecore-search/ui';
import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';
import ArrowRightIcon from 'components/Icons/ArrowRightIcon';
import { IconColor, IconSize } from 'components/Icons/icon.types';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
}

const SearchPagination = ({ currentPage, totalPages }: SearchPaginationProps) => {
  const { onPageNumberChange } = useSearchResultsActions();
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
      className="flex"
    >
      <Pagination.PrevPage
        onClick={(e) => e.preventDefault()}
        className="mx-2 my-0 cursor-pointer data-[current=true]:hidden"
      >
        <ArrowLeftIcon size={IconSize.Lg} color={IconColor.Navy} />
      </Pagination.PrevPage>
      <Pagination.Pages>
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
                onClick={(e) => e.preventDefault()}
                className="mx-2 my-0 cursor-pointer font-roboto-700 text-2xl text-bright-navy hover:text-bright-navy focus:outline-bright-navy data-[current=true]:pointer-events-none data-[current=true]:text-bright-navy data-[current=true]:no-underline"
              >
                {page}
              </Pagination.Page>
            ) : (
              <span key={type}>...</span>
            )
          )
        }
      </Pagination.Pages>
      <Pagination.NextPage
        onClick={(e) => e.preventDefault()}
        className="mx-2 my-0 cursor-pointer data-[current=true]:hidden"
      >
        <ArrowRightIcon size={IconSize.Lg} color={IconColor.Navy} />
      </Pagination.NextPage>
    </Pagination.Root>
  );
};

export default SearchPagination;
