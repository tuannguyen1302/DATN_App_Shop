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
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {apiGet, apiPut} from '../../utils/utils';
import {API_BASE_URL, SHOP_API} from '../../config/urls';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {TouchableOpacity} from 'react-native';

const ShopUpdate = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);

  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [avatarSource, setAvatarSource] = useState([]);

  const clearField = setField => {
    setField('');
  };

  const openCamera = async isFrontCamera => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      const response = isFrontCamera
        ? await launchCamera({mediaType: 'photo'})
        : await launchImageLibrary({mediaType: 'photo', multiple: true});

      setAvatarSource(response.assets[0]);
      bottomSheetModalRef.current?.close();
    } catch (error) {
      console.log(error);
    }
  };

  const postApi = async () => {
    try {
      if (
        !shopName ||
        !shopPhone ||
        !shopDescription ||
        !shopEmail ||
        !shopAddress ||
        !avatarSource
      ) {
        ToastAndroid.show(
          'Vui lòng nhập đủ các trường dữ liệu hiện có!',
          ToastAndroid.SHORT,
        );

        return;
      }

      const formData = new FormData();
      formData.append('nameShop', shopName);
      formData.append('phoneNumberShop', shopPhone);
      formData.append('des', shopDescription);
      formData.append('emailShop', shopEmail);
      formData.append('address', shopAddress);

      let localUri = avatarSource?.uri;
      let filename = localUri.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('avatar', {uri: localUri, name: filename, type});

      await apiPut(`${SHOP_API}/updateShop`, formData, {
        'Content-Type': 'multipart/form-data',
      });

      navigation.navigate('Profile');
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  const getApi = async () => {
    try {
      const res = await apiGet(`${SHOP_API}/getShopForShop`);
      setShopName(res?.message?.nameShop);
      setShopDescription(res?.message?.des);
      setShopAddress(res?.message?.address);
      setShopPhone(res?.message?.phoneNumberShop.toString());
      setShopEmail(res?.message?.emailShop);
      setAvatarSource({
        uri: `${API_BASE_URL}${res?.message?.avatarShop}`,
      });
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Pressable onPress={() => bottomSheetModalRef.current?.close()}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 15,
                }}>
                <AntDesign name="left" size={30} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.titleText}>Sửa hồ sơ</Text>
            </View>
            <ScrollView>
              <View style={styles.avatarSection}>
                <Pressable
                  onPress={() => bottomSheetModalRef.current?.present()}>
                  {avatarSource?.uri ? (
                    <Image
                      style={styles.avatar}
                      source={{uri: avatarSource?.uri}}
                    />
                  ) : (
                    <Image
                      style={styles.avatar}
                      source={{
                        uri: 'https://i.ytimg.com/vi/Sj0NENb2nT4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBk8S6cRMKFRWzWWGT8hOL1e0LO3w',
                      }}
                    />
                  )}
                  <View
                    style={{
                      position: 'absolute',
                      width: 30,
                      height: 30,
                      borderRadius: 20,
                      bottom: '3%',
                      backgroundColor: '#474747',
                      right: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Feather color={'white'} name="camera" size={20} />
                  </View>
                </Pressable>
              </View>

              <View style={styles.formSection}>
                {[
                  {
                    label: 'Tên cửa hàng',
                    state: shopName,
                    setState: setShopName,
                  },
                  {label: 'Email', state: shopEmail, setState: setShopEmail},
                  {
                    label: 'Địa chỉ cửa hàng',
                    state: shopAddress,
                    setState: setShopAddress,
                  },
                  {
                    label: 'Số điện thoại',
                    state: shopPhone,
                    setState: setShopPhone,
                  },
                  {
                    label: 'Mô tả cửa hàng',
                    state: shopDescription,
                    setState: setShopDescription,
                  },
                ].map((item, index) => (
                  <View key={index} style={styles.viewname}>
                    <View>
                      <Text style={styles.text}>{item.label}</Text>
                    </View>
                    <View style={styles.otxt}>
                      <TextInput
                        style={{
                          fontSize: 18,
                          width: '90%',
                          flexWrap: 'nowrap',
                          textAlignVertical: 'top',
                          maxHeight: 120,
                          paddingVertical: 8,
                        }}
                        value={item.state}
                        onChangeText={item.setState}
                        maxLength={120}
                        multiline={true}
                        placeholder={`Nhập ${item.label.toLowerCase()}`}
                      />
                      <View>
                        <Text>{item?.state?.length}/120</Text>
                        <Pressable onPress={() => clearField(item.setState)}>
                          <AntDesign
                            name="closesquareo"
                            size={20}
                            color={item.state ? 'red' : 'gray'}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))}
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
          backgroundStyle={{
            borderRadius: 25,
            borderWidth: 0.4,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{fontSize: 20, color: 'gray', fontWeight: 'bold'}}>
              Chọn ảnh từ
            </Text>
            <TouchableOpacity
              onPress={() => openCamera(true)}
              style={{
                width: '80%',
                marginVertical: '3%',
                height: '35%',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#ddd',
                borderRadius: 20,
              }}>
              <View
                style={{
                  width: 75,
                  height: 75,
                  backgroundColor: '#eee',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome name="camera" size={30} color={'#536EFF'} />
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                Chụp ảnh
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openCamera(false)}
              style={{
                width: '80%',
                marginVertical: '3%',
                height: '35%',
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#ddd',
                borderRadius: 20,
              }}>
              <View
                style={{
                  width: 75,
                  height: 75,
                  backgroundColor: '#eee',
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Ionicons name="library" size={30} color={'#536EFF'} />
              </View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 5,
                }}>
                Thư viện
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingBottom: 35,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
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
  viewname: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  otxt: {
    borderRadius: 20,
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
});

export default ShopUpdate;
