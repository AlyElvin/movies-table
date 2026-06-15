import { z } from "zod";
import type { Book } from "../types/book";

const openLibraryDocSchema = z.object({
  key: z.string(),
  title: z.string().optional(),
  author_name: z.array(z.string()).optional(),
  first_publish_year: z.number().optional(),
  cover_i: z.number().optional(),
  number_of_pages_median: z.number().optional(),
  isbn: z.array(z.string()).optional(),
});

const openLibraryResponseSchema = z.object({
  docs: z.array(openLibraryDocSchema),
});

const PLACEHOLDER_COVER = "/no-cover.svg";

function buildCoverUrl(coverId: number | undefined): string {
  if (coverId === undefined) {
    return PLACEHOLDER_COVER;
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

function mapDocToBook(doc: z.infer<typeof openLibraryDocSchema>): Book {
  return {
    id: doc.key,
    title: doc.title ?? "Untitled",
    author: doc.author_name?.join(", ") ?? "Unknown author",
    publishYear: doc.first_publish_year ?? null,
    pages: doc.number_of_pages_median ?? null,
    coverUrl: buildCoverUrl(doc.cover_i),
    isbn: doc.isbn?.[0] ?? null,
  };
}

export async function fetchBooks(query: string): Promise<Book[]> {
  const params = new URLSearchParams({
    q: query,
    limit: "500",
    fields:
      "key,title,author_name,first_publish_year,cover_i,number_of_pages_median,isbn",
  });

  const response = await fetch(
    `https://openlibrary.org/search.json?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Open Library API error: ${response.status}`);
  }

  const json: z.infer<typeof openLibraryResponseSchema> = await response.json();
  const parsed = openLibraryResponseSchema.parse(json);

  return parsed.docs.map(mapDocToBook);
}
