interface PaginationProps {
  currentPage: number;
  totalPageItem: number;
  isLastPage: boolean;
  onPageChange: (newPage: number) => void;
}

export default PaginationProps;