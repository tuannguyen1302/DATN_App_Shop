import React, {useState} from 'react';
import {
  StyleSheet,
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
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Tiêu đề màn hình */}
        <Text style={styles.title}>Create your Account</Text>

        {/* Ô nhập email */}
        <View style={{marginTop: '10%'}}>
          <InputField
            icon={<Fontisto name="email" size={25} color={'#999999'} />}
            value={email}
            placeholder="Nhập Email"
            keyboardType="email-address"
            onChangeText={setEmail}
          />

          {/* Ô nhập mật khẩu */}
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

          {/* Ô nhập xác nhận mật khẩu */}
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

          {/* Hiển thị lỗi nếu có */}
          {error && <Text style={styles.error}>{error}</Text>}

          {/* Nút đăng ký */}
          <TouchableOpacity style={styles.signUpButton} onPress={checkLogin}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Nút đăng ký bằng tài khoản mạng xã hội */}
        <SocialLoginButtons />

        {/* Đường link đến màn hình đăng nhập */}
        <SignInLink onPress={() => navigation.navigate('Login2')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Component ô nhập dữ liệu
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

// Component nút đăng ký bằng tài khoản mạng xã hội
const SocialLoginButtons = () => (
  <>
    {/* Dòng chữ "or continue with" */}
    <View style={styles.orContinueWith}>
      <View style={styles.separator} />
      <Text style={styles.orContinueWithText}>or continue with</Text>
      <View style={styles.separator} />
    </View>

    {/* Nút đăng ký bằng Facebook và Google */}
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

// Component nút mạng xã hội
const SocialButton = ({imageSource, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Image source={imageSource} style={styles.icon} />
  </TouchableOpacity>
);

// Component đường link đến màn hình đăng nhập
const SignInLink = ({onPress}) => (
  <View style={styles.signUpLinkContainer}>
    <Text style={styles.signUpLinkText}>Already have an account? </Text>
    <Text style={styles.signUpLink} onPress={onPress}>
      Sign In
    </Text>
  </View>
);

// StyleSheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
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
    marginBottom: 25,
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
  signUpButton: {
    backgroundColor: 'black',
    height: 60,
    width: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: '5%',
  },
  signUpButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
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

export default SignUp;
