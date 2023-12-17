import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FORGOT_API, OTP_FORGOT_API} from '../../config/urls';
import imagePath from '../../constants/imagePath';
import {apiPost, apiPut} from '../../utils/utils';
import {ToastAndroid} from 'react-native';

const ForgotScreen = ({navigation}) => {
  const [isCheck, setIsCheck] = useState(true);
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Image source={imagePath.logo} style={styles.logo} />
        <Text style={styles.title}>Xác thực quên mật khẩu</Text>
        <Text style={styles.subtitle}>
          {isCheck
            ? 'Nhập email để xác thực quên mật khẩu'
            : 'Mã xác thực đã được gửi đến địa chỉ email'}
        </Text>

        {isCheck ? (
          <EmailForgot data={{email, setEmail, setIsCheck}} />
        ) : (
          <ScreenOtp navigation={navigation} data={{email, setIsCheck}} />
        )}
      </ScrollView>
    </View>
  );
};

const isValidEmail = email => /^[A-Z0-9._%+-]+@gmail\.com$/i.test(email);

const EmailForgot = ({data}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const check = async () => {
    setError('');
    if (!data.email) {
      setError('Vui lòng nhập email!');
    } else if (!isValidEmail(data.email)) {
      setError('Email không đúng định dạng!');
    } else {
      setLoading(true);
      try {
        const res = await apiPut(FORGOT_API, {email: data.email});
        if (res?.status == 500) {
          setError(res?.message);
        } else {
          data?.setIsCheck(false);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Lỗi rồi gửi lại');
      }
    }
  };

  return (
    <View>
      <View
        style={{
          height: 50,
          marginHorizontal: '8%',
          borderRadius: 10,
          borderWidth: 1,
          padding: 5,
          margin: '5%',
        }}>
        <TextInput
          value={data.email}
          placeholder="Nhập email xác nhận..."
          onChangeText={data.setEmail}
        />
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        disabled={loading}
        style={[styles.submitButton, {opacity: loading ? 0.9 : 1}]}
        onPress={check}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={styles.submitButtonText}>Gửi mã</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const ScreenOtp = ({navigation, data}) => {
  const otpInputs = useRef(Array(6));
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    if (index < 5 && value !== '') {
      otpInputs.current[index + 1]?.focus();
    }

    setOtp(newOtp);

    if (index === 5 - 1 && value !== '') {
      setError('');
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.some(item => item === '')) {
      setError('Vui lòng nhập đầy đủ mã OTP.');
      return;
    }
    setLoading(true);
    try {
      const res = await apiPost(OTP_FORGOT_API, {
        email: data.email,
        otp: otp.join(''),
      });

      if (res?.status == 500) {
        setError('Mã không chính xác');
      } else {
        ToastAndroid.show(
          'Mật khẩu của bạn đã được thay đổi vui lòng kiểm tra email',
          ToastAndroid.SHORT,
        );
        navigation.navigate('Login2');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Mã không chính xác');
    }
  };

  const handleResend = async () => {
    setMinutes(0);
    setSeconds(59);
    setError('');
    setIsResendDisabled(true);
    console.log(data.email);

    try {
      const res = await apiPut(FORGOT_API, {email: data.email});
      console.log(res);
      if (res?.status == 500) setError(res?.message);
    } catch (error) {
      console.log('Lỗi rồi gửi lại');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      } else if (minutes > 0) {
        setMinutes(prevMinutes => prevMinutes - 1);
        setSeconds(59);
      } else {
        clearInterval(intervalId);
        setIsResendDisabled(false);
      }
    }, 1000);

    setIsResendDisabled(true);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  return (
    <ScrollView>
      <Text style={styles.email}>{data.email}</Text>
      <View style={styles.otpContainer}>
        {otp.map((item, index) => (
          <TextInput
            key={index}
            style={[
              styles.otpInput,
              {borderColor: item !== '' ? 'transparent' : 'black'},
            ]}
            onChangeText={value => handleOtpChange(index, value)}
            value={item}
            keyboardType="numeric"
            maxLength={1}
            ref={input => (otpInputs.current[index] = input)}
          />
        ))}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[styles.submitButton, {opacity: loading ? 0.9 : 1}]}
        onPress={handleVerifyOTP}>
        {loading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={styles.submitButtonText}>Xác nhận</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.timerText}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>

      <View style={styles.resendContainer}>
        <Text>Không nhận được mã ? </Text>
        <TouchableOpacity
          style={[styles.resendButton, isResendDisabled && {opacity: 0.2}]}
          onPress={handleResend}
          disabled={isResendDisabled}>
          <Text style={styles.resendButtonText}>Gửi lại mã</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => data?.setIsCheck(true)}
        style={[styles.backButton, {alignSelf: 'center', marginTop: '5%'}]}>
        <AntDesign name="left" size={20} color={'black'} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    marginHorizontal: '8%',
    marginVertical: '5%',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  logo: {
    height: 200,
    width: 250,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
  },
  email: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
  },
  otpInput: {
    borderWidth: 1,
    fontSize: 16,
    width: 50,
    height: 50,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius: 25,
    borderColor: 'black',
  },
  submitButton: {
    backgroundColor: 'black',
    height: 50,
    marginHorizontal: '10%',
    borderRadius: 5,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resendButton: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  timerText: {
    marginVertical: 10,
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});

export default ForgotScreen;
