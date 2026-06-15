import { useQuery } from '@tanstack/react-query';
import { fetchBooks } from '../api/openLibrary';
import type { Book } from '../types/book';

export function useBooks(query: string): {
  books: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['books', query],
    queryFn: () => fetchBooks(query),
    staleTime: 5 * 60 * 1000,
  });

  return {
    books: data,
    isLoading,
    isError,
    error: error ?? null,
  };
}
