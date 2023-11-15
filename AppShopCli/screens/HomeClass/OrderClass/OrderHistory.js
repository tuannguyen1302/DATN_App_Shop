import React from 'react';
import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SOCKET_URL} from '../../utils/socketService';
import moment from 'moment';

const OrderHistory = ({route}) => {
  const navigation = useNavigation();
  const {orderItem} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={'black'} />
        </Pressable>
        <Text style={styles.titleText}>Thông tin đơn hàng</Text>
      </View>

      <View style={styles.avatarSection}>
        <Image
          style={styles.avatar}
          source={{
            uri: `${SOCKET_URL}uploads/${orderItem?.product_thumb[0]}`,
          }}
        />
        <Text style={styles.shopName}>{orderItem?.product_name}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Thông tin khách hàng:</Text>
          <Text style={styles.infoText}>Họ tên: {orderItem?.user_name}</Text>
          <Text style={styles.infoText}>
            Số điện thoại: {orderItem?.phoneNumber}
          </Text>
          <Text style={styles.infoText}>Địa chỉ: {orderItem?.address}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sản phẩm:</Text>
          <Text style={styles.infoText}>
            Giá: {orderItem?.product_attributes?.quantity}
          </Text>
          <Text style={styles.infoText}>
            Số lượng: {orderItem?.product_attributes?.quantity}
          </Text>
          <Text style={styles.infoText}>
            Màu: {orderItem?.product_attributes?.color} | Size:{' '}
            {orderItem?.product_attributes?.size}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Ngày tạo:</Text>

          <Text style={styles.infoText}>
            {moment(orderItem.crateDate).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
        </View>

        <Pressable
          style={styles.actionButton}
          onPress={() => {
            /* Xử lý khi nhấn nút Duyệt Đơn */
          }}>
          <Text style={styles.buttonText}>Duyệt đơn</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A4D3EE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginHorizontal: '5%',
  },
  titleText: {
    fontSize: 24,
    color: '#333333',
    marginLeft: 20,
    fontWeight: '500',
  },
  avatarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(169, 156, 156, 0.8)',
    borderBottomWidth: 2,
    borderColor: '#fff',
    paddingBottom: 20,
  },
  avatar: {
    width: 190,
    height: 190,
    marginTop: '2%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  shopName: {
    marginTop: 10,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#fff',
    paddingHorizontal: '5%',
    marginTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  infoItem: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: '600',
    marginTop: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  actionButton: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'black', // Giữ màu đen cho nút Duyệt Đơn
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default OrderHistory;
