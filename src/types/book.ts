export interface Book {
  id: string;
  title: string;
  author: string;
  publishYear: number | null;
  pages: number | null;
  coverUrl: string;
  isbn: string | null;
}

export function getBookDescription(book: Book): string {
  return `${book.title} ${book.author}`;
}

export function calculateRowHeight(book: Book): number {
  const textLength = getBookDescription(book).length;
  const estimatedLines = Math.ceil(textLength / 45);
  const height = 100 + estimatedLines * 22;
  return Math.min(300, Math.max(100, height));
}
