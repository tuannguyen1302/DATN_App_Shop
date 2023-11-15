import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {SOCKET_URL} from '../../utils/socketService';
import axios from 'axios';

const Tab = createMaterialTopTabNavigator();

const getHeaders = () => ({
  headers: {
    'x-xclient-id': '654c895786644a5c7ac507df',
    ahthorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNjk5OTY0MjY3LCJleHAiOjE3MDA4MjgyNjd9.ZKxsuIMf2uBt0vBPt4pkDgWuEEsF3GG91dRMb6DHkwE',
  },
});

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={({route}) => tabNavigatorOptions(route)}>
        <Tab.Screen name="Đơn hàng" component={OrderListScreen} />
        <Tab.Screen name="Đang giao" component={InDeliveryScreen} />
        <Tab.Screen name="Đã giao" component={DeliveredScreen} />
        <Tab.Screen name="Đã hủy" component={CanceledScreen} />
      </Tab.Navigator>
    </View>
  );
};

const tabNavigatorOptions = route => ({
  tabBarStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: '2%',
    marginTop: '14%',
  },
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? 'black' : 'grey'}}>{route.name}</Text>
  ),
});

const OrderListScreen = ({navigation}) => {
  const [array, setArray] = useState([]);
  const getApi = async () => {
    try {
      const res = await axios.get(
        `${SOCKET_URL}v1/api/order/getOrderByIdForShop`,
        getHeaders(),
      );
      setArray(res.data.message.orderRes.user);
    } catch (error) {
      console.log('Call api: ', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={array}
        keyExtractor={item => item.oderId}
        renderItem={({item}) => renderItem(item, navigation)}
      />
      <ImageComponent source={require('../../../images/Order1.png')} />
    </View>
  );
};

const InDeliveryScreen = () => (
  <View style={styles.container}>
    {/* <FlatList
      data={orderData}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => renderItem(item)}
    /> */}
    <ImageComponent source={require('../../../images/Order2.png')} />
  </View>
);

const DeliveredScreen = () => (
  <View style={styles.container}>
    {/* <FlatList
      data={orderData}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => renderItem(item)}
    /> */}
    <ImageComponent source={require('../../../images/Order3.png')} />
  </View>
);

const CanceledScreen = () => (
  <View style={styles.container}>
    {/* <FlatList
      data={orderData}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => renderItem(item)}
    /> */}
    <ImageComponent source={require('../../../images/Order4.png')} />
  </View>
);

const ImageComponent = ({source}) => (
  <Image style={styles.image} source={source} />
);

const renderItem = (orderItem, navigation) => (
  <View style={styles.itemContainer}>
    <Image
      style={styles.productImage}
      source={{uri: `${SOCKET_URL}uploads/${orderItem?.product_thumb[0]}`}}
    />
    <View style={styles.productInfo}>
      <Text style={styles.productName} numberOfLines={1}>
        {orderItem?.product_name}
      </Text>
      <View style={styles.colorInfo}>
        {/* <View style={[styles.colorBadge, {backgroundColor: orderItem.color}]} /> */}
        <Text style={styles.infoText}>
          Màu | Size: {orderItem?.duct_attributes?.size}
        </Text>
      </View>
      <Text style={styles.infoText} numberOfLines={1}>
        Người mua: {orderItem?.user_name}
      </Text>
      <Pressable
        onPress={() => navigation.navigate('OrderHistory', {orderItem})}>
        <Text style={[styles.infoText, styles.underline]}>Xem thêm</Text>
      </Pressable>
    </View>
    <View style={styles.quantityAndStatus}>
      <View style={styles.quantityBadge}>
        <Text style={styles.infoText}>
          {orderItem?.product_attributes?.quantity}
        </Text>
      </View>
      {orderItem?.status == 'PENDING' && (
        <Pressable style={styles.statusBadge}>
          <Text style={[styles.infoText, styles.statusText]}>
            {orderItem?.status}
          </Text>
        </Pressable>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 120,
    marginTop: '2%',
    marginHorizontal: '2%',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    left: '1%',
    width: '50%',
  },
  productName: {
    fontSize: 19,
    margin: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBadge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  infoText: {
    margin: '2%',
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  quantityAndStatus: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  quantityBadge: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  statusBadge: {
    width: 70,
    height: 25,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 10,
  },
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
    bottom: 0,
    alignSelf: 'center',
  },
});

export default OrderScreen;
