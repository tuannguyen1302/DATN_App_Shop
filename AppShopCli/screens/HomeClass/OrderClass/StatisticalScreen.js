import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {LineChart} from 'react-native-chart-kit';

// Fixed data for categories and product availability
const CATEGORIES_DATA = [
  {_id: 1, name: 'Đơn hàng'},
  {_id: 2, name: 'Sản phẩm'},
];

const AVAILABILITY_DATA = [
  {_id: 1, name: 'Tất cả'},
  {_id: 2, name: 'Hôm nay'},
  {_id: 3, name: 'Tuần này'},
  {_id: 4, name: 'Tháng này'},
  {_id: 5, name: 'Quý này'},
  {_id: 6, name: 'Năm nay'},
];

const StatisticalScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES_DATA[0]);
  const [selectedAvailability, setSelectedAvailability] = useState(
    AVAILABILITY_DATA[0],
  );

  // Sample product data
  const [productData, setProductData] = useState([
    {
      productName: 'Áo khoác nam',
      imageUri:
        'https://www.bing.com/th?id=OIP.lXMqjfaBPZm2xSzGyPs6swHaKX&w=150&h=210&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      purchasePrice: 1000,
      sellingPrice: 2000,
      quantity: 2,
    },
  ]);

  // Header Section
  const Header = () => (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={30} color={'black'} />
      </Pressable>
      <Text style={styles.headerText}>Thống kê</Text>
    </View>
  );

  // Inventory Overview Section
  const InventoryInfo = () => (
    <View style={styles.mainContainer}>
      <InfoDetails />
    </View>
  );

  // Inventory Details Section
  const InfoDetails = () => (
    <View style={styles.infoContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Tổng quan</Text>
        <Dropdown
          selectedTextStyle={styles.dropdownText}
          style={styles.dropdown}
          data={CATEGORIES_DATA}
          labelField="name"
          valueField="_id"
          value={selectedCategory._id}
          maxHeight={120}
          onChange={setSelectedCategory}
        />
      </View>
      <View style={styles.rowContainer}>
        <ValueDetails label={selectedCategory.name} value="10" />
        <ValueDetails
          label={selectedCategory._id == 1 ? 'Doanh thu' : 'Đã bán'}
          value={selectedCategory._id}
        />
        <ValueDetails
          label={selectedCategory._id == 1 ? 'Lợi nhuận' : 'Hết hàng'}
          value={selectedCategory._id}
        />
      </View>
    </View>
  );

  // Display Value Details
  const ValueDetails = ({label, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueLabel}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );

  // Product List Section
  const ProductList = () => (
    <FlatList
      data={productData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{marginTop: '2%'}}
      renderItem={({item}) => <ProductItem item={item} />}
    />
  );

  // Display Each Product
  const ProductItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image style={styles.productImage} source={{uri: item.imageUri}} />
      <ProductInfo item={item} />
      <QuantityAndStatus item={item} />
    </View>
  );

  // Product Details Section
  const ProductInfo = ({item}) => (
    <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.productName}</Text>

      <Text style={styles.infoText}>
        Giá nhập: <Text style={{color: 'red'}}>{item.purchasePrice}</Text>
      </Text>
      <Text style={styles.infoText}>
        Giá bán: <Text style={{color: 'red'}}>{item.sellingPrice}</Text>
      </Text>
    </View>
  );

  // Quantity and Status of the Product
  const QuantityAndStatus = ({item}) => (
    <View style={styles.quantityAndStatus}>
      <Text style={styles.infoText}>Số lượng: {item.quantity}</Text>
    </View>
  );

  // Footer Section
  const Footer = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Thống kê</Text>
      <Dropdown
        selectedTextStyle={styles.dropdownText}
        style={styles.availabilityDropdown}
        data={AVAILABILITY_DATA}
        labelField="name"
        valueField="_id"
        value={selectedAvailability._id}
        maxHeight={120}
        onChange={setSelectedAvailability}
      />
    </View>
  );

  // Chart Section
  const ChartSection = () => (
    <View style={{alignItems: 'center'}}>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={200}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={chartStyle}
      />
      <Text style={styles.footerText}>Biểu đồ</Text>
      <View style={styles.separator} />
    </View>
  );

  // Configuration for the Chart
  const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  const chartStyle = {
    marginVertical: 8,
    borderRadius: 16,
  };

  // Display the entire screen
  return (
    <View style={styles.container}>
      <Header />
      <InventoryInfo />
      <Footer />
      <ChartSection />

      {selectedCategory._id == 2 && (
        <View style={{marginHorizontal: '6%', flex: 1, marginTop: '2%'}}>
          <Text style={styles.footerText}>Sản Phẩm Bán Chạy Nhất</Text>
          <ProductList />
        </View>
      )}
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
    height: 120,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#D9E1FF',
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
    width: 95,
  },
  dropdownText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  valueContainer: {
    width: '30%',
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

export default StatisticalScreen;
