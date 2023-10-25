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
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// List Tab
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

// Cho phep cac componet khac được sử dụng lại nó
export const ProductList = ({arrays}) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={arrays}
      renderItem={({item}) => (
        <View style={styles.itemProduct}>
          <View style={styles.item1}>
            <Image style={styles.imageItem} source={{uri: item.image}} />
            <View style={{left: '10%'}}>
              <Text style={styles.txtName}>{item.nameProduct}</Text>
              <Text style={styles.txtPrice}>
                đ {item.price.toLocaleString().replace(/,/g, '.')}
              </Text>
            </View>
          </View>
          <View style={styles.item2}>
            <View style={styles.icon}>
              <FontAwesome5 name="boxes" size={15} color={'#222222'} />
              <Text style={styles.txt}>Kho hàng: {item.quantity}</Text>
            </View>
            <View style={styles.icon}>
              <Feather name="list" size={15} color={'#222222'} />
              <Text style={styles.txt}>Đã bán: {item.quantity}</Text>
            </View>
          </View>
          <View style={styles.item3}>
            <Pressable style={styles.btn}>
              <Text style={styles.txt}>Sửa</Text>
            </Pressable>
            <Pressable style={styles.btn}>
              <Text style={styles.txt}>Ẩn</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

const ProductScreen = props => {
  // Nhận từ componer chính
  const {id, navigation} = props;
  // Kiem tra khi an chuyen tab
  const [status, setStatus] = useState('All');
  // Dữ liệu dùng để render
  const [array, setArray] = useState([
    {
      nameProduct: 'Áo Hoodie Oversized Nữ Activated',
      image:
        'https://th.bing.com/th/id/OIP.sB9FPPG22oH-iy-QmN99IAHaLH?w=139&h=208&c=7&r=0&o=5&pid=1.7',
      product_attributes: [
        {
          color: 'green',
          size: ['xl', 'l', 'xxl'],
          quantity: 5,
        },
      ],
      price: 350000,
      quantity: 5,
    },
    {
      nameProduct: 'Áo hoodie ngắn tay hình mặt mèo',
      image:
        'https://th.bing.com/th/id/R.8b7d5b399d740757411454b84783aff1?rik=SpcCP%2fi%2bsF1ktw&pid=ImgRaw&r=0',
      product_attributes: [
        {
          color: 'yellow',
          size: ['xl', 'l', 'xxl'],
          quantity: 5,
        },
      ],
      price: 250000,
      quantity: 5,
    },
  ]);
  // Lựa chọn giá tăng giảm
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <View style={styles.container}>
      {/* Danh sách tab */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {listTab.map((data, index) => (
            <Pressable
              key={index}
              style={[
                styles.tabItem,
                data.status === status ? {borderBottomWidth: 2} : null,
              ]}
              onPress={() => {
                setStatus(data.status), setArray(null);
              }}>
              <Text style={styles.txt}>{data.status}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Giá tăng, giảm, tìm kiếm sản phẩm */}
      <View style={styles.filter}>
        <View style={styles.iconView}>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="bars" size={28} color={'black'} />
            {/* Chọn tăng giảm product */}
            <Picker
              selectedValue={selectedValue}
              style={{
                width: 140,
              }}
              onValueChange={itemValue => setSelectedValue(itemValue)}>
              <Picker.Item enabled={false} label="Sắp xếp" />
              <Picker.Item label="Tăng" value="+" />
              <Picker.Item label="Giảm" value="-" />
            </Picker>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SearchScreen')}>
            <AntDesign name="search1" size={28} color={'black'} />
          </Pressable>
        </View>
      </View>

      {/* Hiển thị sản phẩm */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {array ? (
          <ProductList arrays={array} />
        ) : (
          <View style={styles.nav}>
            <Image
              style={styles.imgButton}
              source={{
                uri: 'https://cdn3.iconfinder.com/data/icons/zooloostrations/1000/shopping_e-commerce___shop_store_cart_lost_item_product_empty_animal-256.png',
              }}
            />
            <Text>Không tìm thấy sản phẩm nào</Text>
          </View>
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
  tabItem: {
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
  txt: {
    color: 'black',
    fontWeight: '500',
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
    color: 'black',
    fontWeight: '400',
  },
  txtPrice: {
    marginTop: '5%',
    color: 'black',
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
    borderColor: 'black',
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
  nav: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgButton: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
