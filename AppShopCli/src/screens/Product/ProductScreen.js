import React, {useState, useRef, useCallback} from 'react';
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
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import imagePath from '../../constants/imagePath';
import {apiGet, apiPut} from '../../utils/utils';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';

const TAB_ITEMS = [
  {status: 'All'},
  {status: 'Còn hàng'},
  {status: 'Hết hàng'},
  {status: 'Bị ẩn'},
];

export const formatCurrency = value => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

export const renderProductItem = (item, navigation, toggleHideProduct) => (
  <Pressable style={styles.productItem}>
    <TouchableOpacity onPress={() => toggleHideProduct(item)}>
      <FastImage
        style={styles.productImage}
        source={{uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}`}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{position: 'absolute', right: 0}}>
        <Octicons
          name={item?.isDraft ? 'eye-closed' : 'eye'}
          size={20}
          color={'black'}
        />
      </View>
    </TouchableOpacity>

    <View style={{flex: 1}}>
      <Text style={styles.productName} numberOfLines={1}>
        {item?.product_name}
      </Text>
      <Text style={styles.txt}>
        Trạng thái:{' '}
        <Text style={{color: item?.product_quantity ? 'green' : 'red'}}>
          {item?.product_quantity ? 'còn hàng' : 'hết hàng'}
        </Text>
      </Text>
      <Text style={styles.txt}>
        Kho: {item?.product_quantity} | Bán: {item?.product_sold}
      </Text>
    </View>
    <View style={styles.itemActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('UpdateProduct', {item})}>
        <FontAwesome name="edit" size={20} color={'black'} />
      </TouchableOpacity>
      <Text style={[styles.txt, {color: 'red', fontWeight: '700'}]}>
        {formatCurrency(item?.product_price)}
      </Text>
    </View>
  </Pressable>
);

const ProductScreen = ({navigation}) => {
  const [status, setStatus] = useState('All');
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  // const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef();

  const toggleHideProduct = async product => {
    const action = product?.isDraft ? 'hiện' : 'ẩn';
    const message = `Bạn muốn ${action} sản phẩm "${product?.product_name}"?`;

    Alert.alert(`Cảnh báo`, message, [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: async () => {
          const endpoint = `${PRODUCT_API}${
            product?.isDraft ? '/unpublishById' : '/publishById'
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

  // const sortProducts = sort => {
  //   setSortOrder(sort);
  //   if (productList.length > 0) {
  //     const sortedProducts = [...productList].sort((a, b) => {
  //       const priceA = a.product_price;
  //       const priceB = b.product_price;
  //       return sort === '+' ? priceA - priceB : priceB - priceA;
  //     });
  //     setProductList(sortedProducts);
  //   }
  // };

  useFocusEffect(
    useCallback(() => {
      getTabStatus();
    }, [status]),
  );

  const onEndReached = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 5);
  };

  const renderTabItem = ({item, index}) => (
    <Pressable
      style={[
        styles.tabItem,
        item?.status === status && {backgroundColor: '#EEEEEE'},
      ]}
      onPress={() => {
        setLoading(true);
        setStatus(item?.status);
        flatListRef.current.scrollToIndex({index});
      }}>
      <Text
        style={[styles.tabText, item?.status === status && {color: 'black'}]}>
        {item?.status}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.filter}>
          <Pressable
            style={{
              flex: 0.95,
              height: 45,
              marginVertical: 15,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: '#EEEEEE',
            }}
            onPress={() => navigation.navigate('SearchScreen')}>
            <Text style={{left: 20}}>Search</Text>
            <AntDesign
              style={{right: 20}}
              name="search1"
              size={24}
              color={'gray'}
            />
          </Pressable>
          <Pressable style={styles.button}>
            <Ionicons name="filter-sharp" size={24} color={'black'} />
          </Pressable>
        </View>

        <FlatList
          scrollEnabled={false}
          ref={flatListRef}
          data={TAB_ITEMS}
          renderItem={renderTabItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : productList.length ? (
          <FlatList
            scrollEnabled={false}
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
            <Image style={styles.productImage2} source={imagePath.noProduct} />
            <Text style={styles.imageText}>Tab không có sản phẩm nào</Text>
          </View>
        )}
      </ScrollView>
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
    height: 35,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: '10%',
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    justifyContent: 'center',
  },
  tabText: {
    color: 'gray',
    fontWeight: '700',
  },
  filter: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
    marginRight: '5%',
  },
  productItem: {
    padding: '2%',
    elevation: 3,
    height: 120,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'gray',
    marginBottom: '2%',
    marginHorizontal: '4%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: '2%',
  },
  txt: {
    color: 'black',
    marginTop: '2%',
    marginLeft: '2%',
    fontSize: 15,
  },
  itemActions: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#E0EEEE',
    justifyContent: 'center',
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
