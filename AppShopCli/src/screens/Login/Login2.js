import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {CheckBox} from 'react-native-elements';
import {SIGNIN_API} from '../../config/urls';
import imagePath from '../../constants/imagePath';
import {apiPost, setItem} from '../../utils/utils';
import {Login2Style} from './styles';

const isValidEmail = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
const isValidPassword = password =>
  /^(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password);

const Login2 = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const login = async () => {
    if (!isButtonDisabled) {
      setError('');
      setButtonDisabled(true);

      if (!email) setError('Email không được để trống');
      else if (!isValidEmail(email)) setError('Email không đúng định dạng');
      else if (!password) setError('Mật khẩu không được để trống');
      else if (password.length < 6)
        setError('Mật khẩu phải có ít nhất 6 kí tự');
      else {
        const res = await apiPost(SIGNIN_API, {email, password, role: 'Shop'});
        setItem('LoginUser', res.message);
        console.log('Đăng nhập thành công');
        navigation.replace('BottomTab');
      }
      setTimeout(() => setButtonDisabled(false), 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={Login2Style.container}>
      <ScrollView contentContainerStyle={Login2Style.scrollViewContainer}>
        <Text style={Login2Style.title}>Login to your Account</Text>

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

          {error && <Text style={Login2Style.error}>{error}</Text>}

          <CheckBox
            title="Lưu tài khoản"
            checked={isChecked}
            checkedColor="#000000"
            uncheckedColor="#000000"
            containerStyle={Login2Style.checkBox}
            onPress={() => setIsChecked(!isChecked)}
          />

          <TouchableOpacity style={Login2Style.signInButton} onPress={login}>
            <Text style={Login2Style.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text
            style={Login2Style.forgotPassword}
            onPress={() => alert('forgot')}>
            Forgot the password?
          </Text>
        </View>

        <SocialLoginButtons />
        <SignUpLink onPress={() => navigation.navigate('SignUp')} />
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
  <View style={Login2Style.inputField}>
    <View style={Login2Style.iconContainer}>{icon}</View>
    <TextInput
      style={Login2Style.inputFieldText}
      secureTextEntry={isPassword && !passwordVisible}
      {...props}
    />
    {isPassword && (
      <TouchableOpacity
        style={Login2Style.eyeIconContainer}
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
    <View style={Login2Style.orContinueWith}>
      <View style={Login2Style.separator} />
      <Text style={Login2Style.orContinueWithText}>or continue with</Text>
      <View style={Login2Style.separator} />
    </View>

    <View style={Login2Style.socialButtonsContainer}>
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
  <TouchableOpacity style={Login2Style.button} onPress={onPress}>
    <Image source={imageSource} style={Login2Style.icon} />
  </TouchableOpacity>
);

const SignUpLink = ({onPress}) => (
  <View style={Login2Style.signUpLinkContainer}>
    <Text style={Login2Style.signUpLinkText}>Don't have an account? </Text>
    <Text style={Login2Style.signUpLink} onPress={onPress}>
      Sign Up
    </Text>
  </View>
);

export default Login2;
