import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {API_BASE_URL} from '../../config/urls';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DiscountItem = ({navigation, route}) => {
  const {discount} = route.params;

  const value = {
    all: 'Tất cả các sản phẩm',
    specific: 'Một số sản phẩm',
    percentage: 'Giảm theo %',
    fixed_amount: 'Giảm theo giá tiền',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Information Discount</Text>
      </View>
      <ScrollView>
        <Image
          source={{uri: `${API_BASE_URL}${discount?.thumb}`}}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Tên ưu đãi:</Text>
          <Text style={styles.detail}>{discount?.discount_name}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Mã ưu đãi:</Text>
          <Text style={styles.detail}>{discount?.discount_code}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Miêu tả ưu đãi:</Text>
          <Text style={styles.detail}>{discount?.discount_des}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Loại ưu đãi:</Text>
          <Text style={styles.detail}>{value[discount?.discount_type]}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Giá trị ưu đãi:</Text>
          <Text style={styles.detail}>{discount?.discount_value}%</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Áp dụng cho:</Text>
          <Text style={styles.detail}>
            {value[discount?.discount_applies_to]}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Ngày bắt đầu:</Text>
          <Text style={styles.detail}>
            {formatDate(discount?.discount_start_date)}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Ngày kết thúc:</Text>
          <Text style={styles.detail}>
            {formatDate(discount?.discount_end_date)}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Số lần sử dụng tối đa:</Text>
          <Text style={styles.detail}>{discount?.discount_max_uses}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            Số lần sử dụng tối đa cho mỗi người dùng:
          </Text>
          <Text style={styles.detail}>
            {discount?.discount_max_uses_per_user}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Giá trị đơn hàng tối thiểu:</Text>
          <Text style={styles.detail}>
            {discount?.discount_min_order_value}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Số lượng sản phẩm áp dụng ưu đãi:</Text>
          <Text style={styles.detail}>
            {discount?.discount_product_ids.length}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Trạng thái:</Text>
          <Text style={styles.detail}>
            {discount?.discount_is_active ? 'Đang hoạt động' : 'Hết hạn'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export const formatDate = dateString => {
  const date = new Date(dateString);
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'white',
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
    color: 'black',
    fontWeight: '600',
    left: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  infoContainer: {
    marginVertical: '1%',
    backgroundColor: '#eee',
    padding: 5,
    marginHorizontal: '3%',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

export default DiscountItem;
