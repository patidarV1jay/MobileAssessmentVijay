import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticleScale } from '../../utils';
import { colors } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(20),
    marginTop: verticleScale(4),
    marginBottom: verticleScale(14),
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(4),
  },
  headerTitle: {
    fontSize: moderateScale(26),
    color: colors.primary,
    fontWeight: '700',
    marginLeft: horizontalScale(10),
  },
  searchContainer: {
    marginHorizontal: horizontalScale(24),
    marginBottom: verticleScale(18),
    paddingHorizontal: verticleScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input,
    paddingVertical: verticleScale(20),
    borderRadius: moderateScale(2),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginLeft: horizontalScale(10),
    paddingVertical: 0,
    color: colors.dark,
    fontSize: moderateScale(15),
  },
  listContent: {
    paddingHorizontal: horizontalScale(24),
    paddingBottom: horizontalScale(30),
    flexGrow: 1,
  },
  bookContainer: {
    marginBottom: verticleScale(20),
  },
  bookImage: {
    backgroundColor: '#EEEEEE',
    marginBottom: verticleScale(6),
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    marginBottom: verticleScale(6),
  },
  noImageText: {
    color: colors.dark,
    fontSize: moderateScale(9),
  },
  bookTitle: {
    color: colors.dark,
    fontSize: moderateScale(9),
    lineHeight: moderateScale(12),
    marginBottom: moderateScale(2),
  },
  authorName: {
    color: colors.dark,
    fontSize: moderateScale(8),
    lineHeight: moderateScale(11),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLoader: {
    paddingVertical: moderateScale(20),
    alignItems: 'center',
  },
  footerSpace: {
    height: moderateScale(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: moderateScale(80),
  },
  emptyTitle: {
    color: colors.dark,
    fontSize: moderateScale(16),
    marginBottom: moderateScale(5),
  },
  emptyDescription: {
    color: colors.lightGray,
    fontSize: moderateScale(12),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(30),
  },
errorText: {
    textAlign: 'center',
    color: colors.dark,
    fontSize: moderateScale(13),
    marginBottom: moderateScale(15),
  },
  retryButton: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    backgroundColor: colors.primary,
  },
  retryText: {
    color: colors.light,
    fontSize: moderateScale(12),
  },
});

export default styles;
