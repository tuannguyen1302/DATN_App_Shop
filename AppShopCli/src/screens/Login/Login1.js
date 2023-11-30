import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import imagePath from '../../constants/imagePath';
import {Login1Style} from './styles';

const Login1 = () => {
  const navigation = useNavigation();

  const handleLoginFacebook = () => alert('facebook');
  const handleLoginGmail = () => alert('google');
  const handleSignup = () => navigation.navigate('SignUp');
  const handleLoginWithPassword = () => navigation.navigate('Login2');

  return (
    <View style={Login1Style.container}>
      <Image source={imagePath.logo} style={Login1Style.logo} />
      <Text style={Login1Style.title}>Let's You In</Text>

      <TouchableOpacity
        style={Login1Style.button}
        onPress={handleLoginFacebook}>
        <Image source={imagePath.facebook} style={Login1Style.icon} />
        <Text style={Login1Style.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Login1Style.button} onPress={handleLoginGmail}>
        <Image source={imagePath.google} style={Login1Style.icon} />
        <Text style={Login1Style.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <View style={Login1Style.separatorContainer}>
        <View style={Login1Style.separator} />
        <Text style={Login1Style.separatorText}>Or</Text>
        <View style={Login1Style.separator} />
      </View>

      <TouchableOpacity
        style={Login1Style.passwordButton}
        onPress={handleLoginWithPassword}>
        <Text style={Login1Style.passwordButtonText}>
          Continue with Password
        </Text>
      </TouchableOpacity>

      <View style={Login1Style.signupContainer}>
        <Text style={Login1Style.signupText}>Don't have an account?</Text>
        <Text style={Login1Style.signupLink} onPress={handleSignup}>
          Sign Up
        </Text>
      </View>
    </View>
  );
};

export default Login1;
