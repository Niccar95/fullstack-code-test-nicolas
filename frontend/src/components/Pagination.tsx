interface IPaginationProps {
  currentPage: number;
  nextPage: () => void;
  previousPage: () => void;
  more: boolean;
}

const Pagination = ({
  currentPage,
  nextPage,
  previousPage,
  more,
}: IPaginationProps) => {
  return (
    <div className="flex gap-4 mt-8 items-center">
      <button
        onClick={previousPage}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={nextPage}
        disabled={!more}
        className="px-4 py-2 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
