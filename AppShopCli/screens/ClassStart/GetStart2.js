import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GetStart2 = () => {
  const navigation = useNavigation();

  // Hàm xử lý khi nút được nhấn
  const handleButtonPress = () => {
    navigation.replace('Login1');
  };

  return (
    <View style={styles.container}>
      {/* Container chứa biểu tượng */}
      <View style={styles.iconContainer}>
        <Image source={require('../../image/Icon1.jpg')} style={styles.icon} />
      </View>

      {/* Hiển thị hình ảnh cửa hàng */}
      <Image
        source={require('../../image/Shop.png')}
        style={styles.storeImage}
      />

      {/* Container chứa văn bản */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>Post what you want to sell</Text>
      </View>

      {/* Nút Next */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

// Style của component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconContainer: {
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginRight: 20,
    marginBottom: 30,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  storeImage: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 50,
  },
  textContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 270,
    height: 105,
    marginBottom: 50,
  },
  text: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 20,
    height: 60,
    width: 335,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default GetStart2;
