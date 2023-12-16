import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apiPut} from '../../utils/utils';
import {FORGOT_API} from '../../config/urls';
import imagePath from '../../constants/imagePath';

const isValidEmail = email => /^[A-Z0-9._%+-]+@gmail\.com$/i.test(email);

const ForgotScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async () => {
    setError('');
    if (!email) {
      setError('Vui lòng nhập email!');
    } else if (!isValidEmail(email)) {
      setError('Email không đúng định dạng!');
    } else {
      try {
        const res = await apiPut(FORGOT_API, {
          email,
        });

        if (res?.message === 'success') {
          Alert.alert(
            'Thông báo',
            'Mật khẩu của bạn đã được thiết lập lại, vui lòng kiểm tra hộp thư đến',
          );
          navigation.navigate('Login2');
        } else {
          ToastAndroid.show(
            'Yêu cầu thất bại, vui lòng kiểm tra tài khoản',
            ToastAndroid.SHORT,
          );
        }
      } catch (error) {
        console.error('Lỗi trong quá trình gửi yêu cầu:', error.message);
      }
    }
  };

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
          Nhập email để xác thực quên mật khẩu
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            placeholder="Nhập email xác nhận..."
            onChangeText={setEmail}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleForgotPassword}>
          <Text style={styles.submitButtonText}>Gửi mã</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  inputContainer: {
    height: 50,
    marginHorizontal: '8%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    margin: '5%',
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
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});

export default ForgotScreen;
