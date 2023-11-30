import React, {useEffect, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from '../Product/ProductScreen';
import {API_BASE_URL, SHOP_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import HomeStyle from './styles';
import socketServices from '../../utils/socketService';
import {Notifications} from 'react-native-notifications';

const HomeScreen = ({navigation}) => {
  const [account, setAccount] = useState();

  const handlePress = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      Notifications.postLocalNotification({
        title: 'Thông báo',
        body: 'Đây là một thông báo mẫu',
        extra: 'data',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getApi = async () => {
    try {
      const res = await apiGet(`${SHOP_API}/getShopForShop`);
      setAccount(res?.message);
      socketServices.emit('new-user-add', res?.message?._id);
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.header}>
        <Image
          style={HomeStyle.avatarShop}
          source={{uri: `${API_BASE_URL}${account?.avatarShop}`}}
        />
        <Text style={HomeStyle.name}>Hello, {account?.nameShop}!</Text>
        <TouchableOpacity
          style={HomeStyle.button}
          onPress={() => navigation.navigate('NotifiScreen')}>
          <Ionicons name="notifications-outline" size={30} color="#333" />
        </TouchableOpacity>
      </View>

      <ProductScreen navigation={navigation} />

      <TouchableOpacity
        style={HomeStyle.btnAdd}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Feather name="plus-square" size={25} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
