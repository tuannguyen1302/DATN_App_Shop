import React, {useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {ProductList, TAB_ITEMS} from './ProductScreen';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

// Search screen
const SearchScreen = () => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
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

  // Function to render an image with corresponding text
  const renderImage = (img, text) => (
    <View style={styles.imageContainer}>
      <Image style={styles.productImage} source={img} />
      <Text>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isSearching ? (
        // Search screen
        <View>
          <View style={styles.searchHeader}>
            <View style={styles.searchBox}>
              <Pressable>
                <Ionicons name="search" size={24} color="black" />
              </Pressable>
              <TextInput
                style={styles.searchInput}
                defaultValue={searchText}
                placeholder="Nhập từ khóa tìm kiếm"
                keyboardType="default"
                onChangeText={content => setSearchText(content)}
              />
              {searchText.length ? (
                <TouchableOpacity
                  style={styles.clearSearchButton}
                  onPress={() => setSearchText('')}>
                  <Feather name="x-circle" size={24} color="black" />
                </TouchableOpacity>
              ) : null}
            </View>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>

          {/* Tab */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {TAB_ITEMS.map((tab, index) => (
              <Pressable
                key={index}
                style={[
                  styles.tabItem,
                  tab.status === status ? styles.selectedTab : null,
                ]}
                onPress={() => {
                  setStatus(tab.status);
                  setProductList(null);
                }}>
                <Text style={styles.tabText}>{tab.status}</Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Product list */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {productList ? (
              <ProductList
                productList={productList}
                onToggleHide={toggleHideProduct}
              />
            ) : (
              // Display image
              renderImage(
                require('../../../images/NoProduct.png'),
                'Không tìm thấy sản phẩm nào',
              )
            )}
          </ScrollView>
        </View>
      ) : (
        // Symbolic search screen
        <View>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={40} color={'black'} />
            </Pressable>
            <Pressable
              style={styles.searchHeaderButton}
              onPress={() => setIsSearching(true)}>
              <View style={styles.searchHeaderView}>
                <AntDesign name="search1" size={30} />
                <Text style={{left: '20%'}}>Enter keyword</Text>
              </View>
            </Pressable>
          </View>
          {/* Display image */}
          {renderImage(
            require('../../../images/Search.png'),
            'Tìm kiếm trong cửa hàng',
          )}
        </View>
      )}

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
  },
  header: {
    height: '18%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  searchHeaderButton: {
    flex: 0.9,
    height: 50,
    left: '20%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#DDDDDD',
  },
  searchHeaderView: {
    opacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  imageContainer: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header2: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '5%',
    backgroundColor: 'white',
  },
  searchHeader: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '5%',
    backgroundColor: 'white',
  },
  searchBox: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    paddingLeft: '3%',
    marginRight: '5%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: '2%',
  },
  clearSearchButton: {
    marginRight: '3%',
  },
  cancelText: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
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
  selectedTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    color: 'black',
    fontWeight: '400',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
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
  buttonText: {
    color: 'black',
    fontWeight: '500',
  },
});

export default SearchScreen;
