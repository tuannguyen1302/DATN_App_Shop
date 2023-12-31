import React, { useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { API_BASE_URL } from '../../config/urls';
import { useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { updateUserData } from '../../redux/actions/user';

const Updateprofile = ({ navigation, route }) => {
  const email = route.params?.email || '';
  const [data, setData] = useState({
    avatar: {
      uri: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
    },
    nameShop: '',
    address: '',
    // email: 'dd@gmail.com',
    phoneNumberShop: '',
    des: '',
  });
  const bottomSheetModalRef = useRef(null);
  const openCamera = async isFrontCamera => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      const response = isFrontCamera
        ? await launchCamera({ mediaType: 'photo' })
        : await launchImageLibrary({ mediaType: 'photo', multiple: true });
      setData({ ...data, avatar: response.assets[0] });
      bottomSheetModalRef.current?.close();
    } catch (error) {
      console.log(error);
    }
  };
  const postApi = async () => {
    //console.log(data.email);
    if (

      !data.nameShop ||
      !data.address ||
      !data.phoneNumberShop.trim() || // Kiểm tra rỗng sau khi xóa khoảng trắng
      !/^[0-9]{10}$/.test(data.phoneNumberShop.trim()) || // Kiểm tra định dạng số điện thoại
      !data.des
    ) {
      ToastAndroid.show(
        'Vui lòng nhập đủ các trường dữ liệu hiện có và kiểm tra định dạng số điện thoại!',
        ToastAndroid.SHORT,
      );
      return;
    }
    const formData = new FormData();
    formData.append('nameShop', data?.nameShop);
    formData.append('phoneNumberShop', data?.phoneNumberShop);
    formData.append('des', data?.des);
    // formData.append('emailShop', data?.email);
    formData.append('address', data?.address);
    let localUri = data?.avatar?.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append('avatar', { uri: localUri, name: filename, type });

    try {
      const res = await updateUserData(formData, navigation);

      if (res) {
        console.log('đăng kí ok ');
        navigation.replace('BottomTab');
      }

    } catch (error) {
      throw error;
    }
  };
  const renderTextInput = (label, state, value, maxLength) => (
    <View key={label} style={styles.viewname}>
      <View>
        <Text style={styles.text}>{label}</Text>
      </View>
      <View style={styles.otxt}>
        <TextInput
          style={styles.input}
          value={state}
          onChangeText={text => setData({ ...data, [value]: text })}
          maxLength={maxLength}
          multiline={true}
          placeholder={`Nhập ${label.toLowerCase()}`}
        />
        <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
          <Text>
            {state.length}/{maxLength}
          </Text>
          <Pressable onPress={() => setData({ ...data, [value]: '' })}>
            <AntDesign
              name="closecircleo"
              size={20}
              color={state ? 'red' : 'gray'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Pressable onPress={() => bottomSheetModalRef.current?.close()}>
            <View style={styles.header}>
              <Text style={styles.titleText}>Sửa hồ sơ</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.avatarSection}>
                <Pressable
                  onPress={() => bottomSheetModalRef.current?.present()}>
                  <Image
                    style={styles.avatar}
                    source={{ uri: data?.avatar?.uri }}
                  />
                  <View style={styles.cameraIcon}>
                    <Feather color={'white'} name="camera" size={20} />
                  </View>
                </Pressable>
              </View>
              <View style={styles.formSection}>
                {[
                  {
                    label: 'Tên cửa hàng',
                    state: data.nameShop,

                    value: 'nameShop',
                    maxLength: 100,
                  },

                  {
                    label: 'Địa chỉ cửa hàng',
                    state: data.address,
                    value: 'address',
                    maxLength: 100,
                  },
                  {
                    label: 'Số điện thoại',
                    state: data.phoneNumberShop.toString(),
                    value: 'phoneNumberShop',
                    maxLength: 10,
                  },
                  {
                    label: 'Mô tả cửa hàng',
                    state: data.des,
                    value: 'des',
                    maxLength: 100,
                  },
                ].map(item =>
                  renderTextInput(
                    item.label,
                    item.state,
                    item.value,
                    item.maxLength,
                  ),
                )}
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={postApi}>
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
          </Pressable>
        </KeyboardAvoidingView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          // index={1}
          snapPoints={['50%']}
          backgroundStyle={styles.bottomSheetBackground}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: 'gray', fontWeight: 'bold' }}>
              Chọn ảnh từ
            </Text>
            <TouchableOpacity
              onPress={() => openCamera(true)}
              style={styles.bottomSheetButton}>
              <View style={styles.bottomSheetIcon}>
                <FontAwesome name="camera" size={30} color={'#536EFF'} />
              </View>
              <Text style={styles.bottomSheetButtonText}>Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openCamera(false)}
              style={styles.bottomSheetButton}>
              <View style={styles.bottomSheetIcon}>
                <Ionicons name="library" size={30} color={'#536EFF'} />
              </View>
              <Text style={styles.bottomSheetButtonText}>Thư viện</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Updateprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 35,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 80,
  },
  avatarSection: {
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  cameraIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 20,
    bottom: '3%',
    backgroundColor: '#474747',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formSection: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  viewname: {
    marginTop: 10,
  },
  otxt: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#9E9E9E7A',
    paddingHorizontal: 20,
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    fontSize: 18,
    width: '90%',
    flexWrap: 'nowrap',
    textAlignVertical: 'top',
    maxHeight: 120,
    paddingVertical: 8,
  },
  button: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: 30,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomSheetBackground: {
    borderRadius: 25,
    borderWidth: 0.4,
  },
  bottomSheetBackground: {
    borderRadius: 25,
    borderWidth: 0.4,
  },
  bottomSheetButton: {
    width: '80%',
    marginVertical: '3%',
    height: '35%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ddd',
    borderRadius: 20,
  },
  bottomSheetIcon: {
    width: 75,
    height: 75,
    backgroundColor: '#eee',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSheetButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
});
