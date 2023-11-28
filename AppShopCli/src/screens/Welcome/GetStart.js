import React, {useEffect} from 'react';
import {View, Image, Text, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonStyles from './styles';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import {getItem} from '../../utils/utils';

const WelcomeScreen = ({navigation}) => {
  const loading = async () => {
    try {
      const accessToken = await getItem('LoginUser');
      if (accessToken?.isChecked) {
        navigation.replace('BottomTab');
      } else {
        const timer = setTimeout(() => {
          navigation.replace('GetStart2');
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error('Error checking login status: ', error);
    }
  };

  useEffect(() => {
    loading();
  }, []);

  return (
    <View style={[commonStyles.container, {backgroundColor: colors.black}]}>
      <View style={commonStyles.welcomeTextContainer}>
        <Text style={commonStyles.welcomeText}>Welcome</Text>
        <Text style={commonStyles.welcomeText}>Welcome</Text>
      </View>
      <Image source={imagePath.logo1} style={commonStyles.logo} />
      <ActivityIndicator size={45} color={'white'} />
    </View>
  );
};

export default WelcomeScreen;
