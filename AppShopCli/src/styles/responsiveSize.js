import {Dimensions, Platform, StatusBar} from 'react-native';

const {width, height} = Dimensions.get('window');

const scale = (size, baseWidth = 375) => (width / baseWidth) * size;
const verticalScale = (size, baseHeight = 812) => (height / baseHeight) * size;
const moderateScale = (size, factor = 0.5, baseWidth = 375) =>
  size + (scale(size, baseWidth) - size) * factor;

const textScale = (percent, baseHeight = 812) => {
  const deviceHeight =
    height - (Platform.OS === 'android' ? StatusBar.currentHeight : 0);

  const heightPercent = (percent * deviceHeight) / baseHeight;
  return Math.round(heightPercent);
};

export {scale, verticalScale, textScale, moderateScale, width, height};
