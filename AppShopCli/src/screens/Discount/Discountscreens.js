import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {apiDelete, apiGet} from '../../utils/utils';
import {API_BASE_URL, DISCOUNT_API} from '../../config/urls';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {formatNotificationTime} from '../../components/DateTime';
import imagePath from '../../constants/imagePath';

const DiscountCodeScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
            getApi();
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
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getApi();
    }, []),
  );

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
              HSD: {formatNotificationTime(item?.discount_end_date)}
            </Text>
            <Text numberOfLines={1} style={styles.discountText}>
              Áp dụng tối thiểu {item?.discount_min_order_value} VND
            </Text>
          </View>
        </Pressable>
      </Swipeable>
    );
  };

  console.log(data);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Discount</Text>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : !data[0]?._id ? (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <Image
            style={{width: 100, height: 100, resizeMode: 'contain'}}
            source={imagePath.discount}
          />
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Chưa có mã giảm giá nào ✨
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item?._id}
          renderItem={renderDiscountItem}
          contentContainerStyle={{marginHorizontal: '3%'}}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddDiscount')}
        style={{
          width: '80%',
          height: 55,
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          marginHorizontal: '5%',
          position: 'absolute',
          bottom: '5%',
        }}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 15}}>
          Add Discount
        </Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  discountItem: {
    flexDirection: 'row',
    marginBottom: '1%',
    borderRadius: 10,
    padding: '1%',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: 'white',
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
