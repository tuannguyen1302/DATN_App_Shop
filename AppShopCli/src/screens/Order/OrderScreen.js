import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
import imagePath from '../../constants/imagePath';
import {apiGet, apiPatch} from '../../utils/utils';
import {API_BASE_URL, ORDER_API} from '../../config/urls';

const Tab = createMaterialTopTabNavigator();

const STATUS_TRANSLATIONS = {
  pending: 'Phê duyệt',
  shipped: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
};

const tabNavigatorOptions = route => ({
  tabBarStyle: {
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  tabBarLabel: ({focused}) => (
    <Text style={{color: focused ? 'black' : 'grey', fontWeight: '500'}}>
      {route.name}
    </Text>
  ),
});

const OrderScreen = () => {
  return (
    <View style={OrderScrStyle.container}>
      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          marginHorizontal: '5%',
          marginHorizontal: '5%',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderWidth: 1,
            borderColor: 'green',
            borderRadius: 20,
          }}
          source={imagePath.logo}
        />
        <Text
          style={{
            left: '20%',
            fontSize: 22,
            color: 'black',
            fontWeight: '600',
          }}>
          Order
        </Text>
      </View>
      <Tab.Navigator screenOptions={({route}) => tabNavigatorOptions(route)}>
        <Tab.Screen name="Đơn hàng" component={OrderListScreen} />
        <Tab.Screen name="Đang giao" component={InDeliveryScreen} />
        <Tab.Screen name="Đã giao" component={DeliveredScreen} />
        <Tab.Screen name="Đã hủy" component={CanceledScreen} />
      </Tab.Navigator>
    </View>
  );
};

const fetchOrdersByStatus = async (setArray, text, setLoading) => {
  try {
    setLoading(true);
    const res = await apiGet(`${ORDER_API}/getAllOrderForShop/${text}`);
    setArray(res?.message?.orderRes?.user);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log('Call api: ', error.response.data);
  }
};

const OrderListScreen = ({navigation}) => {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'pending', setLoading);
    }, []),
  );

  return (
    <View style={OrderScrStyle.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={array}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const InDeliveryScreen = ({navigation}) => {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'shipped', setLoading);
    }, []),
  );

  return (
    <View style={OrderScrStyle.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={array}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const DeliveredScreen = ({navigation}) => {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'delivered', setLoading);
    }, []),
  );

  return (
    <View style={OrderScrStyle.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={array}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const CanceledScreen = ({navigation}) => {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'cancelled', setLoading);
    }, []),
  );

  return (
    <View style={OrderScrStyle.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={array}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const patchApi = async (oderId, navigation) => {
  try {
    await apiPatch(`${ORDER_API}/changeStatus`, {
      order_id: oderId,
      status: 'shipped',
    });
    navigation.navigate('OrderScrStyle', {screen: 'Đang giao'});
    ToastAndroid.show('Duyệt thành công', ToastAndroid.show);
  } catch (error) {
    console.log('Patch api: ', error.message);
  }
};

const renderItem = (orderItem, navigation) => (
  <Pressable
    onPress={() => navigation.navigate('OrderHistory', {orderItem})}
    style={OrderScrStyle.itemContainer}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        style={OrderScrStyle.productImage}
        source={{uri: `${API_BASE_URL}uploads/${orderItem?.product_thumb[0]}`}}
      />
      <View style={OrderScrStyle.productInfo}>
        <Text style={OrderScrStyle.productName} numberOfLines={1}>
          {orderItem?.product_name}
        </Text>
        <View style={OrderScrStyle.colorInfo}>
          <Text style={OrderScrStyle.infoText}>
            Màu | Size: {orderItem?.duct_attributes?.size}
          </Text>
        </View>
        <Text style={OrderScrStyle.infoText} numberOfLines={1}>
          Người mua: {orderItem?.user_name}
        </Text>
        <Text style={[OrderScrStyle.infoText, OrderScrStyle.underline]}>
          Xem thêm
        </Text>
      </View>
    </View>
    <View style={OrderScrStyle.quantityAndStatus}>
      <View style={OrderScrStyle.quantityBadge}>
        <Text style={OrderScrStyle.infoText}>
          {orderItem?.product_attributes?.quantity}
        </Text>
      </View>
      {orderItem?.order_status === 'pending' && (
        <Pressable
          style={OrderScrStyle.statusBadge}
          onPress={() => patchApi(orderItem?.oderId, navigation)}>
          <Text style={[OrderScrStyle.infoText, OrderScrStyle.statusText]}>
            {STATUS_TRANSLATIONS[orderItem?.status]}
          </Text>
        </Pressable>
      )}
    </View>
  </Pressable>
);

import {StyleSheet} from 'react-native';

const OrderScrStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemContainer: {
    elevation: 3,
    height: 120,
    padding: '2%',
    marginHorizontal: '3%',
    marginVertical: '2%',
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '55%',
  },
  productName: {
    fontSize: 19,
    margin: '2%',
    color: 'black',
    fontWeight: '600',
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    margin: '2%',
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
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
