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
import { ToastAndroid } from 'react-native';

const ShopUpdate = ({ navigation }) => {
  const account = useSelector(state => state?.user?.userData);

  const [data, setData] = useState({
    avatar: { uri: `${API_BASE_URL}${account?.avatarShop}` },
    nameShop: account?.nameShop,

    address: account?.address,
    phoneNumberShop: account?.phoneNumberShop.toString(),
    des: account?.des,
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
    if (
      !data.nameShop ||
      !data.address ||
      !data.phoneNumberShop ||
      !data.des
    ) {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT);
      return;
    }

    // Kiểm tra định dạng số điện thoại
    const phoneNumberRegex = /^[0-9]{10}$/; // Định dạng cho số điện thoại Việt Nam
    if (!phoneNumberRegex.test(data.phoneNumberShop)) {
      ToastAndroid.show('Số điện thoại không hợp lệ', ToastAndroid.SHORT);
      return;
    }

    const formData = new FormData();
    formData.append('nameShop', data?.nameShop);
    formData.append('phoneNumberShop', data?.phoneNumberShop);
    formData.append('des', data?.des);

    formData.append('address', data?.address);

    let localUri = data?.avatar?.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    formData.append('avatar', { uri: localUri, name: filename, type });

    try {
      updateUserData(formData);
      navigation.goBack();

      ToastAndroid.show('Cập nhật hồ sơ thành công', ToastAndroid.SHORT);
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
          onChangeText={
            (text) => setData({ ...data, [value]: text.slice(0, maxLength) })}
          maxLength={maxLength}
          keyboardType={value === 'phoneNumberShop' ? 'numeric' : 'default'}
          placeholder={`Nhập ${label.toLowerCase()}`}
        />
        <View style={{ alignItems: 'center', justifyContent: 'space-around' }}>
          <Text>{state.length}/{maxLength}</Text>
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
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}>
                <AntDesign name="left" size={30} color={'black'} />
              </TouchableOpacity>
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
                    state: data?.nameShop,
                    value: 'nameShop',
                    maxLength: 100,
                  },

                  {
                    label: 'Địa chỉ cửa hàng',
                    state: data?.address,
                    value: 'address',
                    maxLength: 120,
                  },
                  {
                    label: 'Số điện thoại',
                    state: data?.phoneNumberShop,
                    value: 'phoneNumberShop',
                    maxLength: 10,
                  },
                  {
                    label: 'Mô tả cửa hàng',
                    state: data?.des,
                    value: 'des',
                    maxLength: 120,
                  },
                ].map(item =>
                  renderTextInput(item.label, item.state, item.value, item.maxLength),
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
          index={1}
          snapPoints={['1%', '50%']}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    marginTop: 100,
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

export default ShopUpdate;
