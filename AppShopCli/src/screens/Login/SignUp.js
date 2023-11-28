import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {SIGNUP_API} from '../../config/urls';
import imagePath from '../../constants/imagePath';
import {apiPost} from '../../utils/utils';
import {SignUpStyle} from './styles';

const isValidEmail = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const isValidPassword = password =>
  /^(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password);

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const checkLogin = async () => {
    if (!isButtonDisabled) {
      setError('');
      setButtonDisabled(true);
      if (!email) setError('Email không được để trống');
      else if (!isValidEmail(email)) setError('Email không đúng định dạng');
      else if (!password || !confirmPassword)
        setError('Mật khẩu không được để trống');
      else if (password.length < 6 || confirmPassword.length < 6)
        setError('Mật khẩu trên 6 kí tự');
      else if (!isValidPassword(password) || !isValidPassword(confirmPassword))
        setError('Mật khẩu có in hoa, kí tự đặc biệt');
      else if (password !== confirmPassword)
        setError('Mật khẩu không trùng khớp');
      else {
        await apiPost(SIGNUP_API, {
          email: email,
          password: password,
          role: 'Shop',
        });

        console.log('Đăng ký thành công');
        navigation.navigate('Login2');
      }
      setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={SignUpStyle.container}>
      <ScrollView contentContainerStyle={SignUpStyle.scrollViewContainer}>
        <Text style={SignUpStyle.title}>Create your Account</Text>

        <View style={{marginTop: '10%'}}>
          <InputField
            icon={<Fontisto name="email" size={25} color={'#999999'} />}
            value={email}
            placeholder="Nhập Email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          <InputField
            icon={<Entypo name="lock" size={25} color={'#999999'} />}
            value={password}
            placeholder="Nhập Password"
            textContentType="password"
            onChangeText={setPassword}
            isPassword
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
          />

          <InputField
            icon={<Entypo name="lock" size={25} color={'#999999'} />}
            value={confirmPassword}
            placeholder="Nhập lại Password"
            textContentType="password"
            onChangeText={setConfirmPassword}
            isPassword
            passwordVisible={confirmPasswordVisible}
            setPasswordVisible={setConfirmPasswordVisible}
          />

          {error && <Text style={SignUpStyle.error}>{error}</Text>}

          <TouchableOpacity
            style={SignUpStyle.signUpButton}
            onPress={checkLogin}>
            <Text style={SignUpStyle.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <SocialLoginButtons />

        <SignInLink onPress={() => navigation.navigate('Login2')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputField = ({
  icon,
  isPassword,
  passwordVisible,
  setPasswordVisible,
  ...props
}) => (
  <View style={SignUpStyle.inputField}>
    <View style={SignUpStyle.iconContainer}>{icon}</View>
    <TextInput
      style={SignUpStyle.inputFieldText}
      secureTextEntry={isPassword && !passwordVisible}
      {...props}
    />
    {isPassword && (
      <TouchableOpacity
        style={SignUpStyle.eyeIconContainer}
        onPress={() => setPasswordVisible(!passwordVisible)}>
        {passwordVisible ? (
          <Entypo name="eye" size={25} color={'#000000'} />
        ) : (
          <Feather name="eye-off" size={25} color={'#000000'} />
        )}
      </TouchableOpacity>
    )}
  </View>
);

const SocialLoginButtons = () => (
  <>
    <View style={SignUpStyle.orContinueWith}>
      <View style={SignUpStyle.separator} />
      <Text style={SignUpStyle.orContinueWithText}>or continue with</Text>
      <View style={SignUpStyle.separator} />
    </View>

    <View style={SignUpStyle.socialButtonsContainer}>
      <SocialButton
        imageSource={imagePath.facebook}
        onPress={() => alert('facebook')}
      />
      <SocialButton
        imageSource={imagePath.google}
        onPress={() => alert('google')}
      />
    </View>
  </>
);

const SocialButton = ({imageSource, onPress}) => (
  <TouchableOpacity style={SignUpStyle.button} onPress={onPress}>
    <Image source={imageSource} style={SignUpStyle.icon} />
  </TouchableOpacity>
);

const SignInLink = ({onPress}) => (
  <View style={SignUpStyle.signUpLinkContainer}>
    <Text style={SignUpStyle.signUpLinkText}>Already have an account? </Text>
    <Text style={SignUpStyle.signUpLink} onPress={onPress}>
      Sign In
    </Text>
  </View>
);

export default SignUp;
