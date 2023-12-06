import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import imagePath from '../../constants/imagePath';
import {useSelector} from 'react-redux';
import {API_BASE_URL} from '../../config/urls';
import {saveOrderData, updateOrderData} from '../../redux/actions/order';

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
  useEffect(() => {
    saveOrderData('pending');
    saveOrderData('shipped');
    saveOrderData('delivered');
    saveOrderData('cancelled');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={imagePath.logo} />
          <Text style={styles.titleText}>Order</Text>
        </View>
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

const OrderListScreen = ({navigation}) => {
  const data = useSelector(state => state?.order?.orderData?.pending);

  return (
    <View style={styles.container}>
      {!data ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const InDeliveryScreen = ({navigation}) => {
  const data = useSelector(state => state?.order?.orderData?.shipped);

  return (
    <View style={styles.container}>
      {!data ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const DeliveredScreen = ({navigation}) => {
  const data = useSelector(state => state?.order?.orderData?.delivered);

  return (
    <View style={styles.container}>
      {!data ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const CanceledScreen = ({navigation}) => {
  const data = useSelector(state => state?.order?.orderData?.cancelled);

  return (
    <View style={styles.container}>
      {!data ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?.oderId}
          renderItem={({item}) => renderItem(item, navigation)}
        />
      )}
    </View>
  );
};

const patchApi = async (oderId, navigation) => {
  try {
    await updateOrderData({
      value: 'shipped',
      oderId,
    });
    navigation.navigate('Order', {screen: 'Đang giao'});
    ToastAndroid.show('Duyệt thành công', ToastAndroid.show);
  } catch (error) {
    throw error;
  }
};

const renderItem = (orderItem, navigation) => (
  <Pressable
    onPress={() => navigation.navigate('OrderHistory', {orderItem})}
    style={styles.itemContainer}>
    <View style={styles.productContainer}>
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
            Màu: {orderItem?.product_attributes?.color} | Size:{' '}
            {orderItem?.product_attributes?.size}
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
      {orderItem?.status === 'pending' && (
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
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    marginVertical: 15,
    marginHorizontal: '5%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
  },
  titleText: {
    left: '20%',
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default OrderScreen;
