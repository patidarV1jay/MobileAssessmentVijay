import { Alert, Linking, useWindowDimensions } from 'react-native';
import { Book } from '../../types';
import { useState, useRef, useEffect, useCallback } from 'react';
import { getBooks, getNextBooks } from '../../config';
import { useRoute } from '@react-navigation/native';
import { horizontalScale } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useBookScreen = () => {
  const route = useRoute();
  const [books, setBooks] = useState<Book[]>([]);
  const { genre } = route.params as { genre: string };
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadingMoreRef = useRef(false);
  const insets = useSafeAreaInsets();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const numColumns = isLandscape ? 6 : 3;
  const horizontalPadding = 16;
  const columnGap = 10;
  const usableWidth =
    width - insets.left - insets.right - horizontalPadding * 2
  const bookWidth = (usableWidth - columnGap * (numColumns - 1)) / numColumns;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getBooks({
        genre,
        search: debouncedSearch,
      });
      setBooks(response.results);
      setNextPage(response.next);
    } catch (err) {
      console.error(err);
      setError('Unable to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [genre, debouncedSearch]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const loadMoreBooks = async () => {
    if (!nextPage || loadingMoreRef.current || loading) {
      return;
    }
    try {
      loadingMoreRef.current = true;
      setLoadingMore(true);
      console.log('NEXT PAGE URL:', nextPage);
      const response = await getNextBooks(nextPage);
      setBooks(previousBooks => {
        const existingIds = new Set(previousBooks.map(book => book.id));
        const newBooks = response.results.filter(
          book => !existingIds.has(book.id),
        );
        return [...previousBooks, ...newBooks];
      });
      setNextPage(response.next);
    } catch (err) {
      console.log('Load more books error:', err);
    } finally {
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }
  };

  const isZipFile = (url: string) => {
    return /\.zip(?:$|[?#])/i.test(url);
  };

  const findFormat = (
    formats: Book['formats'],
    mimeType: string,
  ): string | undefined => {
    const matchingUrls = Object.entries(formats)
      .filter(([key, url]) => {
        return (
          key.toLowerCase().startsWith(mimeType.toLowerCase()) &&
          typeof url === 'string'
        );
      })
      .map(([, url]) => url as string);

    return matchingUrls.find(url => !isZipFile(url));
  };

  const openBook = async (book: Book) => {
    try {
      const formats = book.formats;
      const htmlUrl = findFormat(formats, 'text/html');
      const pdfUrl = findFormat(formats, 'application/pdf');
      const txtUrl = findFormat(formats, 'text/plain');
      const bookUrl = htmlUrl || pdfUrl || txtUrl;
      if (!bookUrl) {
        Alert.alert(
          'Book unavailable',
          'This book is not available in HTML, PDF, or TXT format.',
        );
        return;
      }
      await Linking.openURL(bookUrl);
    } catch (error) {
      console.log('Open book error:', error);
      Alert.alert(
        'Unable to open book',
        'Something went wrong while opening this book.',
      );
    }
  };

  return {
    openBook,
    fetchBooks,
    loadMoreBooks,
    loadingMore,
    loading,
    searchText,
    setSearchText,
    error,
    books,
    genre,
    bookWidth,
    numColumns,
    horizontalPadding,
    columnGap,
  };
};

export default useBookScreen;
