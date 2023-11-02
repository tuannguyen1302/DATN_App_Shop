import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

// Fixed data for months and product availability
const MONTHS_DATA = [
  {_id: 1, name: 'Tháng 1'},
  {_id: 2, name: 'Tháng 2'},
  {_id: 3, name: 'Tháng 3'},
  {_id: 4, name: 'Tháng 4'},
  {_id: 5, name: 'Tháng 5'},
  {_id: 6, name: 'Tháng 6'},
  {_id: 7, name: 'Tháng 7'},
  {_id: 8, name: 'Tháng 8'},
  {_id: 9, name: 'Tháng 9'},
  {_id: 10, name: 'Tháng 10'},
  {_id: 11, name: 'Tháng 11'},
  {_id: 12, name: 'Tháng 12'},
];

const AVAILABILITY_DATA = [
  {_id: 1, name: 'Còn hàng'},
  {_id: 2, name: 'Hết hàng'},
];

const InventoryScreen = () => {
  const navigation = useNavigation();
  const [selectedMonth, setSelectedMonth] = useState(1);

  // Sample product data
  const [productData, setProductData] = useState([
    {
      nameProduct: 'Áo khoác nam...',
      avatar:
        'https://www.bing.com/th?id=OIP.lXMqjfaBPZm2xSzGyPs6swHaKX&w=150&h=210&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      giaNhap: 1000,
      giaBan: 2000,
      quantity: 2,
    },
  ]);

  // Header section
  const Header = () => (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={30} color={'black'} />
      </Pressable>
      <Text style={styles.headerText}>Tồn kho</Text>
    </View>
  );

  // Overview information about inventory
  const InventoryInfo = () => (
    <View style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://i.pinimg.com/236x/19/24/c6/1924c6c35edbe90f175b019eee657c37.jpg',
        }}
      />
      <InfoDetails />
    </View>
  );

  // Details about inventory information
  const InfoDetails = () => (
    <View style={styles.infoContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Giá trị kho hàng</Text>
        <Dropdown
          selectedTextStyle={styles.dropdownText}
          style={styles.dropdown}
          data={MONTHS_DATA}
          labelField="name"
          valueField="_id"
          value={selectedMonth}
          maxHeight={120}
          onChange={setSelectedMonth}
        />
      </View>
      <View style={styles.rowContainer}>
        <ValueDetails label="Value" value="1.000.000" />
        <ValueDetails label="Quantity" value="10" />
      </View>
    </View>
  );

  // Displaying value details
  const ValueDetails = ({label, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueLabel}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );

  // Product list section
  const ProductList = () => (
    <FlatList
      data={productData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{marginTop: '2%'}}
      renderItem={({item}) => <ProductItem item={item} />}
    />
  );

  // Displaying each product
  const ProductItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image style={styles.productImage} source={{uri: item.avatar}} />
      <ProductInfo item={item} />
      <QuantityAndStatus item={item} />
    </View>
  );

  // Product details section
  const ProductInfo = ({item}) => (
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.nameProduct}</Text>

      <Text style={styles.infoText}>
        Giá nhập: <Text style={{color: 'red'}}>{item.giaNhap}</Text>
      </Text>
      <Text style={styles.infoText}>
        Giá bán: <Text style={{color: 'red'}}>{item.giaBan}</Text>
      </Text>
    </View>
  );

  // Quantity and status of the product
  const QuantityAndStatus = ({item}) => (
    <View style={styles.quantityAndStatus}>
      <Text style={styles.infoText}>Số lượng: {item.quantity}</Text>
    </View>
  );

  // Footer section
  const Footer = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Sản phẩm</Text>
      <Dropdown
        selectedTextStyle={styles.dropdownText}
        style={styles.availabilityDropdown}
        data={AVAILABILITY_DATA}
        labelField="name"
        valueField="_id"
        value={selectedMonth}
        maxHeight={120}
        onChange={setSelectedMonth}
      />
    </View>
  );

  // Rendering the entire screen
  return (
    <View style={styles.container}>
      <Header />
      <InventoryInfo />
      <Footer />
      <ProductList />
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
  },
  headerText: {
    marginLeft: 16,
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },
  mainContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    padding: '1%',
    marginHorizontal: '5%',
    marginTop: '5%',
    elevation: 1,
    marginBottom: '2%',
  },
  image: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: '1%',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdown: {
    height: 25,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 85,
  },
  dropdownText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  valueContainer: {
    width: '48%',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  valueLabel: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  valueText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '2%',
    marginHorizontal: '4%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },
  availabilityDropdown: {
    height: 35,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 100,
  },
  itemContainer: {
    height: 100,
    borderRadius: 20,
    padding: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: '5%',
    marginBottom: '3%',
    elevation: 5,
  },
  productImage: {
    width: 85,
    height: 85,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    left: '1%',
  },
  productName: {
    fontSize: 20,
    padding: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  infoText: {
    padding: '3%',
    color: 'black',
    fontSize: 15,
    fontWeight: '700',
  },
  quantityAndStatus: {
    marginHorizontal: '1%',
    alignItems: 'center',
  },
});

export default InventoryScreen;
