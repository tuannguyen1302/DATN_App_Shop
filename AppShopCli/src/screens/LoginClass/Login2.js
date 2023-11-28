import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
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
import { CheckBox } from 'react-native-elements';
import { SIGNIN_API } from '../../config/urls';
import imagePath from '../../constants/imagePath';
import { apiPost, setItem } from '../../utils/utils';

const isValidEmail = email =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

const isValidPassword = password =>
  /^(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password);

const Login2 = ({ navigation }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(false);



  const login = async (email, password) => {
    if (!isButtonDisabled) {
      setError('');
      setButtonDisabled(true);

      if (!email) {
        setError('Email không được để trống');
      } else if (!isValidEmail(email)) {
        setError('Email không đúng định dạng');
      } else if (!password) {
        setError('Mật khẩu không được để trống');
      } else if (password.length < 6) {
        setError('Mật khẩu phải có ít nhất 6 kí tự');
      } else {
        try {
          const res = await apiPost(SIGNIN_API, {
            email: email,
            password: password,
            role: 'Shop',
          });
          let loginUserData = res.message;
          console.log(loginUserData);
          setItem('LoginUser', { ...loginUserData, isChecked });
          setButtonDisabled(false);
          navigation.replace('BottomTab');
        } catch (error) {
          alert(error.message);
          setButtonDisabled(false);
        }
      }
    }

    setButtonDisabled(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Login to your Account</Text>

        <View style={{ marginTop: '10%' }}>
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
          {error && <Text style={styles.error}>{error}</Text>}
          <CheckBox
            title="Lưu tài khoản "
            checked={isChecked}
            checkedColor="#000000"
            uncheckedColor="#000000"
            containerStyle={styles.checkBox}
            onPress={async () => {
              setIsChecked(!isChecked);
              console.log('okok');
            }}
          />
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => login(email, password)}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.forgotPassword} onPress={() => alert('forgot')}>
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
  <View style={styles.inputField}>
    <View style={styles.iconContainer}>{icon}</View>
    <TextInput
      style={styles.inputFieldText}
      secureTextEntry={isPassword && !passwordVisible}
      {...props}
    />
    {isPassword && (
      <TouchableOpacity
        style={styles.eyeIconContainer}
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

// Component nút đăng nhập bằng tài khoản mạng xã hội
const SocialLoginButtons = () => (
  <>
    <View style={styles.orContinueWith}>
      <View style={styles.separator} />
      <Text style={styles.orContinueWithText}>or continue with</Text>
      <View style={styles.separator} />
    </View>

    <View style={styles.socialButtonsContainer}>
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

// Component nút đăng nhập bằng tài khoản mạng xã hội
const SocialButton = ({ imageSource, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={imageSource} style={styles.icon} />
  </TouchableOpacity>
);

// Component đường link đến màn hình đăng ký
const SignUpLink = ({ onPress }) => (
  <View style={styles.signUpLinkContainer}>
    <Text style={styles.signUpLinkText}>Don't have an account? </Text>
    <Text style={styles.signUpLink} onPress={onPress}>
      Sign Up
    </Text>
  </View>
);

// Style của component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputField: {
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    height: 64,
    width: 365,
    justifyContent: 'center',
    marginBottom: 27,
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  inputFieldText: {
    flex: 1,
    marginLeft: 10,
    color: '#000000',
    fontSize: 18,
  },
  eyeIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginLeft: 40,
  },
  checkBox: {
    backgroundColor: 'white',
    borderWidth: 0,
  },
  signInButton: {
    backgroundColor: 'black',
    height: 60,
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: '5%',
  },
  signInButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
  forgotPassword: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: '5%',
  },
  orContinueWith: {
    marginTop: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    borderWidth: 0.2,
    width: 100,
    height: 1,
    color: '#D9D9D9',
    marginHorizontal: '2%',
  },
  orContinueWithText: {
    color: '#585555',
    fontSize: 18,
  },
  socialButtonsContainer: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: 82,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  signUpLinkContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signUpLinkText: {
    fontSize: 18,
    color: '#7B7070',
    alignSelf: 'center',
  },
  signUpLink: {
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default Login2;
