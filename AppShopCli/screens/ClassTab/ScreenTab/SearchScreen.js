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

const Search1Screen = ({navigation}) => {
  const [isCheck, setIsCheck] = useState(false);

  const [search, setSearch] = useState('');
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

  return (
    <View style={styles.container}>
      {/* Kiểm tra khi ấn search */}
      {isCheck ? (
        // Màn hình tìm kiếm
        <View>
          {/* Search, back */}
          <View style={styles.header2}>
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
          {/* List Product */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {array ? (
              array.map((data, index) => {
                return (
                  <View key={index} style={styles.itemProduct}>
                    <View style={styles.item1}>
                      <Image
                        style={styles.imageItem}
                        source={{uri: data.image}}
                      />
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
      ) : (
        // Màn tìm kiếm tượng trưng
        <View>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={40} />
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
          <View style={styles.nav}>
            <Image source={require('../../../image/No2.png')} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Search1Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '3%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
  },
  header2: {
    marginTop: '2%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
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
  filter: {
    marginTop: '2%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  iconView: {
    flexDirection: 'row',
    marginHorizontal: '5%',
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
