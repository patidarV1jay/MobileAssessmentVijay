export interface Author {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export interface BookFormats {
  'image/jpeg'?: string;

  [key: string]: string | undefined;
}

export interface Book {
  id: number;
  title: string;
  subjects: string[];
  authors: Author[];
  translators: Author[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: BookFormats;
  download_count: number;
}

export interface BooksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
}