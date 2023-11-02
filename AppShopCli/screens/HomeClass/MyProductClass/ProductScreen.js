import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

// Array containing tab items
export const TAB_ITEMS = [
  {status: 'All'},
  {status: 'Còn hàng'},
  {status: 'Hết hàng'},
  {status: 'Bị ẩn'},
];

// Component for the product list
export const ProductList = ({navigation, productList, onToggleHide}) => (
  <FlatList
    scrollEnabled={false}
    data={productList}
    renderItem={({item}) => (
      <View style={styles.productItem}>
        {/* Header section of the product */}
        <View style={styles.itemHeader}>
          <Image style={styles.productImage} source={{uri: item.image}} />
          <View style={{marginLeft: '2%'}}>
            <Text style={styles.productName} numberOfLines={1}>
              {item.nameProduct}
            </Text>
            <Text style={styles.productPrice}>
              đ {item.price.toLocaleString().replace(/,/g, '.')}
            </Text>
          </View>
        </View>

        {/* Details and actions section of the product */}
        <View style={styles.itemDetails}>
          {['boxes', 'list'].map((icon, index) => (
            <View style={styles.icon} key={index}>
              {index === 0 ? (
                <FontAwesome5 name={icon} size={15} color={'#222222'} />
              ) : (
                <Feather name={icon} size={15} color={'#222222'} />
              )}
              <Text style={styles.tabText}>
                {index === 0 ? 'Kho hàng' : 'Đã bán'}: {item.quantity}
              </Text>
            </View>
          ))}
        </View>

        {/* Actions with the product */}
        <View style={styles.itemActions}>
          <Pressable
            style={styles.actionButton}
            onPress={() => navigation.navigate('UpdateProduct')}>
            <Text style={styles.buttonText}>Sửa</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => onToggleHide(item)}>
            <Text style={styles.buttonText}>Ẩn</Text>
          </Pressable>
        </View>
      </View>
    )}
  />
);

// Main screen displaying the product list
const ProductScreen = ({navigation}) => {
  const [status, setStatus] = useState('All');
  const [productList, setProductList] = useState([
    {
      nameProduct: "Women's Oversized Hoodie Activated",
      image:
        'https://th.bing.com/th/id/OIP.sB9FPPG22oH-iy-QmN99IAHaLH?w=139&h=208&c=7&r=0&o=5&pid=1.7',
      productAttributes: [
        {
          color: 'green',
          size: ['xl', 'l', 'xxl'],
          quantity: 5,
        },
      ],
      price: 350000,
      quantity: 5,
    },
  ]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to open/close the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to confirm hiding the product
  const confirmHideProduct = async () => {
    try {
      // Call API to hide the product
      // const response = await callHideProductAPI(selectedProduct.id);

      // If API call is successful, close the modal and update the product list
      toggleModal();
      const updatedProductList = productList.filter(
        item => item !== selectedProduct,
      );
      setProductList(updatedProductList);
    } catch (error) {
      console.error('Error calling API to hide product:', error);
      // Handle error if needed
    }
  };

  // Function to open the modal and set the selected product
  const toggleHideProduct = product => {
    setSelectedProduct(product);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      {/* Tab to select the product display status */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {TAB_ITEMS.map((data, index) => (
            <Pressable
              key={index}
              style={[
                styles.tabItem,
                data.status === status ? {borderBottomWidth: 2} : null,
              ]}
              onPress={() => setStatus(data.status)}>
              <Text style={styles.tabText}>{data.status}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Filter and search section */}
      <View style={styles.filter}>
        <View style={styles.iconView}>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="bars" size={28} color={'black'} />
            <Picker
              selectedValue={selectedValue}
              style={{width: 140}}
              onValueChange={itemValue => setSelectedValue(itemValue)}>
              <Picker.Item enabled={false} label="Sắp xếp" />
              <Picker.Item label="Tăng dần ➕" value="+" />
              <Picker.Item label="Giảm dần ➖" value="-" />
            </Picker>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('SearchScreen');
            }}>
            <AntDesign name="search1" size={28} color={'black'} />
          </Pressable>
        </View>
      </View>

      {/* Product list */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {productList ? (
          <ProductList
            navigation={navigation}
            productList={productList}
            onToggleHide={toggleHideProduct}
          />
        ) : (
          <View style={styles.noResults}>
            <Image
              style={styles.noResultsImage}
              source={require('../../../images/NoProduct.png')}
            />
            <Text style={styles.noResultsText}>
              Không tìm thấy sản phẩm nào
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modal to confirm hiding the product */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Xác nhận Ẩn sản phẩm</Text>
          <Text style={styles.modalText}>
            Bạn có chắc chắn muốn ẩn sản phẩm "{selectedProduct?.nameProduct}"?
          </Text>
          <View style={styles.modalButtons}>
            <Pressable style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Hủy</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={confirmHideProduct}>
              <Text style={styles.buttonText}>Xác nhận</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  tabText: {
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
  productItem: {
    margin: '2%',
    height: 185,
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: 'white',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: '4%',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    color: 'black',
    width: '80%',
    fontWeight: '500',
  },
  productPrice: {
    marginTop: '5%',
    color: 'black',
    fontSize: 18,
  },
  itemDetails: {
    height: '18%',
    borderTopWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    marginHorizontal: '5%',
  },
  itemActions: {
    height: '22%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    width: 80,
    height: 25,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '500',
  },
  icon: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  noResults: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  noResultsText: {
    marginTop: '2%',
    color: 'black',
  },
  modalContainer: {
    width: 320,
    height: 200,
    overflow: 'hidden',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: '5%',
  },
  modalTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    marginBottom: '10%',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    width: '48%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
