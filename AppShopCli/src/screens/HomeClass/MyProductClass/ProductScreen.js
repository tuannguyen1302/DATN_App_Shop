import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {SOCKET_URL} from '../../../utils/socketService';

const TAB_ITEMS = [
  {status: 'All'},
  {status: 'Còn hàng'},
  {status: 'Hết hàng'},
  {status: 'Bị ẩn'},
];

export const renderProductItem = (item, navigation, toggleHideProduct) => (
  <Pressable style={styles.productItem}>
    <View style={styles.itemHeader}>
      <FastImage
        style={styles.productImage}
        source={{uri: `${SOCKET_URL}uploads/${item?.product_thumb[0]}`}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{marginLeft: '2%', flex: 1}}>
        <Text style={styles.productName} numberOfLines={1}>
          {item?.product_name}
        </Text>
        <Text style={styles.productPrice}>
          đ {item?.product_price.toLocaleString().replace(/,/g, '.')}
        </Text>
      </View>
    </View>

    <View style={styles.itemDetails}>
      {['boxes', 'list'].map((icon, index) => (
        <View style={styles.icon} key={index}>
          {index === 0 ? (
            <FontAwesome5 name={icon} size={15} color={'#222222'} />
          ) : (
            <Feather name={icon} size={15} color={'#222222'} />
          )}
          <Text style={[styles.tabText, {left: '15%'}]}>
            {index === 0 ? 'Kho hàng' : 'Đã bán'}: {item?.product_quantity}
          </Text>
        </View>
      ))}
    </View>

    <View style={styles.itemActions}>
      <Pressable
        style={styles.actionButton}
        onPress={() => navigation.navigate('UpdateProduct', {item})}>
        <Text style={styles.buttonText}>Sửa</Text>
      </Pressable>
      <Pressable
        style={styles.actionButton}
        onPress={() => toggleHideProduct(item)}>
        <Text style={styles.buttonText}>{item?.isDraft ? 'Hiện' : 'Ẩn'}</Text>
      </Pressable>
    </View>
  </Pressable>
);

const ProductScreen = ({navigation}) => {
  const [status, setStatus] = useState('All');
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  const getHeaders = () => ({
    headers: {
      'x-xclient-id': '654c895786644a5c7ac507df',
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNzAwMjkwOTk2LCJleHAiOjE3MDExNTQ5OTZ9.lzUBd4bBCBd6zUsjp9S5C47ofetyCEZ9_aTEZcpxYJY',
    },
  });

  const toggleHideProduct = product => {
    const action = product?.isDraft ? 'hiện' : 'ẩn';
    const message = `Bạn muốn ${action} sản phẩm "${product?.product_name}"?`;

    Alert.alert('Xác nhận ẩn sản phẩm', message, [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: async () => {
          const endpoint = `${SOCKET_URL}v1/api/product/${
            product?.isDraft ? 'unpublishById' : 'publishById'
          }/${product?._id}`;
          await axios.put(endpoint, {}, getHeaders());
          getApi(
            status === 'All'
              ? 'all'
              : status === 'Còn hàng'
              ? 'con_hang'
              : status === 'Hết hàng'
              ? 'het_hang'
              : 'private',
          );
          ToastAndroid.show(
            `Thay đổi trạng thái ${action} thành công`,
            ToastAndroid.show,
          );
        },
      },
    ]);
  };

  const getApi = async tab => {
    try {
      const res = await axios.get(
        `${SOCKET_URL}v1/api/product/getAllProductByShop/${tab}`,
        getHeaders(),
      );
      setProductList(res.data.message);
      setLoading(false);
    } catch (error) {
      console.log('Call api: ', error.message);
      setLoading(false);
    }
  };

  const sortProducts = () => {
    if (productList.length > 0) {
      const sortedProducts = [...productList].sort((a, b) => {
        const priceA = a.product_price;
        const priceB = b.product_price;
        return sortOrder === '+' ? priceB - priceA : priceA - priceB;
      });
      setProductList(sortedProducts);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getApi('all');
    }, []),
  );

  const onEndReached = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 5);
  };

  const renderTabItem = ({item, index}) => (
    <Pressable
      style={[styles.tabItem, item?.status === status && styles.selectedTab]}
      onPress={() => {
        setStatus(item?.status);
        setLoading(true);
        getApi(
          item?.status === 'All'
            ? 'all'
            : item?.status === 'Còn hàng'
            ? 'con_hang'
            : item?.status === 'Hết hàng'
            ? 'het_hang'
            : 'private',
        );
        flatListRef.current.scrollToIndex({index});
      }}>
      <Text style={styles.tabText}>{item?.status}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          ref={flatListRef}
          data={TAB_ITEMS}
          renderItem={renderTabItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.filter}>
        <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
          <AntDesign name="bars" size={24} color={'black'} />
          <Picker
            selectedValue={sortOrder}
            style={{width: '59%', color: 'green'}}
            onValueChange={itemValue => {
              setSortOrder(itemValue), sortProducts();
            }}>
            <Picker.Item enabled={false} label="Sắp xếp" />
            <Picker.Item label="Tăng dần ➕" value="+" />
            <Picker.Item label="Giảm dần ➖" value="-" />
          </Picker>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SearchScreen')}>
          <AntDesign name="search1" size={24} color={'black'} />
        </Pressable>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : productList.length ? (
        <FlatList
          data={productList?.slice(0, visibleProducts)}
          renderItem={({item}) =>
            renderProductItem(item, navigation, toggleHideProduct)
          }
          keyExtractor={item => item?._id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.imageContainer}>
          <Image
            style={styles.productImage2}
            source={require('../../../../images/NoProduct.png')}
          />
          <Text style={styles.imageText}>Tab không có sản phẩm nào</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    width: 100,
    height: 40,
    marginTop: '2%',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  tabText: {
    color: 'black',
    fontWeight: '500',
  },
  filter: {
    marginTop: '2%',
    height: 40,
    backgroundColor: '#F6F6F6',
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productItem: {
    margin: '2%',
    height: 185,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: 'white',
    padding: '4%',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: '2%',
  },
  productPrice: {
    marginTop: '2%',
    color: 'black',
    fontSize: 18,
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    marginTop: '2%',
    paddingVertical: '2%',
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '2%',
  },
  actionButton: {
    width: '40%',
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '500',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage2: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageText: {
    marginTop: '5%',
    color: 'black',
    fontSize: 18,
  },
});

export default ProductScreen;
