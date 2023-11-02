import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  // Sử dụng useEffect để chuyển màn hình sau khoảng 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('GetStart2');
    }, 3000);

    // Hủy bỏ timer khi component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>Chào mừng</Text>
        <Text style={styles.welcomeText}>Chào mừng</Text>
      </View>
      <Image source={require('../../images/Logo1.png')} style={styles.logo} />
      <ActivityIndicator size={45} color={'white'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 90,
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  welcomeText: {
    color: '#ffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
