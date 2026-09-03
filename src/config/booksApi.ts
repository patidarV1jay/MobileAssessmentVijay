import apiClient from './client';
import {BooksResponse} from '../types';

interface GetBooksParams {
  genre: string;
  search?: string;
}

export const getBooks = async ({
  genre,
  search = '',
}: GetBooksParams): Promise<BooksResponse> => {
  const response = await apiClient.get<BooksResponse>('/books', {
    params: {
      topic: genre,
      mime_type: 'image/jpeg',
      ...(search.trim()
        ? {
            search: search.trim(),
          }
        : {}),
    },
  });

  return response.data;
};

export const getNextBooks = async (
  nextUrl: string,
): Promise<BooksResponse> => {
  const relativeUrl = nextUrl.replace(
    /^https?:\/\/[^/]+/,
    '',
  );
  const response =
    await apiClient.get<BooksResponse>(relativeUrl);

  return response.data;
};