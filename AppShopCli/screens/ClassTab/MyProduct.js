import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from './ScreenTab/ProductScreen';

const MyProduct = ({navigation}) => {
  const [account, setAccount] = useState({
    id: 1,
    name: 'Trần Thị Tuấn',
    avatar:
      'https://i.ytimg.com/vi/O8e-2JTo7wk/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCopE8gdgNPrSPgRLjpE8arOASMeQ',
    nameShop: '❤️ shop yêu thích ',
  });

  return (
    <View style={styles.container}>
      {/* Logout, Shop */}
      <View style={styles.header}>
        <View style={styles.headerShop}>
          <Image style={styles.avatarShop} source={{uri: account.avatar}} />
          <View style={{right: '10%'}}>
            <Text style={styles.name}>{account.name}</Text>
            <Text style={styles.nameShop}>{account.nameShop}</Text>
          </View>
          <TouchableOpacity>
            <AntDesign name="exclamationcircle" size={40} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Tab Product */}
      <ProductScreen navigation={navigation} id={account.id} />
      {/* Button Add Product */}
      <Pressable style={styles.btnAdd}>
        <Feather name="plus-square" size={20} color={'white'} />
        <Text style={styles.txtAdd}>Thêm 1 sản phẩm mới</Text>
      </Pressable>
    </View>
  );
};

export default MyProduct;

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
    width: '20%',
    height: '80%',
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
    left: '10%',
    fontWeight: '600',
  },
});
