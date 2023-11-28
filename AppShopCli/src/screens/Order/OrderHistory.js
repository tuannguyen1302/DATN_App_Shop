import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {API_BASE_URL, ORDER_API} from '../../config/urls';
import {apiPatch} from '../../utils/utils';
import {OrderHisStyle} from './styles';

const statusTranslations = {
  pending: 'Phê duyệt',
  shipped: 'Đang vận chuyển',
  cancelled: 'Đã hủy',
  delivered: 'Đã giao hàng',
};

const OrderHistory = ({route}) => {
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
      navigation.navigate('OrderScreen', {
        screen: ischeck ? 'Đang giao' : 'Đã hủy',
      });
      ToastAndroid.show('Thay đổi trạng thái thành công', ToastAndroid.show);
    } catch (error) {
      console.log('Patch api: ', error.message);
    }
  };

  return (
    <ScrollView style={OrderHisStyle.container}>
      <View style={OrderHisStyle.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={'white'} />
        </Pressable>
        <Text style={OrderHisStyle.titleText}>Thông tin đơn hàng</Text>
        <View style={{width: 30}}></View>
      </View>

      <Image
        style={OrderHisStyle.avatar}
        source={{uri: `${API_BASE_URL}uploads/${orderItem?.product_thumb[0]}`}}
      />

      <View style={OrderHisStyle.row}>
        <View style={OrderHisStyle.column}>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="person" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>{orderItem?.user_name}</Text>
          </View>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="phone" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>{orderItem?.phoneNumber}</Text>
          </View>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="location-on" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              {orderItem?.order_shipping.City}
            </Text>
          </View>
        </View>

        <View style={OrderHisStyle.column}>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="shopping-cart" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>{orderItem?.product_name}</Text>
          </View>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="local-mall" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              Số lượng: {orderItem?.product_attributes?.quantity}
            </Text>
          </View>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="color-lens" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              Màu: {orderItem?.product_attributes?.color} | Size:{' '}
              {orderItem?.product_attributes?.size}
            </Text>
          </View>
        </View>
      </View>

      <View style={OrderHisStyle.row}>
        <View style={OrderHisStyle.infoSection}>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="attach-money" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              Giá: {orderItem?.order_checkout?.totalPrice}
            </Text>
          </View>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="local-shipping" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              Ship: {orderItem?.order_checkout?.feeShip}
            </Text>
          </View>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="local-offer" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              Giảm giá: {orderItem?.order_checkout?.totalDiscount}
            </Text>
          </View>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="payment" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              Tổng: {orderItem?.order_checkout?.totalCheckout}
            </Text>
          </View>
        </View>

        <View style={OrderHisStyle.infoSection}>
          <View style={OrderHisStyle.infoRow}>
            <MaterialIcons name="event" size={25} color={'black'} />
            <Text style={OrderHisStyle.info}>
              {moment(orderItem?.crateDate).format('DD/MM/YYYY HH:mm')}
            </Text>
          </View>
        </View>
      </View>

      {orderItem?.status === 'pending' && (
        <>
          <TouchableOpacity
            style={OrderHisStyle.button}
            onPress={() => handleApproval(true)}>
            <Text style={OrderHisStyle.buttonText}>
              {statusTranslations[orderItem?.status]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[OrderHisStyle.button, {backgroundColor: 'red'}]}
            onPress={() => handleApproval(false)}>
            <Text style={OrderHisStyle.buttonText}>Hủy</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

export default OrderHistory;
