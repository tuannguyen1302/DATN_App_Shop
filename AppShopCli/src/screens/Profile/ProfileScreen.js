import React from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import imagePath from '../../constants/imagePath';
import {apiDelete, clearAllItem} from '../../utils/utils';
import ProfileStyles from './styles';
import {SIGNOUT_API} from '../../config/urls';
import socketServices from '../../utils/socketService';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileSceen = ({navigation}) => {
  const logout = async () => {
    await apiDelete(SIGNOUT_API);
    clearAllItem();
    socketServices.emit('logout');
    navigation.replace('Login2');
  };

  return (
    <ScrollView style={ProfileStyles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '5%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 20,
            }}
            source={imagePath.logo}
          />
          <Text
            style={{
              left: '20%',
              fontSize: 22,
              color: 'black',
              fontWeight: '600',
            }}>
            Order
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEEEEE',
            borderRadius: 15,
          }}>
          <Ionicons name="settings-sharp" size={30} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={ProfileStyles.content}>
        <Text style={ProfileStyles.headerText}>Quản lý</Text>
        <Pressable
          style={ProfileStyles.buttonView}
          onPress={() => navigation.navigate('ShopScreen')}>
          <View style={ProfileStyles.rowButton}>
            <View style={ProfileStyles.iconTextContainer}>
              <Entypo name="shop" size={windowWidth * 0.08} color={'#333333'} />
              <Text style={ProfileStyles.text}>Cửa hàng</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={ProfileStyles.buttonView}
          onPress={() => navigation.navigate('Discount')}>
          <View style={ProfileStyles.rowButton}>
            <View style={ProfileStyles.iconTextContainer}>
              <AntDesign
                name="gift"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={ProfileStyles.text}>Ưu đãi</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text
          style={[ProfileStyles.headerText, {marginTop: windowHeight * 0.02}]}>
          Thông tin
        </Text>
        <Pressable
          style={ProfileStyles.buttonView}
          onPress={() => navigation.navigate('StatisticalScreen')}>
          <View style={ProfileStyles.rowButton}>
            <View style={ProfileStyles.iconTextContainer}>
              <AntDesign
                name="barchart"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={ProfileStyles.text}>Thống kê</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={ProfileStyles.buttonView}
          onPress={() => navigation.navigate('InventoryScreen')}>
          <View style={ProfileStyles.rowButton}>
            <View style={ProfileStyles.iconTextContainer}>
              <MaterialIcons
                name="warehouse"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={ProfileStyles.text}>Tồn kho</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text
          style={[ProfileStyles.headerText, {marginTop: windowHeight * 0.02}]}>
          Khác
        </Text>
        <Pressable style={ProfileStyles.buttonView} onPress={logout}>
          <View style={ProfileStyles.rowButton}>
            <View style={ProfileStyles.iconTextContainer}>
              <MaterialIcons
                name="logout"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={ProfileStyles.text}>Đăng xuất</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileSceen;
