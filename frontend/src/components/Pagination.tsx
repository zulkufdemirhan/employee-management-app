import PaginationProps from "../types/PaginationProps";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  isLastPage,
  totalPageItem,
  onPageChange,
}) => {

  return (
    <div className="d-flex justify-content-between">
      <span className="text-decoration-underline">Total Employees {totalPageItem}</span>
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-sm btn-light"
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className="mx-2"> Page {currentPage} </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-sm btn-secondary"
          disabled={isLastPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;