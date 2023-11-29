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
  Touchable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import imagePath from '../../constants/imagePath';
import { apiGet, apiPut } from '../../utils/utils';
import { API_BASE_URL, SHOP_API } from '../../config/urls';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
const ShopUpdate = () => {
  const navigation = useNavigation();

  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [avatarSource, setAvatarSource] = useState([]);

  const clearField = setField => {
    setField('');
  };

  const selectImage = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const response = await launchImageLibrary({ mediaType: 'photo' });

      setAvatarSource(response.assets[0]);
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
      formData.append('avatar', { uri: localUri, name: filename, type });

      const res = await apiPut(`${SHOP_API}/updateShop`, formData, {
        'Content-Type': 'multipart/form-data',
      });

      console.log(res.message);
      navigation.navigate('ShopScreen');
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  const getApi = async () => {
    try {
      const res = await apiGet(`${SHOP_API}/getShopForShop`);
      console.log(res);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rowHeader}>
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
      </View>
      <ScrollView  >

        <View style={styles.avatarSection} >
          <Pressable onPress={selectImage} >
            {avatarSource?.uri ? (
              <Image style={styles.avatar} source={{ uri: avatarSource?.uri }} />
            ) : (
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://i.ytimg.com/vi/Sj0NENb2nT4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBk8S6cRMKFRWzWWGT8hOL1e0LO3w',
                }}
              />
            )}
            <View
              style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: '#474747', marginLeft: 80, marginTop: -30, justifyContent: 'center', alignItems: 'center' }} >
              <Feather color={'white'} name="camera" size={20} />
            </View>
          </Pressable>
        </View>


        <View style={styles.formSection}>
          {[
            { label: 'Tên cửa hàng', state: shopName, setState: setShopName },
            { label: 'Email', state: shopEmail, setState: setShopEmail },
            {
              label: 'Địa chỉ cửa hàng',
              state: shopAddress,
              setState: setShopAddress,
            },
            { label: 'Số điện thoại', state: shopPhone, setState: setShopPhone },
            {
              label: 'Mô tả cửa hàng',
              state: shopDescription,
              setState: setShopDescription,
            },
          ].map((item, index) => (
            <View key={index} style={styles.viewname}>
              <View>
                <Text style={styles.text}>
                  {item.label}
                </Text>
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
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingBottom: 35
  },
  header: {
    height: 60,
    justifyContent: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '10%',
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 80
  },
  saveText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: 'bold',
  },

  avatarSection: {
    marginTop: 20,
    marginBottom: 25,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  viewname: {
    marginTop: 15,
    marginHorizontal: 20,
  }
  , otxt: {
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#9E9E9E7A',

    paddingHorizontal: 20,
    marginTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'

  }, text:
  {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  footer: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 20
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: '#616060',
  },
  buttonText: {
    fontSize: 25,
    color: '#FFFFFF',
  },
});

export default ShopUpdate;
