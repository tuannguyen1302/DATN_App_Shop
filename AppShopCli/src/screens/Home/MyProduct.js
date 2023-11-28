// MyProduct.js
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from '../Product/ProductScreen';
import {API_BASE_URL, SHOP_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {MyProductStyles} from './styles';

const MyProduct = ({navigation}) => {
  const [account, setAccount] = useState();

  const getApi = async () => {
    try {
      const res = await apiGet(`${SHOP_API}/getShopForShop`);
      setAccount(res?.message);
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={MyProductStyles.container}>
      <View style={MyProductStyles.header}>
        <Image
          style={MyProductStyles.avatarShop}
          source={{uri: `${API_BASE_URL}${account?.avatarShop}`}}
        />
        <View style={MyProductStyles.headerTextContainer}>
          <Text style={MyProductStyles.name}>{account?.nameShop}</Text>
          <Text style={MyProductStyles.shopName}>{account?.des}</Text>
        </View>
        <View style={MyProductStyles.headerIconsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageScreen')}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color={'#333'}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={30} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ProductScreen navigation={navigation} />

      <TouchableOpacity
        style={MyProductStyles.btnAdd}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Feather name="plus-square" size={25} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default MyProduct;
