import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from './MyProductClass/ProductScreen';
import {useNavigation} from '@react-navigation/native';

const MyProduct = () => {
  const navigation = useNavigation();

  // Initial user account information
  const [account, setAccount] = useState({
    id: 1,
    name: 'Trần Thị Tuấn',
    avatar:
      'https://i.ytimg.com/vi/O8e-2JTo7wk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCopE8gdgNPrSPgRLjpE8arOASMeQ',
    nameShop: '❤️ shop yêu thích',
  });

  // Component to display user account information
  const ShopInfo = () => (
    <View style={{right: '10%'}}>
      <Text style={styles.name}>{account.name}</Text>
      <Text style={styles.nameShop}>{account.nameShop}</Text>
    </View>
  );

  // Component with TouchableOpacity to navigate to ShopScreen
  const EditShopButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('ShopScreen')}>
      <AntDesign name="exclamationcircle" size={40} color={'black'} />
    </TouchableOpacity>
  );

  // Component with Pressable to handle add product action
  const AddProductButton = () => (
    <Pressable
      style={styles.btnAdd}
      onPress={() => {
        navigation.navigate('addProduct');
      }}>
      <Feather name="plus-square" size={20} color={'white'} />
      <Text style={styles.txtAdd}>Thêm 1 sản phẩm mới</Text>
    </Pressable>
  );

  // Main rendering part of the MyProduct component
  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        {/* HeaderShop section containing user information, shop information, and edit shop button */}
        <View style={styles.headerShop}>
          <Image style={styles.avatarShop} source={{uri: account.avatar}} />
          <ShopInfo />
          <EditShopButton />
        </View>
      </View>
      {/* ProductScreen component to display user's products */}
      <ProductScreen navigation={navigation} id={account.id} />
      {/* AddProductButton to add a new product */}
      <AddProductButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: '15%',
    marginTop: '3%',
    marginHorizontal: '3%',
  },
  headerShop: {
    height: '80%',
    marginTop: '3%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F8F8F8',
  },
  avatarShop: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  name: {
    color: 'black',
    fontSize: 24,
    fontWeight: '500',
  },
  nameShop: {
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  btnAdd: {
    width: 200,
    height: 45,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '2%',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  txtAdd: {
    color: 'white',
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default MyProduct;
