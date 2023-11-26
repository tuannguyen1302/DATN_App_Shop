import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {API_BASE_URL} from '../../../config/urls';

const statusTranslations = {
  pending: 'Phê duyệt',
  confirmed: 'Giao hàng',
  shipped: 'Đang vận chuyển',
  cancelled: 'Đã hủy',
  delivered: 'Đã giao hàng',
};

const OrderHistory = ({route}) => {
  const navigation = useNavigation();
  const {orderItem} = route.params;

  const handleApproval = () => {
    /* Xử lý khi nhấn nút Duyệt Đơn */
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={'white'} />
        </Pressable>
        <Text style={styles.titleText}>Thông tin đơn hàng</Text>
        <View style={{width: 30}}></View>
      </View>

      <Image
        style={styles.avatar}
        source={{uri: `${API_BASE_URL}uploads/${orderItem?.product_thumb[0]}`}}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.infoRow}>
            <MaterialIcons name="person" size={25} color={'black'} />
            <Text style={styles.info}>{orderItem?.user_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={25} color={'black'} />
            <Text style={styles.info}>{orderItem?.phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={25} color={'black'} />
            <Text style={styles.info}>{orderItem?.order_shipping.City}</Text>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.infoRow}>
            <MaterialIcons name="shopping-cart" size={25} color={'black'} />
            <Text style={styles.info}>{orderItem?.product_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="local-mall" size={25} color={'black'} />
            <Text style={styles.info}>
              Số lượng: {orderItem?.product_attributes?.quantity}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="color-lens" size={25} color={'black'} />
            <Text style={styles.info}>
              Màu: {orderItem?.product_attributes?.color} | Size:{' '}
              {orderItem?.product_attributes?.size}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="attach-money" size={25} color={'black'} />
            <Text style={styles.info}>
              Giá: {orderItem?.order_checkout?.totalPrice}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="local-shipping" size={25} color={'black'} />
            <Text style={styles.info}>
              Ship: {orderItem?.order_checkout?.feeShip}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="local-offer" size={25} color={'black'} />
            <Text style={styles.info}>
              Giảm giá: {orderItem?.order_checkout?.totalDiscount}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="payment" size={25} color={'black'} />
            <Text style={styles.info}>
              Tổng: {orderItem?.order_checkout?.totalCheckout}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={25} color={'black'} />
            <Text style={styles.info}>
              {moment(orderItem?.crateDate).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
        </View>
      </View>

      {orderItem?.status === 'pending' && (
        <TouchableOpacity style={styles.button} onPress={handleApproval}>
          <Text style={styles.buttonText}>
            {statusTranslations[orderItem?.status]}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#A4D3EE',
  },
  titleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  avatar: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    padding: 10,
  },
  infoSection: {
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // marginTop: 20,
  },
  button: {
    height: 50,
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default OrderHistory;
