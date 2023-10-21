import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('GetStart2');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <View>
        <Text style={styles.text}> Welcome Welcome </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 90,
          }}>
          <Text style={styles.text}> Welcome </Text>
        </View>
      </View>
      <Image source={require('../../image/Logo1.png')} style={styles.logo} />
      <ActivityIndicator size={45} color={'white'} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  text: {
    color: '#ffff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
