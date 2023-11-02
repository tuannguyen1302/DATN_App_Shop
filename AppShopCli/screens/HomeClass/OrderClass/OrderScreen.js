import {
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
// List of Tabs and corresponding images
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

const TAB_IMAGES = [
  require('../../../images/Order1.png'),
  require('../../../images/Order2.png'),
  require('../../../images/Order3.png'),
  require('../../../images/Order4.png'),
];

const OrderScreen = () => {
  // Using hooks and state
  const navigation = useNavigation();
  const [isDeliveryMode, setIsDeliveryMode] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('In delivery');
  const [bottomImage, setBottomImage] = useState(TAB_IMAGES[0]);

  // Sample data to display orders
  const [orderData, setOrderData] = useState([
    {
      userName: 'Sùng Văn Sinh',
      nameProduct: 'Áo khoác nam',
      avatar:
        'https://www.bing.com/th?id=OIP.lXMqjfaBPZm2xSzGyPs6swHaKX&w=150&h=210&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      color: 'green',
      size: 'xl',
      status: 'Chờ duyệt',
      quantity: 2,
    },
  ]);

  // Function to switch between confirmation and delivery mode
  const toggleDeliveryMode = () => {
    setIsDeliveryMode(!isDeliveryMode);
    isDeliveryMode
      ? setBottomImage(TAB_IMAGES[0])
      : handleTabChange(currentStatus);
  };

  // Function to handle tab change
  const handleTabChange = tab => {
    setCurrentStatus(tab);
    if (tab === 'In delivery') setBottomImage(TAB_IMAGES[1]);
    else if (tab === 'Delivered') setBottomImage(TAB_IMAGES[2]);
    else if (tab === 'Cancelled') setBottomImage(TAB_IMAGES[3]);
  };

  // Function to render each item in the order list
  const renderItem = orderItem => {
    return (
      <View style={styles.itemContainer}>
        {/* Product image */}
        <Image style={styles.productImage} source={{uri: orderItem.avatar}} />
        {/* Product information */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={1}>
            {orderItem.nameProduct}
          </Text>
          {/* Color and size */}
          <View style={styles.colorInfo}>
            <View
              style={[styles.colorBadge, {backgroundColor: orderItem.color}]}
            />
            <Text style={styles.infoText}>Màu | Size: {orderItem.size}</Text>
          </View>
          <Text style={styles.infoText} numberOfLines={1}>
            Người mua: {orderItem.userName}
          </Text>
          <Pressable>
            <Text style={[styles.infoText, styles.underline]}>Xem thêm</Text>
          </Pressable>
        </View>
        {/* Quantity and status */}
        <View style={styles.quantityAndStatus}>
          <View style={styles.quantityBadge}>
            <Text style={styles.infoText}>{orderItem.quantity}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={[styles.infoText, styles.statusText]}>
              {orderItem.status}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {/* Back button and header title */}
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </Pressable>
          <Text style={styles.headerText}>
            Đơn hàng({isDeliveryMode ? 'giao hàng' : 'xác nhận'})
          </Text>
        </View>
        {/* Switch mode button */}
        <Pressable onPress={toggleDeliveryMode}>
          <Octicons name="issue-reopened" size={30} color={'black'} />
        </Pressable>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {isDeliveryMode && (
          // Delivery mode - Tab switch
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {TAB_LIST.map((tab, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.tabItem,
                    {
                      backgroundColor:
                        currentStatus === tab.status ? 'white' : null,
                    },
                  ]}
                  onPress={() => handleTabChange(tab.status)}>
                  <Text
                    style={
                      currentStatus === tab.status
                        ? styles.selectedTabText
                        : null
                    }>
                    {tab.status}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Order list */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {!isDeliveryMode && (
            <>
              <Text style={styles.titleText}>Hôm nay({orderData.length})</Text>
              {orderData.map((item, index) => (
                <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
              ))}
              <Text style={styles.titleText}>Trước đó({orderData.length})</Text>
            </>
          )}
          {orderData.map((item, index) => (
            <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
          ))}
        </ScrollView>
      </View>

      {/* Bottom image */}
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
    width: '50%',
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
