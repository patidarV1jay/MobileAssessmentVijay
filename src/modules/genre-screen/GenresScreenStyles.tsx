import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { horizontalScale, moderateScale, verticleScale } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(15),
    backgroundColor: colors.lightPurple,
  },

  title: {
    fontSize: moderateScale(46),
    color: colors.primary,
    fontWeight: '700',
    marginTop: verticleScale(20),
  },
  description: {
    color: colors.dark,
    fontSize: moderateScale(18),
  },
  listContainer: {
    backgroundColor: colors.light,
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticleScale(120),
    paddingHorizontal: horizontalScale(10),
    marginVertical: verticleScale(15),
    shadowOffset: {
      width: horizontalScale(0),
      height: verticleScale(4),
    },
    shadowOpacity: 0.5,
    shadowRadius: moderateScale(5),
    elevation: moderateScale(3),
  },
  genreText: {
    fontSize: moderateScale(18),
    color: colors.dark,
    fontWeight: '700',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(10),
  },
  list: {
    marginTop: verticleScale(30),
  },
});

export default styles;
