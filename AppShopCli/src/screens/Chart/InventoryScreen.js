import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Dropdown} from 'react-native-element-dropdown';
import {InvenStyle} from './styles';

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

const InventoryScreen = ({navigation}) => {
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
    <View style={InvenStyle.inventoryContainer}>
      <Image
        style={InvenStyle.inventoryImage}
        source={{
          uri: 'https://i.pinimg.com/236x/19/24/c6/1924c6c35edbe90f175b019eee657c37.jpg',
        }}
      />
      <View style={InvenStyle.infoContainer}>
        <View style={InvenStyle.rowContainer}>
          <Text style={InvenStyle.titleText}>Giá trị kho hàng</Text>
          <Dropdown
            selectedTextStyle={InvenStyle.dropdownText}
            style={InvenStyle.dropdown}
            data={MONTHS}
            labelField="name"
            valueField="id"
            value={selectedMonth}
            maxHeight={120}
            containerStyle={{flex: 1, marginRight: 10}}
            onChange={setSelectedMonth}
          />
        </View>
        <View style={InvenStyle.rowContainer}>
          <ValueDetails label="Giá trị" value="1.000.000" />
          <ValueDetails label="Số lượng" value="10" />
        </View>
      </View>
    </View>
  );

  const ValueDetails = ({label, value}) => (
    <View style={InvenStyle.valueContainer}>
      <Text style={InvenStyle.valueLabel}>{label}</Text>
      <Text style={InvenStyle.valueText}>{value}</Text>
    </View>
  );

  const ProductItem = ({item}) => (
    <View style={InvenStyle.productContainer}>
      <Image style={InvenStyle.productImage} source={{uri: item.image}} />
      <View style={InvenStyle.productInfo}>
        <Text style={InvenStyle.productName}>{item.name}</Text>
        <Text style={InvenStyle.infoText}>
          Giá nhập: <Text style={InvenStyle.priceText}>{item.giaNhap}</Text>
        </Text>
        <Text style={InvenStyle.infoText}>
          Giá bán: <Text style={InvenStyle.priceText}>{item.giaBan}</Text>
        </Text>
      </View>
      <View style={InvenStyle.quantityContainer}>
        <Text style={InvenStyle.infoText}>Số lượng: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={InvenStyle.container}>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEEEEE',
            borderRadius: 15,
          }}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text
          style={{
            left: '30%',
            fontSize: 22,
            color: 'black',
            fontWeight: '600',
          }}>
          Ware House
        </Text>
      </View>

      <InventoryInfo />

      <View style={InvenStyle.footerContainer}>
        <Text style={InvenStyle.footerText}>Sản phẩm</Text>
        <Dropdown
          selectedTextStyle={InvenStyle.dropdownText}
          style={InvenStyle.availabilityDropdown}
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

export default InventoryScreen;
