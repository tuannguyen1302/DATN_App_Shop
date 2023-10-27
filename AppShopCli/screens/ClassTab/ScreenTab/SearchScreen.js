import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {ProductList} from './ProductScreen';

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

const Search1Screen = ({navigation}) => {
  const [isCheck, setIsCheck] = useState(false);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
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

  // Khai báo ảnh hiện
  const image = (img, txt) => (
    <View style={styles.nav}>
      <Image
        style={styles.imgButton}
        source={{
          uri: img,
        }}
      />
      <Text>{txt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Kiểm tra khi ấn search */}
      {isCheck ? (
        // Màn hình tìm kiếm
        <View>
          {/* Search, back */}
          <View style={styles.header2}>
            <View style={styles.rowHeader2}>
              <View style={styles.headerSearch}>
                <Pressable>
                  <Ionicons name="search" size={24} color="black" />
                </Pressable>
                <TextInput
                  style={styles.txtInput}
                  defaultValue={search}
                  placeholder="Nhập từ khóa tìm kiếm"
                  keyboardType="default"
                  onChangeText={content => setSearch(content)}
                />
                {search.length ? (
                  <TouchableOpacity
                    style={{marginRight: '3%'}}
                    onPress={() => setSearch('')}>
                    <Feather name="x-circle" size={24} color="black" />
                  </TouchableOpacity>
                ) : null}
              </View>
              <Pressable onPress={() => navigation.goBack()}>
                <Text style={styles.txtCancel}>Hủy</Text>
              </Pressable>
            </View>
          </View>

          {/* Tab */}
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {listTab.map((data, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.listItem,
                    data.status == status ? {borderBottomWidth: 2} : null,
                  ]}
                  onPress={() => {
                    setStatus(data.status), setArray(null);
                  }}>
                  <Text style={styles.txt}>{data.status}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* List Product */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {array ? (
              <ProductList arrays={array} />
            ) : (
              //  Gọi ảnh
              image(
                'https://cdn3.iconfinder.com/data/icons/zooloostrations/1000/shopping_e-commerce___shop_store_cart_lost_item_product_empty_animal-256.png',
                'Không tìm thấy sản phẩm nào',
              )
            )}
          </ScrollView>
        </View>
      ) : (
        // Màn tìm kiếm tượng trưng
        <View>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={40} color={'black'} />
            </Pressable>
            <Pressable
              style={styles.searchHeader}
              onPress={() => setIsCheck(true)}>
              <View style={styles.view}>
                <AntDesign name="search1" size={30} />
                <Text style={{left: '20%'}}>Nhập từ khóa</Text>
              </View>
            </Pressable>
          </View>
          {/* Gọi ảnh */}
          {image(
            'https://cdn2.iconfinder.com/data/icons/business-team-9/4000/search_for_value-256.png',
            'Tìm kiếm trong shop',
          )}
        </View>
      )}
    </View>
  );
};

export default Search1Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  searchHeader: {
    flex: 0.9,
    height: 50,
    left: '20%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#DDDDDD',
  },
  view: {
    opacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  nav: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header2: {
    height: 70,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowHeader2: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '5%',
  },
  headerSearch: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingLeft: '3%',
    marginRight: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
  },
  txtInput: {
    flex: 1,
    marginHorizontal: '2%',
  },
  txtCancel: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
  },
  listItem: {
    width: 120,
    height: 40,
    marginTop: '3%',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  txt: {
    color: 'black',
    fontWeight: '400',
  },
  imgButton: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
