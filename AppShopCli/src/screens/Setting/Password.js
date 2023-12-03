import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Input, Button, Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imagePath from '../../constants/imagePath';
import {apiPut} from '../../utils/utils';
import {USER_API} from '../../config/urls';

const Password = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const handleSave = async () => {
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      setError('Vui lòng nhập đầy đủ thông tin.');
    } else if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
    } else if (
      oldPassword.length < 6 ||
      newPassword.length < 6 ||
      secureConfirmPassword.length < 6
    ) {
      setError('Mật khẩu phải có ít nhất 6 kí tự');
    } else {
      try {
        const res = await apiPut(`${USER_API}/changePassword`, {
          oldPassword,
          newPassword,
        });
        Alert.alert('Thông báo', res?.message?.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.title}>Change Password</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal: '5%'}}>
        <Image source={imagePath.logo} style={styles.logo} />
        {renderInput(
          'Mật khẩu cũ',
          secureOldPassword,
          setSecureOldPassword,
          oldPassword,
          setOldPassword,
        )}
        {renderInput(
          'Mật khẩu mới',
          secureNewPassword,
          setSecureNewPassword,
          newPassword,
          setNewPassword,
        )}
        {renderInput(
          'Nhập lại mật khẩu mới',
          secureConfirmPassword,
          setSecureConfirmPassword,
          confirmPassword,
          setConfirmPassword,
        )}
        {error && (
          <Text style={{color: 'red', marginBottom: '5%'}}>{error}</Text>
        )}
        <Button
          title="Lưu"
          onPress={handleSave}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.saveButton}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const renderInput = (
  placeholder,
  secureTextEntry,
  toggleSecure,
  value,
  onChangeText,
) => (
  <Input
    placeholder={placeholder}
    secureTextEntry={secureTextEntry}
    containerStyle={styles.input}
    value={value}
    onChangeText={onChangeText}
    leftIcon={<Icon name="lock" size={24} color="black" />}
    rightIcon={
      <Icon
        name={secureTextEntry ? 'eye-off' : 'eye'}
        type="feather"
        size={24}
        color="black"
        onPress={() => toggleSecure(!secureTextEntry)}
      />
    }
  />
);

export default Password;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    padding: 15,
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
  title: {
    left: '30%',
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  input: {
    marginVertical: '1%',
  },
  saveButton: {
    backgroundColor: 'black',
    height: 50,
    borderRadius: 20,
  },
});
