import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {
  height,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  logo: {
    width: width / 1,
    height: height / 2,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  welcomeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(20),
  },
  welcomeText: {
    color: colors.white,
    fontSize: textScale(30),
    fontWeight: 'bold',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    marginRight: moderateScaleVertical(20),
  },
  icon: {
    width: width / 5,
    height: height / 12,
    resizeMode: 'contain',
  },
  storeImage: {
    width: width / 1,
    height: width / 1.2,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(50),
  },
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width / 1.5,
    height: height / 8,
    marginBottom: moderateScaleVertical(50),
  },
  text: {
    fontSize: textScale(39),
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: colors.black,
    padding: 10,
    borderRadius: 20,
    height: height / 14,
    width: width / 1.23,
  },
  buttonText: {
    fontSize: textScale(19),
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginTop: moderateScaleVertical(5),
  },
});

export default commonStyles;
