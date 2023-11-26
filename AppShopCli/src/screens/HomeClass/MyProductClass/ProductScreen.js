import React, { useState, useRef, useCallback } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import imagePath from '../../../constants/imagePath';
import { apiGet, apiPut } from '../../../utils/utils';
import { API_BASE_URL, PRODUCT_API } from '../../../config/urls';

const TAB_ITEMS = [
  { status: 'All' },
  { status: 'Còn hàng' },
  { status: 'Hết hàng' },
  { status: 'Bị ẩn' },
];

export const renderProductItem = (item, navigation, toggleHideProduct) => (
  <Pressable style={styles.productItem}>
    <View style={styles.itemHeader}>
      <FastImage
        style={styles.productImage}
        source={{ uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}` }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{ marginLeft: '2%', flex: 1 }}>
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
          <Text style={[styles.tabText, { left: '15%' }]}>
            {index === 0 ? 'Kho hàng' : 'Đã bán'}:{' '}
            {index === 0 ? item?.product_quantity : 0}
          </Text>
        </View>
      ))}
    </View>

    <View style={styles.itemActions}>
      <Pressable
        style={styles.actionButton}
        onPress={() => navigation.navigate('UpdateProduct', { item })}>
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

const ProductScreen = ({ navigation }) => {
  const [status, setStatus] = useState('All');
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  const toggleHideProduct = async product => {
    const action = product?.isDraft ? 'hiện' : 'ẩn';
    const message = `Bạn muốn ${action} sản phẩm "${product?.product_name}"?`;

    Alert.alert(`Bạn muốn ${action} sản phẩm`, message, [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: async () => {
          const endpoint = `${PRODUCT_API}${product?.isDraft ? '/unpublishById' : '/publishById'
            }/${product?._id}`;
          await apiPut(endpoint);
          getTabStatus();
          ToastAndroid.show(
            `Thay đổi trạng thái ${action} thành công`,
            ToastAndroid.show,
          );
        },
      },
    ]);
  };

  const getTabStatus = () => {
    switch (status) {
      case 'All':
        return getApi('all');
      case 'Còn hàng':
        return getApi('con_hang');
      case 'Hết hàng':
        return getApi('het_hang');
      case 'Bị ẩn':
        return getApi('private');
    }
  };

  const getApi = async tab => {
    try {
      const res = await apiGet(`${PRODUCT_API}/getAllProductByShop/${tab}`);
      setLoading(false);
      setProductList(res?.message);
    } catch (error) {
      setLoading(false);
      console.log('Call api: ', error.response.data);
    }
  };

  const sortProducts = sort => {
    setSortOrder(sort);
    if (productList.length > 0) {
      const sortedProducts = [...productList].sort((a, b) => {
        const priceA = a.product_price;
        const priceB = b.product_price;
        return sort === '+' ? priceA - priceB : priceB - priceA;
      });
      setProductList(sortedProducts);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getTabStatus();
    }, [status]),
  );

  const onEndReached = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 5);
  };

  const renderTabItem = ({ item, index }) => (
    <Pressable
      style={[styles.tabItem, item?.status === status && styles.selectedTab]}
      onPress={() => {
        setLoading(true);
        setStatus(item?.status);
        flatListRef.current.scrollToIndex({ index });
      }}>
      <Text style={styles.tabText}>{item?.status}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="bars" size={24} color={'black'} />
          <Picker
            selectedValue={sortOrder}
            style={{ width: '58%', height: 40, color: 'green' }}
            onValueChange={itemValue => {
              sortProducts(itemValue);
            }}>
            <Picker.Item label="Sắp xếp" value="" />
            <Picker.Item label="Tăng dần" value="+" />
            <Picker.Item label="Giảm dần" value="-" />
          </Picker>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('SearchScreen')}>
          <AntDesign name="search1" size={24} color={'black'} />
        </Pressable>
      </View>
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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : productList.length ? (
        <FlatList
          data={productList?.slice(0, visibleProducts)}
          renderItem={({ item }) =>
            renderProductItem(item, navigation, toggleHideProduct)
          }
          keyExtractor={item => item?._id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.imageContainer}>
          <Image style={styles.productImage2} source={imagePath.noProduct} />
          <Text style={styles.imageText}>Tab không có sản phẩm nào</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabItem: {
    width: 95,
    height: 40,
    marginTop: '2%',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderWidth: 0.5,
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedTab: {
    height: 45,
    borderBottomWidth: 3,
    borderBottomColor: '#536EFF',
  },
  tabText: {
    color: 'black',
    fontWeight: '500',
  },
  filter: {
    marginTop: '2%',
    height: 40,
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productItem: {
    margin: '2%',
    height: 185,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    elevation: 7,
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
    color: 'red',
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
    borderColor: 'gray',
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
