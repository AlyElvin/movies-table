export interface Book {
  id: string;
  title: string;
  author: string;
  publishYear: number | null;
  pages: number | null;
  coverUrl: string;
  isbn: string | null;
}

const ROW_PADDING = 32;
const COVER_HEIGHT = 120;
const LINE_HEIGHT = 24;
const CHARS_PER_LINE = 34;

export function getBookDescription(book: Book): string {
  return `${book.title} ${book.author}`;
}

function estimateTextLines(text: string): number {
  if (text.length === 0) {
    return 1;
  }
  return Math.ceil(text.length / CHARS_PER_LINE);
}

export function calculateRowHeight(book: Book): number {
  const titleLines = estimateTextLines(book.title);
  const authorLines = estimateTextLines(book.author);
  const textHeight = (titleLines + authorLines) * LINE_HEIGHT + 8;
  const coverBlockHeight = COVER_HEIGHT + ROW_PADDING;
  const textBlockHeight = textHeight + ROW_PADDING;
  const height = Math.max(coverBlockHeight, textBlockHeight);

  return Math.min(300, Math.max(100, height));
}
