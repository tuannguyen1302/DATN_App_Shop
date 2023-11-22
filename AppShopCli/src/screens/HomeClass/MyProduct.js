import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from './MyProductClass/ProductScreen';

const MyProduct = ({navigation}) => {
  const account = {
    id: 1,
    name: 'Shop thời trang',
    avatar:
      'https://th.bing.com/th?id=ORMS.730f1690c9e478c37a9dace89225f259&pid=Wdp&w=300&h=156&qlt=90&c=1&rs=1&dpr=1&p=0',
    nameShop: '❤️ shop yêu thích',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={[styles.avatarShop, styles.brightenAvatar]}
          source={{uri: account.avatar}}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name} selectable>
            {account.name}
          </Text>
          <Text style={styles.shopName}>{account.nameShop}</Text>
        </View>
        <View style={styles.headerIconsContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageScreen')}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color={'#333333'}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={30} color="#333333" />
          </TouchableOpacity>
        </View>
      </View>

      <ProductScreen navigation={navigation} />

      <Pressable
        style={styles.btnAdd}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Feather name="plus-square" size={25} color={'white'} />
        {/* <Text style={styles.txtAdd}>Thêm sản phẩm mới</Text> */}
      </Pressable>
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
    resizeMode: 'cover',
    borderRadius: 30,
  },
  brightenAvatar: {
    backgroundColor: 'rgba(255,255,255,0.3)',
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
    color: '#333333',
  },
  shopName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#757575',
  },
  btnAdd: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '4%',
    right: '8%',
    backgroundColor: '#19B9EC',
  },
  txtAdd: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default MyProduct;
