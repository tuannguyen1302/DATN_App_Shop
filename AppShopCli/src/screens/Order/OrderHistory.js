import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {API_BASE_URL, ORDER_API} from '../../config/urls';
import {apiPatch} from '../../utils/utils';

const statusTranslations = {
  pending: 'Phê duyệt',
  shipped: 'Đang vận chuyển',
  delivered: 'Đã giao hàng',
  cancelled: 'Đã hủy',
};

const UpdatedOrderHistory = ({route}) => {
  const navigation = useNavigation();
  const {orderItem} = route.params;

  const handleApproval = async ischeck => {
    try {
      await apiPatch(
        `${ORDER_API}/${
          ischeck ? 'changeStatus' : `cancelByShop/${orderItem?.oderId}`
        }`,
        ischeck && {
          order_id: orderItem?.oderId,
          status: 'shipped',
        },
      );
      navigation.navigate('Order', {screen: ischeck ? 'Đang giao' : 'Đã hủy'});
      ToastAndroid.show('Thay đổi trạng thái thành công', ToastAndroid.show);
    } catch (error) {
      console.log('Patch api: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Information Order</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.productInfoContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: `${API_BASE_URL}uploads/${orderItem?.product_thumb[0]}`,
            }}
          />
          <View style={styles.productDetails}>
            <Text numberOfLines={2} style={styles.productName}>
              {orderItem?.product_name}
            </Text>
            <Text style={styles.productAttribute}>
              Số lượng: {orderItem?.product_attributes?.quantity}
            </Text>
            <Text style={styles.productAttribute}>
              Màu: {orderItem?.product_attributes?.color} | Size:{' '}
              {orderItem?.product_attributes?.size}
            </Text>
          </View>
        </View>
        <View style={styles.separator} />

        {orderItem?.status === 'pending' && (
          <TouchableOpacity
            style={styles.statusButton}
            onPress={() => handleApproval(false)}>
            <Text style={[styles.buttonText, {color: 'orange'}]}>Hủy đơn</Text>
          </TouchableOpacity>
        )}
        {orderItem?.status === 'shipped' && (
          <View style={[styles.statusButton, {backgroundColor: '#eee'}]}>
            <Text style={[styles.buttonText, {color: '#6666FF'}]}>
              Đang giao
            </Text>
          </View>
        )}
        {orderItem?.status === 'delivered' && (
          <View style={[styles.statusButton, {backgroundColor: '#CCFFCC'}]}>
            <Text style={[styles.buttonText, {color: 'green'}]}>Hủy đơn</Text>
          </View>
        )}
        {orderItem?.status === 'cancelled' && (
          <View
            style={[styles.statusButton, {backgroundColor: '#FFE4E1'}]}
            onPress={() => handleApproval(false)}>
            <Text style={[styles.buttonText, {color: 'red'}]}>Đã hủy</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Khách hàng:</Text>
            <Text style={styles.infoText}>{orderItem?.user_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Số điện thoại:</Text>
            <Text style={styles.infoText}>{orderItem?.phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoText}>
              {orderItem?.order_shipping.City}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giá: </Text>
            <Text style={styles.infoText}>
              {orderItem?.order_checkout?.totalPrice}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phí ship:</Text>
            <Text style={styles.infoText}>
              {orderItem?.order_checkout?.feeShip}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giảm giá:</Text>
            <Text style={styles.infoText}>
              {orderItem?.order_checkout?.totalDiscount}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tổng:</Text>
            <Text style={styles.infoText}>
              {orderItem?.order_checkout?.totalCheckout}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <MaterialIcons name="event" size={25} color={'black'} />
            <Text style={styles.infoText}>
              {moment(orderItem?.crateDate).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
        </View>

        {orderItem?.status === 'pending' && (
          <TouchableOpacity
            style={styles.approvalButton}
            onPress={() => handleApproval(true)}>
            <Text style={styles.buttonText}>
              {statusTranslations[orderItem?.status]}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
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
    padding: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  titleText: {
    fontSize: 22,
    left: 20,
    color: 'black',
    fontWeight: '600',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  productInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginTop: '5%',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 10,
    flexShrink: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
  },
  productAttribute: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginBottom: 5,
  },
  separator: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginHorizontal: '5%',
  },
  statusButton: {
    height: 30,
    backgroundColor: '#FFEFD5',
    marginHorizontal: '5%',
    marginVertical: '2%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  infoContainer: {
    marginHorizontal: '5%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 16,
    marginVertical: '2%',
    color: 'black',
    fontWeight: '500',
  },
  infoSection: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginHorizontal: '5%',
  },
  approvalButton: {
    height: 50,
    width: '80%',
    bottom: '5%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 10,
    backgroundColor: 'black',
  },
  cancelButton: {
    height: 50,
    width: '80%',
    bottom: '5%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginVertical: 10,
    backgroundColor: 'red',
  },
});

export default UpdatedOrderHistory;
