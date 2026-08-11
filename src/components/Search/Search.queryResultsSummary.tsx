interface QueryResultsSummaryProps {
  currentPage: number;
  itemsPerPage: number;
  totalItemsReturned: number;
  totalItems: number;
}

const QueryResultsSummary = ({
  currentPage,
  itemsPerPage,
  totalItems,
  totalItemsReturned,
}: QueryResultsSummaryProps) => {
  if (totalItems > itemsPerPage) {
    return (
      <div className="mx-0 my-auto font-bold">
        Displaying {itemsPerPage * (currentPage - 1) + 1} -{' '}
        {itemsPerPage * (currentPage - 1) + totalItemsReturned} of {totalItems} results
      </div>
    );
  }

  return <div className="mx-0 my-auto font-bold">Displaying {totalItems} results</div>;
};

export default QueryResultsSummary;
