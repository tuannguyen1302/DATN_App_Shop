import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import imagePath from '../../constants/imagePath';
const Password = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const handleSave = () => {
    // Thực hiện kiểm tra và xử lý khi người dùng nhấn nút "Lưu"
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      alert('Vui lòng nhập đầy đủ thông tin.');
    } else if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
    } else {
      // Gửi yêu cầu đổi mật khẩu đến server hoặc xử lý tương ứng
      alert('Đã đổi mật khẩu thành công!');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled>

      <View style={styles.header}>
        <View style={styles.rowHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </Pressable>
          <Text style={styles.titleText}>Đổi mật khẩu </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 5 }}>
        <Image source={imagePath.logo} style={styles.logo} />
      </View>

      <View style={{ marginHorizontal: 20, padding: 10 }}>
        <Input
          placeholder="Mật khẩu cũ"
          secureTextEntry={secureOldPassword}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          rightIcon={
            <Icon
              name={secureOldPassword ? 'eye-off' : 'eye'}
              type="feather"
              size={24}
              color="black"
              onPress={() => setSecureOldPassword(!secureOldPassword)}
            />
          }
        />
        <Input
          placeholder="Mật khẩu mới"
          secureTextEntry={secureNewPassword}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          rightIcon={
            <Icon
              name={secureNewPassword ? 'eye-off' : 'eye'}
              type="feather"
              size={24}
              color="black"
              onPress={() => setSecureNewPassword(!secureNewPassword)}
            />
          }
        />
        <Input
          placeholder="Nhập lại mật khẩu mới"
          secureTextEntry={secureConfirmPassword}
          containerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          leftIcon={<Icon name="lock" size={24} color="black" />}
          rightIcon={
            <Icon
              name={secureConfirmPassword ? 'eye-off' : 'eye'}
              type="feather"
              size={24}
              color="black"
              onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
            />
          }
        />
      </View>
      <Button
        title="Lưu"
        onPress={handleSave}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.saveButton}
      />


    </KeyboardAvoidingView>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: 70,
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,

  }, inputContainer: {
    marginVertical: 10,

  },
  inputInnerContainer: {
    borderBottomWidth: 1,
    borderColor: 'black',

  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginBottom: 50
  },
  saveButton: {
    backgroundColor: 'black',
    marginHorizontal: 20,
    borderRadius: 10
  }, inputText: {
    color: '#000000', // Màu chữ cho Input
  },
});
