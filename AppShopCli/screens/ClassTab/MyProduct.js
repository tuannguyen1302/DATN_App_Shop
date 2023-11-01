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
import ProductScreen from './ScreenTab/ProductScreen';
import {useNavigation} from '@react-navigation/native';

const MyProduct = () => {
  const navigation = useNavigation();

  // Sử dụng hook state để quản lý thông tin tài khoản
  const [account, setAccount] = useState({
    id: 1,
    name: 'Trần Thị Tuấn',
    avatar:
      'https://i.ytimg.com/vi/O8e-2JTo7wk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCopE8gdgNPrSPgRLjpE8arOASMeQ',
    nameShop: '❤️ shop yêu thích',
  });

  // Component ShopInfo để hiển thị thông tin tài khoản
  const ShopInfo = () => (
    <View style={{right: '10%'}}>
      <Text style={styles.name}>{account.name}</Text>
      <Text style={styles.nameShop}>{account.nameShop}</Text>
    </View>
  );

  // Component EditShopButton với TouchableOpacity để chuyển hướng đến ShopScreen
  const EditShopButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('ShopScreen')}>
      <AntDesign name="exclamationcircle" size={40} color={'black'} />
    </TouchableOpacity>
  );

  // Component AddProductButton với Pressable để xử lý hành động thêm sản phẩm
  const AddProductButton = () => (
    <Pressable style={styles.btnAdd}>
      <Feather name="plus-square" size={20} color={'white'} />
      <Text style={styles.txtAdd}>Thêm 1 sản phẩm mới</Text>
    </Pressable>
  );

  // Phần render chính của component MyProduct
  return (
    <View style={styles.container}>
      {/* Phần Header */}
      <View style={styles.header}>
        {/* Phần HeaderShop chứa thông tin người dùng, thông tin cửa hàng và nút chỉnh sửa cửa hàng */}
        <View style={styles.headerShop}>
          <Image style={styles.avatarShop} source={{uri: account.avatar}} />
          <ShopInfo />
          <EditShopButton />
        </View>
      </View>
      {/* Component ProductScreen để hiển thị sản phẩm của người dùng */}
      <ProductScreen navigation={navigation} id={account.id} />
      {/* Nút AddProductButton để thêm sản phẩm mới */}
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
