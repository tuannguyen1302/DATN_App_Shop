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
import {useNavigation} from '@react-navigation/native';

// Danh sách Tab
const TAB_LIST = [
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

// Danh sách các ảnh cho từng trạng thái đơn hàng
const TAB_IMAGES = [
  require('../../../image/Order1.png'),
  require('../../../image/Order2.png'),
  require('../../../image/Order3.png'),
  require('../../../image/Order4.png'),
];

const OrderScreen = () => {
  const navigation = useNavigation();
  const [isDeliveryMode, setIsDeliveryMode] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('Đang giao');
  const [bottomImage, setBottomImage] = useState(TAB_IMAGES[0]);

  // Dữ liệu mẫu để hiển thị đơn hàng
  const [orderData, setOrderData] = useState([
    {
      userName: 'Sùng Văn Sinh...',
      nameProduct: 'Áo khoác nam...',
      avatar:
        'https://www.bing.com/th?id=OIP.lXMqjfaBPZm2xSzGyPs6swHaKX&w=150&h=210&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      color: 'green',
      size: 'xl',
      status: 'Chờ duyệt',
      quantity: 2,
    },
  ]);

  // Hàm chuyển đổi giữa chế độ xác nhận và chế độ giao hàng
  const toggleDeliveryMode = () => {
    setIsDeliveryMode(!isDeliveryMode);
    isDeliveryMode
      ? setBottomImage(TAB_IMAGES[0])
      : handleTabChange(currentStatus);
  };

  // Hàm xử lý khi chuyển tab
  const handleTabChange = tab => {
    setCurrentStatus(tab);
    if (tab === 'Đang giao') setBottomImage(TAB_IMAGES[1]);
    else if (tab === 'Đã giao') setBottomImage(TAB_IMAGES[2]);
    else if (tab === 'Đã hủy') setBottomImage(TAB_IMAGES[3]);
  };

  // Hàm render từng item trong danh sách đơn hàng
  const renderItem = item => {
    return (
      <FlatList
        scrollEnabled={false}
        data={item}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            {/* Ảnh sản phẩm */}
            <Image style={styles.productImage} source={{uri: item.avatar}} />
            {/* Thông tin sản phẩm */}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.nameProduct}</Text>
              {/* Màu sắc và kích thước */}
              <View style={styles.colorInfo}>
                <View
                  style={[styles.colorBadge, {backgroundColor: item.color}]}
                />
                <Text style={styles.infoText}>Màu | Size: {item.size}</Text>
              </View>
              <Text style={styles.infoText}>Người mua: {item.userName}</Text>
              <Pressable>
                <Text style={[styles.infoText, styles.underline]}>
                  Xem thêm
                </Text>
              </Pressable>
            </View>
            {/* Số lượng và trạng thái */}
            <View style={styles.quantityAndStatus}>
              <View style={styles.quantityBadge}>
                <Text style={styles.infoText}>{item.quantity}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={[styles.infoText, styles.statusText]}>
                  {item.status}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Nút quay lại và tiêu đề header */}
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </Pressable>
          <Text style={styles.headerText}>
            Đơn hàng({isDeliveryMode ? 'giao hàng' : 'xác nhận'})
          </Text>
        </View>
        {/* Nút chuyển chế độ */}
        <Pressable onPress={toggleDeliveryMode}>
          <Octicons name="issue-reopened" size={30} color={'black'} />
        </Pressable>
      </View>

      {/* Nội dung chính */}
      <View style={styles.content}>
        {isDeliveryMode && (
          // Màn hình giao hàng - Tab chuyển màn hình
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {TAB_LIST.map((image, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.tabItem,
                    {
                      backgroundColor:
                        currentStatus === TAB_LIST[index].status
                          ? 'white'
                          : null,
                    },
                  ]}
                  onPress={() => handleTabChange(TAB_LIST[index].status)}>
                  <Text
                    style={
                      currentStatus === TAB_LIST[index].status
                        ? styles.selectedTabText
                        : null
                    }>
                    {TAB_LIST[index].status}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Danh sách đơn hàng */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {!isDeliveryMode && (
            <>
              <Text style={styles.titleText}>Hôm nay({orderData.length})</Text>
              {renderItem(orderData)}
              <Text style={styles.titleText}>Trước đó({orderData.length})</Text>
            </>
          )}
          {renderItem(orderData)}
        </ScrollView>
      </View>

      {/* Ảnh phía dưới */}
      <Image style={styles.bottomImage} source={bottomImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999999',
    marginHorizontal: '5%',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  headerContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    left: '15%',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginHorizontal: '5%',
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
  selectedTabText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titleText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    marginTop: '5%',
  },
  itemContainer: {
    height: 140,
    marginTop: '2%',
    borderRadius: 20,
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    left: '1%',
  },
  productName: {
    fontSize: 19,
    margin: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorBadge: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: '2%',
  },
  infoText: {
    margin: '2%',
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  quantityAndStatus: {
    marginHorizontal: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  bottomImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: -1,
    bottom: '10%',
    alignSelf: 'center',
  },
});

export default OrderScreen;
