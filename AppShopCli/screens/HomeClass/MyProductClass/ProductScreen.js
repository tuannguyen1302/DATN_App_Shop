import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import {SOCKET_URL} from '../../utils/socketService';

export const TAB_ITEMS = [
  {status: 'All'},
  {status: 'Còn hàng'},
  {status: 'Hết hàng'},
  {status: 'Bị ẩn'},
];

const ProductScreen = ({navigation}) => {
  const [status, setStatus] = useState('All');
  const [productList, setProductList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(5);

  const getHeaders = () => ({
    headers: {
      'x-xclient-id': '654c895786644a5c7ac507df',
      ahthorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNjk5OTY0MjY3LCJleHAiOjE3MDA4MjgyNjd9.ZKxsuIMf2uBt0vBPt4pkDgWuEEsF3GG91dRMb6DHkwE',
    },
  });

  const toggleHideProduct = product => {
    Alert.alert(
      'Xác nhận ẩn sản phẩm',
      `Bạn muốn ${product.isDraft ? 'hiện' : 'ẩn'} sản phẩm "${
        product.product_name
      }"?`,
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Xác nhận',
          onPress: () => {
            setIsDraft(product._id, product.isDraft);
          },
        },
      ],
    );
  };

  const setIsDraft = async (id, isDraft) => {
    try {
      const endpoint = isDraft
        ? `${SOCKET_URL}v1/api/product/unpublishById/${id}`
        : `${SOCKET_URL}v1/api/product/publishById/${id}`;

      await axios.put(endpoint, {}, getHeaders());

      getApi();
    } catch (error) {
      console.error('Error in setIsDraft:', error.message);
    }
  };

  const getApi = async () => {
    try {
      const res = await axios.get(
        `${SOCKET_URL}v1/api/product/getAllProductByShop`,
        getHeaders(),
      );
      setProductList(res.data.message.allProduct);
    } catch (error) {
      console.log('Call api: ', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const onEndReached = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 5);
  };

  const renderTabItem = ({item}) => (
    <Pressable
      style={[styles.tabItem, item.status === status && styles.selectedTab]}
      onPress={() => setStatus(item.status)}>
      <Text style={styles.tabText}>{item.status}</Text>
    </Pressable>
  );

  const renderProductItem = ({item}) => (
    <View style={styles.productItem}>
      <View style={styles.itemHeader}>
        <FastImage
          style={styles.productImage}
          source={{
            uri: `${SOCKET_URL}uploads/${item.product_thumb[0]}`,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{marginLeft: '2%', flex: 1}}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.product_name}
          </Text>
          <Text style={styles.productPrice}>
            đ {item.product_price.toLocaleString().replace(/,/g, '.')}
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
              {index === 0 ? 'Kho hàng' : 'Đã bán'}: {item.product_quantity}
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
          <Text style={styles.buttonText}>{item.isDraft ? 'Hiện' : 'Ẩn'}</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <FlatList
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
            selectedValue={selectedValue}
            style={{width: '59%', color: 'green'}}
            onValueChange={itemValue => setSelectedValue(itemValue)}>
            <Picker.Item enabled={false} label="Sắp xếp" />
            <Picker.Item label="Tăng dần ➕" value="+" />
            <Picker.Item label="Giảm dần ➖" value="-" />
          </Picker>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SearchScreen')}>
          <AntDesign name="search1" size={24} color={'black'} />
        </Pressable>
      </View>

      <FlatList
        data={productList.slice(0, visibleProducts)}
        renderItem={renderProductItem}
        keyExtractor={item => item._id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
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
});

export default ProductScreen;
