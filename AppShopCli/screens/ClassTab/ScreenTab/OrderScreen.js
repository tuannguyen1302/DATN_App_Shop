import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';

// List Tab
const listTab = [
  {
    status: 'Đang giao',
  },
  {
    status: 'Đã giao',
  },
  {
    status: 'Đã hủy',
  },
];

// Khai bao anh
const imgOrder = [
  'https://cdn2.iconfinder.com/data/icons/customer-loyalty-6/4680/PMT_M358_05-256.png',
  'https://cdn3.iconfinder.com/data/icons/order-food-online/3000/FOO-01-256.png',
  'https://cdn0.iconfinder.com/data/icons/delivery-services-5/600/7-256.png',
  'https://cdn1.iconfinder.com/data/icons/business-people-v/85/People-01-41-256.png',
];

const OrderScreen = ({navigation}) => {
  // Kiem tra khi an chuyen don hang
  const [isCheck, setIsCheck] = useState(false);
  // Kiem tra khi an chuyen tab
  const [status, setStatus] = useState('Đang giao');
  // Kiem tra ảnh khi an chuyen
  const [imgBottom, setImgBottom] = useState(imgOrder[0]);
  // Mảng đữ liệu render
  const [array, setArray] = useState([
    {
      userName: 'Sùng văn sính...',
      nameProduct: 'Áo khoác nam...',
      avatar:
        'https://www.bing.com/th?id=OIP.lXMqjfaBPZm2xSzGyPs6swHaKX&w=150&h=210&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      color: 'green',
      size: 'xl',
      status: 'Chờ duyệt',
      quantity: 2,
    },
  ]);

  // Khi an nut xoay man
  const image = () => {
    setIsCheck(!isCheck);
    isCheck ? setImgBottom(imgOrder[0]) : tabItem(status);
  };

  // Kiem tra khi an tab
  const tabItem = tab => {
    setStatus(tab);
    if (tab == 'Đang giao') setImgBottom(imgOrder[1]);
    else if (tab == 'Đã giao') setImgBottom(imgOrder[2]);
    else if (tab == 'Đã hủy') setImgBottom(imgOrder[3]);
  };

  // Su dung de duyệt từng item
  const renderItem = array => {
    return (
      <FlatList
        scrollEnabled={false}
        data={array}
        renderItem={({item}) => (
          <View style={styles.buttonItem}>
            <View style={styles.rowItem1}>
              {/* Ảnh sản phẩm */}
              <Image style={styles.imgItem} source={{uri: item.avatar}} />
              {/* Thông tin sản phẩm */}
              <View style={{marginHorizontal: '1%'}}>
                <Text style={styles.nameProductItem}>{item.nameProduct}</Text>
                <View style={styles.iconHeader}>
                  <View
                    style={[styles.colorItem, {backgroundColor: item.color}]}
                  />
                  <Text style={styles.txtItem}>Màu | Size: {item.size}</Text>
                </View>
                <Text style={styles.txtItem}>Người mua: {item.userName}</Text>
                <Pressable>
                  <Text
                    style={[styles.txtItem, {textDecorationLine: 'underline'}]}>
                    Xem thêm
                  </Text>
                </Pressable>
              </View>
              {/* Số lượng, xác nhận */}
              <View style={styles.rowItem2}>
                <View style={styles.quantityItem}>
                  <Text style={styles.txtItem}>{item.quantity}</Text>
                </View>
                <View style={styles.statusItem}>
                  <Text
                    style={[styles.txtItem, {color: 'white', fontSize: 10}]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Icon back, Chuyen man */}
      <View style={styles.header}>
        <View style={styles.iconHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </Pressable>
          <Text style={styles.txtHeader}>
            Đơn hàng({isCheck ? 'giao hàng' : 'xác nhận'})
          </Text>
        </View>
        <Pressable onPress={image}>
          <Octicons name="issue-reopened" size={30} color={'black'} />
        </Pressable>
      </View>

      {isCheck ? (
        // Màn hình giao hàng
        // Tab chuyển màn
        <View style={styles.nav}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {listTab.map((data, index) => (
              <Pressable
                key={index}
                style={[
                  styles.tabItem,
                  data.status == status ? {backgroundColor: 'white'} : null,
                ]}
                onPress={() => tabItem(data.status)}>
                <Text style={data.status == status ? styles.txtTab : null}>
                  {data.status}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {renderItem(array)}
          </ScrollView>
        </View>
      ) : (
        // Man hinh xác nhận
        <View style={styles.nav}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.txtTitle}>Hôm nay({array.length})</Text>
            {renderItem(array)}
            <Text style={styles.txtTitle}>Trước đó({array.length})</Text>
            {renderItem(array)}
          </ScrollView>
        </View>
      )}

      <Image style={styles.imageBottom} source={{uri: imgBottom}} />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999999',
    marginHorizontal: '7%',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  iconHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtHeader: {
    left: '15%',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  nav: {
    marginHorizontal: '5%',
    alignItems: 'center',
  },
  tabItem: {
    width: 110,
    height: 40,
    margin: '3%',
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtTab: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    marginTop: '5%',
  },
  buttonItem: {
    height: 140,
    marginTop: '2%',
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowItem1: {
    marginHorizontal: '3%',
    flexDirection: 'row',
  },
  imgItem: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  nameProductItem: {
    fontSize: 19,
    margin: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  colorItem: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  txtItem: {
    margin: '2%',
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
  },
  rowItem2: {
    marginHorizontal: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityItem: {
    width: 25,
    height: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  statusItem: {
    width: 70,
    height: 25,
    borderRadius: 10,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBottom: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
    bottom: '10%',
    alignSelf: 'center',
  },
});
