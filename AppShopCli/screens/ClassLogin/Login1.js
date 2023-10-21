import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const Login1 = ({navigation}) => {
  const loginFacebook = () => {
    alert('facebook');
  };

  const loginGmail = () => {
    alert('gmail');
  };

  const Signup = () => {
    navigation.navigate('SignUp');
  };

  const LoginWithPassword = () => {
    navigation.navigate('Login2');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View>
        <Image source={require('../../image/Logo2.png')} style={styles.logo} />
      </View>
      <Text
        style={{
          color: '#000000',
          fontSize: 40,
          fontWeight: '500',
          textAlign: 'center',
          marginBottom: '5%',
        }}>
        Let's You In
      </Text>
      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={loginFacebook}>
        <Image
          source={require('../../image/facebook.png')}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={loginGmail}>
        <Image source={require('../../image/google.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Continue with Google </Text>
      </TouchableOpacity>
      {/* Line */}
      <View>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            marginHorizontal: '5%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              borderWidth: 0.5,
              width: 150,
              height: 1,
            }}
          />
          <Text
            style={{
              fontSize: 22,
            }}>
            Or
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              width: 150,
              height: 1,
            }}></View>
        </View>
        <TouchableOpacity
          style={styles.buttonloginpassw}
          onPress={LoginWithPassword}>
          <Text style={styles.buttonText1}>Continue with Password </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: '20%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#7B7070'}}>
            Don't have an account?{' '}
          </Text>
          <Text
            style={{
              fontSize: 18,
              textDecorationLine: 'underline',
              fontWeight: 'bold',
            }}
            onPress={Signup}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 12,
    height: 64,
    width: 365,
    marginBottom: '8%',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  buttonloginpassw: {
    alignSelf: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
    borderRadius: 30,
    height: 65,
    width: 354,
    marginTop: '7%',
  },
  buttonText1: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
