import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Search } from 'lucide-react-native';
import { Book } from '../../types';
import { RootStackParamList } from '../../types/';
import { colors } from '../../constants';
import { moderateScale, typography } from '../../utils';
import useBookScreen from './useBookScreen';
import styles from './BooksScreenStyles';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<
  RootStackParamList & Record<string, object | undefined>,
  'Books'
>;

const BooksScreen = () => {
  const {
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
  } = useBookScreen();
  const navigation = useNavigation<Props['navigation']>();
  const renderBook: ListRenderItem<Book> = ({ item }) => {
    const imageUrl = item.formats['image/jpeg'];

    const author =
      item.authors.length > 0 ? item.authors[0].name : 'Unknown Author';

    return (
      <Pressable
        style={[
          styles.bookContainer,
          {
            width: bookWidth,
          },
        ]}
        onPress={() => openBook(item)}
      >
        {imageUrl ? (
          <Image
            source={{
              uri: imageUrl,
            }}
            style={[
              styles.bookImage,
              {
                width: bookWidth,
                height: bookWidth * 1.40,
              },
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              {
                width: bookWidth,
                height: bookWidth * 1.40,
              },
            ]}
          >
            <Text style={[typography.regular, styles.noImageText]}>
              No Cover
            </Text>
          </View>
        )}

        <Text numberOfLines={2} style={[typography.regular, styles.bookTitle]}>
          {item.title.toUpperCase()}
        </Text>

        <Text numberOfLines={1} style={[typography.regular, styles.authorName]}>
          {author}
        </Text>
      </Pressable>
    );
  };
  const renderFooter = () => {
    if (!loadingMore) {
      return <View style={styles.footerSpace} />;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };
  const renderEmpty = () => {
    if (loading) {
      return null;
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={[typography.semiBold, styles.emptyTitle]}>
          No books found
        </Text>
        <Text style={[typography.regular, styles.emptyDescription]}>
          Try another search.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={10}
        >
          <ArrowLeft
            size={moderateScale(25)}
            color={colors.primary}
            strokeWidth={moderateScale(3)}
          />
        </Pressable>
        <Text style={[typography.semiBold, styles.headerTitle]}>{genre}</Text>
      </View>
      <View style={styles.searchContainer}>
        <Search
          size={moderateScale(18)}
          color={colors.dark}
          strokeWidth={moderateScale(2)}
        />
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search"
          placeholderTextColor={colors.dark}
          style={[typography.regular, styles.searchInput]}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
        />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[typography.regular, styles.errorText]}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={fetchBooks}>
            <Text style={[typography.semiBold, styles.retryText]}>RETRY</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          key={`books-${numColumns}`}
          data={books}
          keyExtractor={item => item.id.toString()}
          renderItem={renderBook}
          numColumns={numColumns}
          contentContainerStyle={[
            styles.listContent,
            {
              paddingHorizontal: horizontalPadding,
               paddingBottom: 30,
            },
          ]}
          columnWrapperStyle={{
            gap: columnGap,
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreBooks}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
};

export default BooksScreen;
