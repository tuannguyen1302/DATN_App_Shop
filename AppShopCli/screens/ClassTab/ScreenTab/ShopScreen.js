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
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const ShopScreen = () => {
  const navigation = useNavigation();

  // Các state để theo dõi thông tin cửa hàng và ảnh đại diện
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [avatarSource, setAvatarSource] = useState(null);

  // Hàm để xóa nội dung của trường thông tin
  const clearField = (field, setField) => {
    setField('');
  };

  // Hàm để chọn ảnh từ camera
  const selectImage = async () => {
    try {
      // Yêu cầu quyền truy cập camera
      const cameraPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      // Nếu quyền được cấp, mở camera và cập nhật ảnh đại diện
      if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
        await launchCamera(
          {
            mediaType: 'photo',
            cameraType: 'back',
          },
          response => {
            if (!response.didCancel && !response.error) {
              setAvatarSource(response.assets[0].uri);
            }
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Phần render của component
  return (
    // Sử dụng KeyboardAvoidingView để tránh che phủ bởi bàn phím
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      {/* Sử dụng ScrollView để cuộn nội dung */}
      <ScrollView>
        {/* Phần header */}
        <View style={styles.header}>
          <View style={styles.rowHeader}>
            {/* Nút quay lại */}
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color={'black'} />
            </Pressable>
            <Text style={styles.titleText}>Edit Profile</Text>
            {/* Nút lưu */}
            <Pressable>
              <Text style={styles.saveText}>Save</Text>
            </Pressable>
          </View>
        </View>

        {/* Phần hiển thị và chọn ảnh đại diện */}
        <View style={styles.avatarSection}>
          <Pressable onPress={selectImage}>
            {avatarSource ? (
              <Image style={styles.avatar} source={{uri: avatarSource}} />
            ) : (
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://i.ytimg.com/vi/Sj0NENb2nT4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBk8S6cRMKFRWzWWGT8hOL1e0LO3w',
                }}
              />
            )}
            <Text style={styles.editText}>Edit</Text>
            <View style={styles.editButton} />
          </Pressable>
        </View>

        {/* Phần nhập thông tin cửa hàng */}
        <View style={styles.formSection}>
          {[
            {label: 'Shop Name', state: shopName, setState: setShopName},
            {
              label: 'Description',
              state: shopDescription,
              setState: setShopDescription,
            },
            {label: 'Address', state: shopAddress, setState: setShopAddress},
            {label: 'Phone', state: shopPhone, setState: setShopPhone},
            {label: 'Email', state: shopEmail, setState: setShopEmail},
          ].map((item, index) => (
            <View key={index} style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <View>
                  <Text style={styles.inputLabel}>{item.label}</Text>
                  <TextInput
                    style={styles.inputField}
                    value={item.state}
                    onChangeText={item.setState}
                    maxLength={120}
                    placeholder={`Enter ${item.label.toLowerCase()}`}
                  />
                </View>
                <View style={styles.inputStatus}>
                  <Text>{item.state.length}/120</Text>
                  {/* Nút để xóa nội dung trường thông tin */}
                  <Pressable
                    onPress={() => clearField(item.state, item.setState)}>
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

        {/* Hình ảnh ở cuối trang */}
        <Image
          style={styles.bottomImage}
          source={require('../../../image/ShopSea.png')}
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
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
  },
  saveText: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
  },
  avatarSection: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A29C9C',
  },
  avatar: {
    width: 190,
    height: 190,
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
    borderTopWidth: 3,
    justifyContent: 'center',
    borderBottomWidth: 3,
  },
  inputRow: {
    marginVertical: '3%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  inputField: {
    width: 340,
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
  },
});

export default ShopScreen;
