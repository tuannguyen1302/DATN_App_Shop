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
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import imagePath from '../../../src/constants/imagePath';
import {apiGet, apiPut} from '../../../src/utils/utils';
import {API_BASE_URL, SHOP_API} from '../../../src/config/urls';

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
      const response = await launchImageLibrary({mediaType: 'photo'});

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
      formData.append('avatar', {uri: localUri, name: filename, type});

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
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.rowHeader}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color={'black'} />
            </Pressable>
            <Text style={styles.titleText}>Sửa hồ sơ</Text>
            <Pressable onPress={postApi}>
              <Text style={styles.saveText}>Lưu</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.avatarSection} onPress={selectImage}>
          {avatarSource?.uri ? (
            <Image style={styles.avatar} source={{uri: avatarSource?.uri}} />
          ) : (
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://i.ytimg.com/vi/Sj0NENb2nT4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBk8S6cRMKFRWzWWGT8hOL1e0LO3w',
              }}
            />
          )}
          <Text style={styles.editText}>Sửa</Text>
          <View style={styles.editButton} />
        </Pressable>

        <View style={styles.formSection}>
          {[
            {label: 'Tên cửa hàng', state: shopName, setState: setShopName},
            {
              label: 'Mô tả cửa hàng',
              state: shopDescription,
              setState: setShopDescription,
            },
            {
              label: 'Địa chỉ cửa hàng',
              state: shopAddress,
              setState: setShopAddress,
            },
            {label: 'Số điện thoại', state: shopPhone, setState: setShopPhone},
            {label: 'Email', state: shopEmail, setState: setShopEmail},
          ].map((item, index) => (
            <View key={index} style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <View>
                  <Text style={styles.inputLabel}>
                    {item.label}
                    <Text style={{color: 'red'}}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.inputField}
                    value={item.state}
                    onChangeText={item.setState}
                    maxLength={120}
                    placeholder={`Nhập ${item.label.toLowerCase()}`}
                  />
                </View>
                <View style={styles.inputStatus}>
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

        <Image style={styles.bottomImage} source={imagePath.shopSea} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  saveText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarSection: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A29C9C',
    borderColor: '#3498db',
    borderWidth: 2,
  },
  avatar: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  editText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    bottom: '8%',
    zIndex: 1,
  },
  editButton: {
    width: 190,
    height: 50,
    opacity: 0.5,
    bottom: '0%',
    position: 'absolute',
    backgroundColor: '#A29C9C',
  },
  formSection: {
    borderColor: '#CDCDCD',
    borderTopWidth: 5,
    borderBottomWidth: 5,
  },
  inputContainer: {
    height: 70,
    borderColor: '#CDCDCD',
    borderTopWidth: 2,
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  inputRow: {
    marginVertical: '3%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  inputField: {
    width: 320,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderColor: '#bdc3c7',
    borderRadius: 5,
  },
  inputStatus: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10, // Adjust the margin at the top
  },
});

export default ShopUpdate;
