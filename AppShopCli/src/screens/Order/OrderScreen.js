import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import imagePath from '../../constants/imagePath';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../config/urls';
import { saveOrderData, updateOrderData } from '../../redux/actions/order';
import { ScrollView } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const STATUS_TRANSLATIONS = {
  pending: 'Phê duyệt',
  shipped: 'Đang vận chuyển',
  delivered: 'xác nhận',
  cancelled: 'Đã hủy',
};

const tabNavigatorOptions = route => ({
  tabBarStyle: {
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  tabBarLabel: ({ focused }) => (
    <Text style={{ color: focused ? 'black' : 'grey', fontWeight: '500' }}>
      {route.name}
    </Text>
  ),
});

const OrderScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={imagePath.logo} />
          <Text style={styles.titleText}>Order</Text>
        </View>
      </View>
      <Tab.Navigator screenOptions={({ route }) => tabNavigatorOptions(route)}>
        <Tab.Screen name="Đơn hàng" component={OrderListScreen} />
        <Tab.Screen name="Đang giao" component={InDeliveryScreen} />
        <Tab.Screen name="Đã giao" component={DeliveredScreen} />
        <Tab.Screen name="Đã hủy" component={CanceledScreen} />
      </Tab.Navigator>
    </View>
  );
};

const load = async (isCheck, text) => {
  try {
    isCheck(await saveOrderData(text));
  } catch (error) {
    throw error;
  }
};

const OrderListScreen = ({ navigation }) => {
  const data = useSelector(state => state?.order?.orderData?.pending);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      load(setLoading, 'pending');
    }, []),
  );

  const reversedData = data && data.length > 0 ? [...data].reverse() : [];

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : data.length != 0 ? (
        <FlatList
          data={reversedData}
          keyExtractor={item => item?.oderId}
          renderItem={({ item }) => renderItem(item, navigation)}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'pending')}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'pending')}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.container, { alignItems: 'center' }]}>
          <Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={imagePath.order1}
          />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Chưa có đơn hàng nào cần phê duyệt
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const InDeliveryScreen = ({ navigation }) => {
  const data = useSelector(state => state?.order?.orderData?.shipped);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      load(setLoading, 'shipped');
    }, []),
  );

  const reversedData = data && data.length > 0 ? [...data].reverse() : [];

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'black'} />
      ) : data.length != 0 ? (
        <FlatList
          data={reversedData}
          keyExtractor={item => item?.oderId}
          renderItem={({ item }) => renderItem(item, navigation)}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'shipped')}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'shipped')}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.container, { alignItems: 'center' }]}>
          <Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={imagePath.order2}
          />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Chưa có đơn hàng nào đang giao
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const DeliveredScreen = ({ navigation }) => {
  const data = useSelector(state => state?.order?.orderData?.delivered);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      load(setLoading, 'delivered');
    }, []),
  );

  const reversedData = data && data.length > 0 ? [...data].reverse() : [];

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : data.length != 0 ? (
        <FlatList
          data={reversedData}
          keyExtractor={item => item?.oderId}
          renderItem={({ item }) => renderItem(item, navigation)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'delivered')}
            />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'delivered')}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.container, { alignItems: 'center' }]}>
          <Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={imagePath.order3}
          />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Chưa có đơn hàng nào đã giao
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const CanceledScreen = ({ navigation }) => {
  const data = useSelector(state => state?.order?.orderData?.cancelled);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      load(setLoading, 'cancelled');
    }, []),
  );

  const reversedData = data && data.length > 0 ? [...data].reverse() : [];

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'gray'} />
      ) : data.length != 0 ? (
        <FlatList
          data={reversedData}
          keyExtractor={item => item?.oderId}
          renderItem={({ item }) => renderItem(item, navigation)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'cancelled')}
            />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => load(setRefreshing, 'cancelled')}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.container, { alignItems: 'center' }]}>
          <Image
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
            source={imagePath.order4}
          />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            Chưa có đơn hàng được hủy ✨
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const patchApi = (oderId, status, navigation) => {
  Alert.alert(
    `Thông báo`,
    `Bạn có muốn ${status === 'shipped' ? 'phê duyệt' : 'xác nhận'
    } đơn hàng này!`,
    [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: async () => {
          try {
            const check = await updateOrderData({
              value: status,
              oderId,
            });
            if (check) {
              navigation.navigate('Order', {
                screen: status === 'shipped' ? 'Đang giao' : 'Đã giao',
              });
              ToastAndroid.show(
                'Xác nhận đơn hàng thành công',
                ToastAndroid.show,
              );
            }
          } catch (error) {
            throw error;
          }
        },
      },
    ],
  );
};

const renderItem = (orderItem, navigation) => (
  <Pressable
    onPress={() => navigation.navigate('OrderHistory', { orderItem })}
    style={styles.itemContainer}>
    <View style={styles.productContainer}>
      <Image
        style={styles.productImage}
        source={{ uri: `${API_BASE_URL}uploads/${orderItem?.product_thumb[0]}` }}
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
          onPress={() => patchApi(orderItem?.oderId, 'shipped', navigation)}>
          <Text style={[styles.infoText, styles.statusText]}>
            {STATUS_TRANSLATIONS['pending']}
          </Text>
        </Pressable>
      )}
      {orderItem?.status === 'shipped' && (
        <Pressable
          style={[styles.statusBadge, { backgroundColor: 'green' }]}
          onPress={() => patchApi(orderItem?.oderId, 'delivered', navigation)}>
          <Text style={[styles.infoText, styles.statusText]}>
            {STATUS_TRANSLATIONS['delivered']}
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
    alignItems: 'center',
    marginHorizontal: '3%',
    marginVertical: '2%',
    borderRadius: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
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