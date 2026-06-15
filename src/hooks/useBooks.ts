import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchBooks } from '../api/openLibrary';
import type { Book } from '../types/book';

export function useBooks(query: string): {
  books: Book[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['books', query],
    queryFn: () => fetchBooks(query),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    books: data,
    isLoading,
    isFetching,
    isError,
    error: error ?? null,
  };
}
