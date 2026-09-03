import React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, typography } from '../../utils';
import styles from './GenresScreenStyles';
import { genres, colors } from '../../constants';
import { ArrowRight } from 'lucide-react-native';
import useGenreScreen from './useGenreScreen';

const GenresScreen = () => {
  const { handleGenrePress } = useGenreScreen();
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/back.png')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <Text style={[typography.semiBold, styles.title]}>
        Gutenberg {'\n'}Project
      </Text>
      <Text style={[typography.regular, styles.description]}>
        A social cataloging website that allows you to freely search its
        database of books, annotations, and reviews.{' '}
      </Text>

      <FlatList
        data={genres}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => {
          let Icon = item.icon;
          return (
            <Pressable style={styles.listContainer} onPress={() => handleGenrePress(item.name)}>
              <View style={styles.rowCenter}>
                <Icon
                  size={moderateScale(26)}
                  color={colors.primary}
                  strokeWidth={moderateScale(3)}
                />
                <Text style={[typography.regular, styles.genreText]}>
                  {item.name.toUpperCase()}
                </Text>
              </View>
              <ArrowRight
                size={moderateScale(30)}
                color={colors.primary}
                strokeWidth={moderateScale(3)}
              />
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default GenresScreen;
