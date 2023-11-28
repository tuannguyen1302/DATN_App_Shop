import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {API_BASE_URL} from '../../../config/urls';

const DiscountItem = ({route}) => {
  const {discount} = route.params;

  const value = {
    all: 'Tất cả các sản phẩm',
    specific: 'Một số sản phẩm',
    percentage: 'Giảm theo %',
    fixed_amount: 'Giảm theo giá tiền',
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: `${API_BASE_URL}${discount?.thumb}`}}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Tên ưu đãi:</Text>
        <Text style={styles.detail}>{discount?.discount_name}</Text>

        <Text style={styles.title}>Mã ưu đãi:</Text>
        <Text style={styles.detail}>{discount?.discount_code}</Text>

        <Text style={styles.title}>Miêu tả ưu đãi:</Text>
        <Text style={styles.detail}>{discount?.discount_des}</Text>

        <Text style={styles.title}>Loại ưu đãi:</Text>
        <Text style={styles.detail}>{value[discount?.discount_type]}</Text>

        <Text style={styles.title}>Giá trị ưu đãi:</Text>
        <Text style={styles.detail}>{discount?.discount_value}%</Text>

        <Text style={styles.title}>Áp dụng cho:</Text>
        <Text style={styles.detail}>
          {value[discount?.discount_applies_to]}
        </Text>

        <Text style={styles.title}>Ngày bắt đầu:</Text>
        <Text style={styles.detail}>
          {formatDate(discount?.discount_start_date)}
        </Text>

        <Text style={styles.title}>Ngày kết thúc:</Text>
        <Text style={styles.detail}>
          {formatDate(discount?.discount_end_date)}
        </Text>

        <Text style={styles.title}>Số lần sử dụng tối đa:</Text>
        <Text style={styles.detail}>{discount?.discount_max_uses}</Text>

        <Text style={styles.title}>
          Số lần sử dụng tối đa cho mỗi người dùng:
        </Text>
        <Text style={styles.detail}>
          {discount?.discount_max_uses_per_user}
        </Text>

        <Text style={styles.title}>Giá trị đơn hàng tối thiểu:</Text>
        <Text style={styles.detail}>{discount?.discount_min_order_value}</Text>

        <Text style={styles.title}>Số lượng sản phẩm áp dụng ưu đãi:</Text>
        <Text style={styles.detail}>
          {discount?.discount_product_ids.length}
        </Text>

        <Text style={styles.title}>Trạng thái:</Text>
        <Text style={styles.detail}>
          {discount?.discount_is_active ? 'Đang hoạt động' : 'Hết hạn'}
        </Text>
      </View>
    </ScrollView>
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
    padding: 16,
    backgroundColor: '#9999FF', // Màu hồng đậm
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green', // Màu hồng đậm
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333', // Màu đen
  },
});

export default DiscountItem;
