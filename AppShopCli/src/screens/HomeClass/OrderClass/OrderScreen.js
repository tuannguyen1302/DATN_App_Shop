import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useFocusEffect} from '@react-navigation/native';
import imagePath from '../../../constatns/imagePath';
import {apiGet, apiPatch} from '../../../utils/utilus';
import {API_BASE_URL, ORDER_API} from '../../../config/urls';

const Tab = createMaterialTopTabNavigator();

const STATUS_TRANSLATIONS = {
  pending: 'Phê duyệt',
  shipped: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
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

const fetchOrdersByStatus = async (setArray, text) => {
  try {
    const res = await apiGet(`${ORDER_API}/getAllOrderForShop/${text}`);
    setArray(res?.message?.orderRes?.user);
  } catch (error) {
    console.log('Call api: ', error.response.data);
  }
};

const ImageComponent = ({source}) => (
  <Image style={styles.image} source={source} />
);

const OrderListScreen = ({navigation}) => {
  const [array, setArray] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'pending');
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={array}
        keyExtractor={item => item?.oderId}
        renderItem={({item}) => renderItem(item, navigation)}
      />
      <ImageComponent source={imagePath.order1} />
    </View>
  );
};

const InDeliveryScreen = ({navigation}) => {
  const [array, setArray] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'shipped');
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={array}
        keyExtractor={item => item?.oderId}
        renderItem={({item}) => renderItem(item, navigation)}
      />
      <ImageComponent source={imagePath.order2} />
    </View>
  );
};

const DeliveredScreen = ({navigation}) => {
  const [array, setArray] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'delivered');
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={array}
        keyExtractor={item => item?.oderId}
        renderItem={({item}) => renderItem(item, navigation)}
      />
      <ImageComponent source={imagePath.order3} />
    </View>
  );
};

const CanceledScreen = ({navigation}) => {
  const [array, setArray] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchOrdersByStatus(setArray, 'cancelled');
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={array}
        keyExtractor={item => item?.oderId}
        renderItem={({item}) => renderItem(item, navigation)}
      />
      <ImageComponent source={imagePath.order4} />
    </View>
  );
};

const patchApi = async (oderId, navigation) => {
  try {
    await apiPatch(`${ORDER_API}/changeStatus`, {
      order_id: oderId,
      status: 'shipped',
    });
    navigation.navigate('OrderScreen', {screen: 'Đang giao'});
    ToastAndroid.show('Duyệt thành công', ToastAndroid.show);
  } catch (error) {
    console.log('Patch api: ', error.message);
  }
};

const renderItem = (orderItem, navigation) => (
  <Pressable
    onPress={() => navigation.navigate('OrderHistory', {orderItem})}
    style={styles.itemContainer}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        style={styles.productImage}
        source={{uri: `${API_BASE_URL}uploads/${orderItem?.product_thumb[0]}`}}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {orderItem?.product_name}
        </Text>
        <View style={styles.colorInfo}>
          <Text style={styles.infoText}>
            Màu | Size: {orderItem?.duct_attributes?.size}
          </Text>
        </View>
        <Text style={styles.infoText} numberOfLines={1}>
          Người mua: {orderItem?.user_name}
        </Text>
        <Text style={[styles.infoText, styles.underline]}>Xem thêm</Text>
      </View>
    </View>
    <View style={styles.quantityAndStatus}>
      <View style={styles.quantityBadge}>
        <Text style={styles.infoText}>
          {orderItem?.product_attributes?.quantity}
        </Text>
      </View>
      {orderItem?.order_status === 'pending' && (
        <Pressable
          style={styles.statusBadge}
          onPress={() => patchApi(orderItem?.oderId, navigation)}>
          <Text style={[styles.infoText, styles.statusText]}>
            {STATUS_TRANSLATIONS[orderItem?.status]}
          </Text>
        </Pressable>
      )}
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    height: 120,
    marginTop: '2%',
    padding: '2%',
    marginHorizontal: '2%',
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
    fontWeight: 'bold',
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
