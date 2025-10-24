import { useState } from "react";

export const usePagination = (initialPageSize: number = 10) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(initialPageSize);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  return {
    page,
    pageSize,
    hasMore,
    searchQuery,
    setHasMore,
    handleNextPage,
    handlePreviousPage,
    handleSearch,
  };
};
