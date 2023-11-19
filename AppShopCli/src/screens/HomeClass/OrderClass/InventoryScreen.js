import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const MONTHS = [
  {id: 1, name: 'Tháng 1'},
  {id: 2, name: 'Tháng 2'},
  {id: 3, name: 'Tháng 3'},
  {id: 4, name: 'Tháng 4'},
  {id: 5, name: 'Tháng 5'},
  {id: 6, name: 'Tháng 6'},
  {id: 7, name: 'Tháng 7'},
  {id: 8, name: 'Tháng 8'},
  {id: 9, name: 'Tháng 9'},
  {id: 10, name: 'Tháng 10'},
  {id: 11, name: 'Tháng 11'},
  {id: 12, name: 'Tháng 12'},
];

const AVAILABILITY_OPTIONS = [
  {id: 1, name: 'Còn hàng'},
  {id: 2, name: 'Hết hàng'},
];

const InventoryScreen = () => {
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedAvailability, setSelectedAvailability] = useState(1);

  const products = [
    {
      name: 'Áo khoác nam...',
      image:
        'https://www.bing.com/th?id=OIP.lXMqjfaBPZm2xSzGyPs6swHaKX&w=150&h=210&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
      giaNhap: 1000,
      giaBan: 2000,
      quantity: 2,
    },
  ];

  const InventoryInfo = () => (
    <View style={styles.inventoryContainer}>
      <Image
        style={styles.inventoryImage}
        source={{
          uri: 'https://i.pinimg.com/236x/19/24/c6/1924c6c35edbe90f175b019eee657c37.jpg',
        }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.titleText}>Giá trị kho hàng</Text>
          <Dropdown
            selectedTextStyle={styles.dropdownText}
            style={styles.dropdown}
            data={MONTHS}
            labelField="name"
            valueField="id"
            value={selectedMonth}
            maxHeight={120}
            containerStyle={{flex: 1, marginRight: 10}}
            onChange={setSelectedMonth}
          />
        </View>
        <View style={styles.rowContainer}>
          <ValueDetails label="Value" value="1.000.000" />
          <ValueDetails label="Quantity" value="10" />
        </View>
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
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={{uri: item.image}} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.infoText}>
          Giá nhập: <Text style={styles.priceText}>{item.giaNhap}</Text>
        </Text>
        <Text style={styles.infoText}>
          Giá bán: <Text style={styles.priceText}>{item.giaBan}</Text>
        </Text>
      </View>
      <View style={styles.quantityContainer}>
        <Text style={styles.infoText}>Số lượng: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <InventoryInfo />

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Sản phẩm</Text>
        <Dropdown
          selectedTextStyle={styles.dropdownText}
          style={styles.availabilityDropdown}
          data={AVAILABILITY_OPTIONS}
          labelField="name"
          valueField="id"
          value={selectedAvailability}
          maxHeight={120}
          onChange={setSelectedAvailability}
        />
      </View>

      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginTop: '2%'}}
        renderItem={({item}) => <ProductItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#F6F6F6',
  },
  inventoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    padding: '2%',
    marginHorizontal: '4%',
    marginTop: '5%',
    elevation: 2,
    marginBottom: '2%',
  },
  inventoryImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: '2%',
    justifyContent: 'space-around',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  dropdown: {
    height: 25,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal: '4%',
    width: 92,
  },
  dropdownText: {
    color: 'white',
    fontSize: 12,
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
    marginHorizontal: '4%',
    marginVertical: '1%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  availabilityDropdown: {
    height: 30,
    backgroundColor: 'black',
    borderRadius: 15,
    paddingHorizontal: '3%',
    width: 100,
  },
  productContainer: {
    height: 100,
    marginVertical: '2%',
    marginHorizontal: '4%',
    padding: '2%',
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  productImage: {
    width: 85,
    height: 85,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: '2%',
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
  priceText: {
    color: 'red',
  },
  quantityContainer: {
    marginHorizontal: '1%',
    alignItems: 'center',
  },
});

export default InventoryScreen;
