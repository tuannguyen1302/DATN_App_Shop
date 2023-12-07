import React, { useEffect } from 'react';
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
import { API_BASE_URL } from '../../config/urls';
import HomeStyle from './styles';
import { Notifications } from 'react-native-notifications';
import { useSelector } from 'react-redux';
import { saveUserData } from '../../redux/actions/user';
import { saveChatData } from '../../redux/actions/chat';
import socketServices from '../../utils/socketService';

const HomeScreen = ({ navigation }) => {
  const userAccount = useSelector(state => state?.user?.userData);

  const handlePress = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      Notifications.postLocalNotification({
        title: 'Thông báo',
        body: 'Bạn có một tin nhắn mới',
        extra: 'data',
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    saveUserData();
    saveChatData();
    socketServices.on('newMessage', () => {
      handlePress();
      saveChatData();
    });
  }, []);

  return (
    <View style={HomeStyle.container}
    >

      <View style={HomeStyle.header}>
        <Image
          style={HomeStyle.avatarShop}
          source={{ uri: `${API_BASE_URL}${userAccount?.avatarShop}` }}
        />
        <Text style={HomeStyle.name}>Hello, {userAccount?.nameShop}!</Text>
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
