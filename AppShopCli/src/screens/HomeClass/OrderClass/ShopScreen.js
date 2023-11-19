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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {SOCKET_URL} from '../../../utils/socketService';

const ShopScreen = () => {
  const navigation = useNavigation();

  // States to track shop information and avatar image
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [avatarSource, setAvatarSource] = useState([]);

  // Function to clear the content of an input field
  const clearField = setField => {
    setField('');
  };

  // Function to select an image from the camera
  const selectImage = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      const response = await launchImageLibrary({mediaType: 'photo'});

      setAvatarSource(response.assets[0]);
      console.log(response.assets[0]);
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

      formData.append('avatar', {
        uri: avatarSource?.uri,
        type: avatarSource?.type,
        name: avatarSource?.fileName,
      });

      const res = await axios.put(
        `${SOCKET_URL}v1/api/shop/updateShop`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-xclient-id': '654c895786644a5c7ac507df',
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNzAwMjkwOTk2LCJleHAiOjE3MDExNTQ5OTZ9.lzUBd4bBCBd6zUsjp9S5C47ofetyCEZ9_aTEZcpxYJY',
          },
        },
      );

      console.log(res.data);
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  const getApi = async () => {
    try {
      const res = await axios.get(`${SOCKET_URL}v1/api/shop/getShopForShop`, {
        headers: {
          'x-xclient-id': '654c895786644a5c7ac507df',
          authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNzAwMjkwOTk2LCJleHAiOjE3MDExNTQ5OTZ9.lzUBd4bBCBd6zUsjp9S5C47ofetyCEZ9_aTEZcpxYJY',
        },
      });
      setShopName(res.data.message?.nameShop);
      setShopDescription(res.data.message?.des);
      setShopAddress(res.data.message?.address);
      setShopPhone(res.data.message?.phoneNumberShop.toString());
      setShopEmail(res.data.message?.emailShop);
      setAvatarSource({
        uri: `${SOCKET_URL}${res.data.message?.avatarShop}`,
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
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.rowHeader}>
            {/* Back button */}
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color={'black'} />
            </Pressable>
            <Text style={styles.titleText}>Sửa hồ sơ</Text>
            {/* Save button */}
            <Pressable onPress={postApi}>
              <Text style={styles.saveText}>Lưu</Text>
            </Pressable>
          </View>
        </View>

        {/* Display and select avatar image */}
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

        {/* Input shop information */}
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
                  {/* Button to clear the input field content */}
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

        {/* Image at the bottom of the page */}
        <Image
          style={styles.bottomImage}
          source={require('../../../../images/ShopSea.png')}
        />
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

export default ShopScreen;
