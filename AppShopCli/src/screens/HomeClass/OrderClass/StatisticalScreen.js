import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {BarChart} from 'react-native-chart-kit';

const CHART_CATEGORIES = [
  {id: 1, name: 'Đơn hàng'},
  {id: 2, name: 'Sản phẩm'},
];

const AVAILABILITY_OPTIONS = [
  {id: 1, name: 'Tất cả'},
  {id: 2, name: 'Hôm nay'},
  {id: 3, name: 'Tuần này'},
  {id: 4, name: 'Tháng này'},
  {id: 5, name: 'Quý này'},
  {id: 6, name: 'Năm nay'},
];

const StatisticalScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(CHART_CATEGORIES[0]);
  const [selectedAvailability, setSelectedAvailability] = useState(
    AVAILABILITY_OPTIONS[0],
  );

  const productData = [
    {
      name: 'Áo khoác nam',
      image:
        'https://www.bing.com/th?id=OIP.lXMqjfaBPZm2xSzGyPs6swHaKX&w=150&h=210&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      purchasePrice: 1000,
      sellingPrice: 2000,
      quantity: 2,
    },
  ];

  const InventoryInfo = () => (
    <View style={styles.mainContainer}>
      <View style={styles.rowContainer}>
        <Text style={styles.titleText}>Tổng quan</Text>
        <Dropdown
          selectedTextStyle={styles.dropdownText}
          style={styles.dropdown}
          data={CHART_CATEGORIES}
          labelField="name"
          valueField="id"
          value={selectedCategory.id}
          maxHeight={120}
          onChange={setSelectedCategory}
        />
      </View>
      <View style={styles.rowContainer}>
        <ValueDetails label={selectedCategory.name} value="10" />
        <ValueDetails
          label={selectedCategory.id === 1 ? 'Doanh thu' : 'Đã bán'}
          value={selectedCategory.id}
        />
        <ValueDetails
          label={selectedCategory.id === 1 ? 'Lợi nhuận' : 'Hết hàng'}
          value={selectedCategory.id}
        />
      </View>
    </View>
  );

  const ValueDetails = ({label, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueLabel}>{label}</Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );

  const ProductItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image style={styles.productImage} source={{uri: item.image}} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.infoText} numberOfLines={1}>
          Giá bán:{' '}
          <Text style={styles.priceText}>
            {item.sellingPrice.toLocaleString().replace(/,/g, '.')}đ
          </Text>
        </Text>
        <Text style={styles.infoText} numberOfLines={1}>
          Giá nhập:{' '}
          <Text style={styles.priceText}>
            {item.purchasePrice.toLocaleString().replace(/,/g, '.')}đ
          </Text>
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.infoText}>Số lượng: {item.quantity}</Text>
      </View>
    </View>
  );

  const ChartSection = () => (
    <View style={styles.chartContainer}>
      <BarChart
        data={{
          labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
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
        width={Dimensions.get('window').width / 1.05}
        height={Dimensions.get('window').height / 4}
        yAxisLabel="$"
        yAxisSuffix="k"
        chartConfig={{
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chartStyle}
      />
      <Text style={styles.footerText}>Biểu đồ</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <InventoryInfo />

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Thống kê</Text>
        <Dropdown
          selectedTextStyle={styles.dropdownText}
          style={styles.availabilityDropdown}
          data={AVAILABILITY_OPTIONS}
          labelField="name"
          valueField="id"
          value={selectedAvailability.id}
          maxHeight={120}
          onChange={setSelectedAvailability}
        />
      </View>

      <ChartSection />

      {selectedCategory.id === 2 && (
        <View style={styles.productListContainer}>
          <Text style={styles.footerText}>Sản Phẩm Bán Chạy</Text>
          <FlatList
            data={productData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productList}
            renderItem={({item}) => <ProductItem item={item} />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#F6F6F6',
  },
  mainContainer: {
    height: 120,
    backgroundColor: '#D9E1FF',
    borderRadius: 10,
    marginHorizontal: '3%',
    marginTop: '5%',
    padding: '2%',
    elevation: 2,
    marginBottom: '2%',
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
    height: 28,
    backgroundColor: '#262626',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 105,
  },
  dropdownText: {
    color: 'white',
    fontSize: 12,
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
    marginHorizontal: '4%',
    marginVertical: '2%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  availabilityDropdown: {
    height: 30,
    backgroundColor: '#262626',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 100,
  },
  itemContainer: {
    height: 100,
    marginVertical: '2%',
    padding: '2%',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  productImage: {
    width: '25%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    left: '1%',
    width: '50%',
  },
  productName: {
    fontSize: 18,
    margin: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  infoText: {
    margin: '2%',
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
  },
  quantityContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  chartContainer: {
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: '5%',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
  productListContainer: {
    marginHorizontal: '5%',
    flex: 1,
    marginTop: '2%',
  },
  productList: {
    marginTop: '2%',
  },
});

export default StatisticalScreen;
