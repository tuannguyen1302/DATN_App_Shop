import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const listTab = [
  {
    status: 'All',
  },
  {
    status: 'Còn hàng',
  },
  {
    status: 'Hết hàng',
  },
  {
    status: 'Bị ẩn',
  },
];

const ProductScreen = props => {
  const {id, navigation} = props;
  const [status, setStatus] = useState('All');
  const [array, setArray] = useState([
    {
      nameProduct: 'Oto lamborghini aventador j',
      category: 1,
      image:
        'https://th.bing.com/th/id/OIP.LgNenfKk_mgSpG3-kVEzuAHaE2?w=258&h=180&c=7&r=0&o=5&pid=1.7',
      product_attributes: [
        {
          color: 'Xanh',
          size: ['xl', 'l', 'xxl'],
          quantity: 5,
        },
      ],
      des: 'Là sản phẩm cho của giới thượng lưu ...',
      price: 3500000,
      quantity: 5,
      shopId: 5,
      product_ratingAverage: 4,
    },
    {
      nameProduct: 'Oto lamborghini aventador j',
      category: 1,
      image:
        'https://th.bing.com/th/id/OIP.h8s_-BU7Y1c1fK_jmDtGWQHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7',
      product_attributes: [
        {
          color: 'Xanh',
          size: ['xl', 'l', 'xxl'],
          quantity: 5,
        },
      ],
      des: 'Là sản phẩm cho của giới thượng lưu ...',
      price: 3500000,
      quantity: 5,
      shopId: 5,
      product_ratingAverage: 4,
    },
  ]);
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <View style={styles.container}>
      {/* Tab */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listTab.map((data, index) => (
            <Pressable
              key={index}
              style={[
                styles.listItem,
                data.status == status ? {borderBottomWidth: 3} : null,
              ]}
              onPress={() => {
                setStatus(data.status), setArray(null);
              }}>
              <Text>{data.status}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      {/* Serach */}
      <View style={styles.filter}>
        <View style={styles.iconView}>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="bars" size={28} />
            {/* Chọn tăng giảm product */}
            <Picker
              selectedValue={selectedValue}
              style={{
                width: 140,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item enabled={false} label="Sắp xếp" />
              <Picker.Item label="Tăng" value="+" />
              <Picker.Item label="Giảm" value="-" />
            </Picker>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SearchScreen')}>
            <AntDesign name="search1" size={28} />
          </Pressable>
        </View>
      </View>
      {/* List Product */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {array ? (
          array.map((data, index) => {
            return (
              <View key={index} style={styles.itemProduct}>
                <View style={styles.item1}>
                  <Image style={styles.imageItem} source={{uri: data.image}} />
                  <View style={{left: '10%'}}>
                    <Text style={styles.txtName}>{data.nameProduct}</Text>
                    <Text style={styles.txtPrice}>
                      đ {data.price.toLocaleString().replace(/,/g, '.')}
                    </Text>
                  </View>
                </View>
                <View style={styles.item2}>
                  <View style={styles.icon}>
                    <FontAwesome5 name="boxes" size={15} />
                    <Text>Kho hàng: {data.quantity}</Text>
                  </View>
                  <View style={styles.icon}>
                    <Feather name="list" size={15} />
                    <Text>Đã bán: {data.quantity}</Text>
                  </View>
                </View>
                <View style={styles.item3}>
                  <Pressable style={styles.btn}>
                    <Text>Sửa</Text>
                  </Pressable>
                  <Pressable style={styles.btn}>
                    <Text>Ẩn</Text>
                  </Pressable>
                </View>
              </View>
            );
          })
        ) : (
          <Image
            style={{
              width: 300,
              height: 300,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={require('../../../image/No1.png')}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  listItem: {
    width: 120,
    height: 40,
    marginTop: '1%',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  filter: {
    marginTop: '2%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  iconView: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemProduct: {
    margin: '2%',
    height: 185,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: 'white',
  },
  item1: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '4%',
  },
  imageItem: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  txtName: {
    fontSize: 18,
    fontWeight: '500',
  },
  txtPrice: {
    marginTop: '5%',
    fontSize: 18,
  },
  item2: {
    height: '18%',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    marginHorizontal: '5%',
  },
  item3: {
    height: '22%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    width: 80,
    height: 25,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
