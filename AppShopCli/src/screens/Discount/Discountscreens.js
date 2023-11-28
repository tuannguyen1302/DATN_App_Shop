import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {apiDelete, apiGet} from '../../utils/utils';
import {API_BASE_URL, DISCOUNT_API} from '../../config/urls';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {formatDate} from './DiscountItem ';

const DiscountCodeScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const deleteSale = idDiscount => {
    Alert.alert('Cảnh báo', 'Bạn muốn xóa mã giảm giá này chứ?', [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: async () => {
          try {
            await apiDelete(`${DISCOUNT_API}/deleteDiscount/${idDiscount}`);
            ToastAndroid.show('Xóa mã giảm giá thành công', ToastAndroid.show);
          } catch (error) {
            console.log('Delete api: ', error.message);
          }
        },
      },
    ]);
  };

  const getApi = async () => {
    try {
      const res = await apiGet(`${DISCOUNT_API}/all`);
      setData(res?.message);
    } catch (error) {
      console.log('Call api: ', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  const renderDiscountItem = ({item}) => {
    return (
      <Swipeable
        renderRightActions={() => (
          <>
            <Pressable
              onPress={() => deleteSale(item?._id)}
              style={styles.deleteButton}>
              <MaterialIcons name="delete" size={30} color={'white'} />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('UpdateDiscount', {data: item})
              }
              style={[styles.deleteButton, {backgroundColor: 'orange'}]}>
              <MaterialIcons name="update" size={30} color={'white'} />
            </Pressable>
          </>
        )}>
        <Pressable
          onPress={() => navigation.navigate('DiscountItem', {discount: item})}
          style={styles.discountItem}>
          <Image
            source={{uri: `${API_BASE_URL}${item?.thumb}`}}
            style={styles.discountImage}
          />
          <View style={styles.discountDetails}>
            <Text numberOfLines={2} style={styles.discountTitle}>
              {item?.discount_name}
            </Text>
            <Text numberOfLines={1} style={styles.discountText}>
              HSD: {formatDate(item?.discount_end_date)}
            </Text>
            <Text numberOfLines={1} style={styles.discountText}>
              Áp dụng tối thiểu {item?.discount_min_order_value} VND
            </Text>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={'white'} />
        </Pressable>
        <Text style={styles.headerText}>Mã Giảm Giá </Text>
        <Pressable
          onPress={() => {
            navigation.navigate('AddDiscount');
          }}
          style={styles.addButton}>
          <AntDesign name="plus" size={24} color={'white'} />
        </Pressable>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item?._id}
        renderItem={renderDiscountItem}
        contentContainerStyle={{marginHorizontal: '3%'}}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 10,
    paddingHorizontal: '5%',
    backgroundColor: '#9999FF',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  discountItem: {
    flexDirection: 'row',
    marginBottom: '1%',
    borderRadius: 10,
    padding: '1%',
    alignItems: 'center',

    borderWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: 'white', // Màu nền của mỗi item
  },
  discountImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  discountDetails: {
    flex: 1,
    padding: 10,
  },
  discountTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  discountText: {
    fontSize: 14,
    color: '#555',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    width: '20%',
  },
});

export default DiscountCodeScreen;
