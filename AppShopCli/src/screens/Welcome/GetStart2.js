import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import commonStyles from './styles';
import imagePath from '../../constants/imagePath';

const GetStart2 = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.replace('Login1');
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.iconContainer}>
        <Image source={imagePath.icon} style={commonStyles.icon} />
      </View>

      <Image source={imagePath.shop} style={commonStyles.storeImage} />

      <View style={commonStyles.textContainer}>
        <Text style={commonStyles.text}>Post what you want to sell</Text>
      </View>

      <TouchableOpacity style={commonStyles.button} onPress={handleButtonPress}>
        <Text style={commonStyles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetStart2;
