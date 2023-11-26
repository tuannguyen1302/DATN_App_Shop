import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from './MyProductClass/ProductScreen';
import {API_BASE_URL, SHOP_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatarShop}
          source={{uri: `${API_BASE_URL}${account?.avatarShop}`}}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>{account?.nameShop}</Text>
          <Text style={styles.shopName}>{account?.des}</Text>
        </View>
        <View style={styles.headerIconsContainer}>
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
        style={styles.btnAdd}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Feather name="plus-square" size={25} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatarShop: {
    width: 60,
    height: 60,
    borderColor: 'green',
    borderWidth: 1,
    resizeMode: 'contain',
    borderRadius: 30,
  },
  headerTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '20%',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  shopName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  btnAdd: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '4%',
    right: '8%',
    backgroundColor: '#222',
  },
  txtAdd: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default MyProduct;
