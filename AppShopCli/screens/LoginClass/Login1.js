import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Login1 = () => {
  const navigation = useNavigation();

  // Xử lý khi nhấn nút đăng nhập bằng Facebook
  const handleLoginFacebook = () => alert('facebook');

  // Xử lý khi nhấn nút đăng nhập bằng Gmail
  const handleLoginGmail = () => alert('google');

  // Chuyển hướng đến màn hình đăng ký
  const handleSignup = () => navigation.navigate('SignUp');

  // Chuyển hướng đến màn hình đăng nhập bằng mật khẩu
  const handleLoginWithPassword = () => navigation.navigate('Login2');

  return (
    <View style={styles.container}>
      {/* Hiển thị logo */}
      <Image source={require('../../images/Logo2.png')} style={styles.logo} />

      {/* Tiêu đề màn hình */}
      <Text style={styles.title}>Let's You In</Text>

      {/* Nút đăng nhập bằng Facebook */}
      <TouchableOpacity style={styles.button} onPress={handleLoginFacebook}>
        <Image
          source={require('../../images/facebook.png')}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      {/* Nút đăng nhập bằng Gmail */}
      <TouchableOpacity style={styles.button} onPress={handleLoginGmail}>
        <Image
          source={require('../../images/google.png')}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Phân chia hoặc */}
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>Or</Text>
        <View style={styles.separator} />
      </View>

      {/* Nút đăng nhập bằng mật khẩu */}
      <TouchableOpacity
        style={styles.passwordButton}
        onPress={handleLoginWithPassword}>
        <Text style={styles.passwordButtonText}>Continue with Password</Text>
      </TouchableOpacity>

      {/* Đường link đến màn hình đăng ký */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Text style={styles.signupLink} onPress={handleSignup}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

// Style của component
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
  title: {
    color: '#000000',
    fontSize: 40,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '5%',
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
  passwordButton: {
    alignSelf: 'center',
    backgroundColor: '#000000',
    justifyContent: 'center',
    borderRadius: 30,
    height: 65,
    width: 354,
    marginTop: '7%',
  },
  passwordButtonText: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
  separatorContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  separator: {
    borderWidth: 0.5,
    width: 150,
    height: 1,
  },
  separatorText: {
    fontSize: 22,
  },
  signupContainer: {
    marginTop: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 18,
    color: '#7B7070',
  },
  signupLink: {
    fontSize: 18,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default Login1;
