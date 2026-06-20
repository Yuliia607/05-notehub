

interface PaginationProps {
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination = ({ pageCount }: PaginationProps) => {
  return <div>Pages: {pageCount}</div>;
};

export default Pagination;