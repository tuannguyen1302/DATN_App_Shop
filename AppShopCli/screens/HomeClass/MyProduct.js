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
import {useNavigation} from '@react-navigation/native';

const MyProduct = () => {
  const navigation = useNavigation();

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
          <TouchableOpacity>
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

      <ProductScreen navigation={navigation} id={account.id} />

      <Pressable
        style={styles.btnAdd}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Feather name="plus-square" size={20} color={'white'} />
        <Text style={styles.txtAdd}>Thêm sản phẩm mới</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingHorizontal: 10,
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
    backgroundColor: 'rgba(255,255,255,0.3)', // Một màu trắng nhẹ làm sáng hình ảnh
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
    width: '80%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  txtAdd: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default MyProduct;
