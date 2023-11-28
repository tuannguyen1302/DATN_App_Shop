import React, {useState} from 'react';
import {Dimensions, FlatList, Image, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {BarChart} from 'react-native-chart-kit';
import {StaticStyle} from './styles';

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
    <View style={StaticStyle.mainContainer}>
      <View style={StaticStyle.rowContainer}>
        <Text style={StaticStyle.titleText}>Tổng quan</Text>
        <Dropdown
          selectedTextStyle={StaticStyle.dropdownText}
          style={StaticStyle.dropdown}
          data={CHART_CATEGORIES}
          labelField="name"
          valueField="id"
          value={selectedCategory.id}
          maxHeight={120}
          onChange={setSelectedCategory}
        />
      </View>
      <View style={StaticStyle.rowContainer}>
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
    <View style={StaticStyle.valueContainer}>
      <Text style={StaticStyle.valueLabel}>{label}</Text>
      <Text style={StaticStyle.valueText}>{value}</Text>
    </View>
  );

  const ProductItem = ({item}) => (
    <View style={StaticStyle.itemContainer}>
      <Image style={StaticStyle.productImage} source={{uri: item.image}} />
      <View style={StaticStyle.productInfo}>
        <Text style={StaticStyle.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={StaticStyle.infoText} numberOfLines={1}>
          Giá bán:{' '}
          <Text style={StaticStyle.priceText}>
            {item.sellingPrice.toLocaleString().replace(/,/g, '.')}đ
          </Text>
        </Text>
        <Text style={StaticStyle.infoText} numberOfLines={1}>
          Giá nhập:{' '}
          <Text style={StaticStyle.priceText}>
            {item.purchasePrice.toLocaleString().replace(/,/g, '.')}đ
          </Text>
        </Text>
      </View>
      <View style={StaticStyle.quantityContainer}>
        <Text style={StaticStyle.infoText}>Số lượng: {item.quantity}</Text>
      </View>
    </View>
  );

  const ChartSection = () => (
    <View style={StaticStyle.chartContainer}>
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
        style={StaticStyle.chartStyle}
      />
      <Text style={StaticStyle.footerText}>Biểu đồ</Text>
    </View>
  );

  return (
    <View style={StaticStyle.container}>
      <InventoryInfo />

      <View style={StaticStyle.footerContainer}>
        <Text style={StaticStyle.footerText}>Thống kê</Text>
        <Dropdown
          selectedTextStyle={StaticStyle.dropdownText}
          style={StaticStyle.availabilityDropdown}
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
        <View style={StaticStyle.productListContainer}>
          <Text style={StaticStyle.footerText}>Sản Phẩm Bán Chạy</Text>
          <FlatList
            data={productData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={StaticStyle.productList}
            renderItem={({item}) => <ProductItem item={item} />}
          />
        </View>
      )}
    </View>
  );
};

export default StatisticalScreen;
