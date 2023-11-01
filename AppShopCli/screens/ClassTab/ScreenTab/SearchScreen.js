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

// Màn hình tìm kiếm
const SearchScreen = () => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('All');
  const [productList, setProductList] = useState([
    {
      nameProduct: 'Áo hoodie ngắn tay hình mặt mèo',
      image:
        'https://th.bing.com/th/id/R.8b7d5b399d740757411454b84783aff1?rik=SpcCP%2fi%2bsF1ktw&pid=ImgRaw&r=0',
      attributes: [
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

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hàm mở/đóng modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Hàm xác nhận ẩn sản phẩm
  const confirmHideProduct = async () => {
    // Gọi API ẩn sản phẩm
    try {
      // const response = await callHideProductAPI(selectedProduct.id);

      // Nếu API gọi thành công, đóng modal và cập nhật danh sách sản phẩm
      toggleModal();
      const updatedProductList = productList.filter(
        item => item !== selectedProduct,
      );
      setProductList(updatedProductList);
    } catch (error) {
      console.error('Lỗi khi gọi API ẩn sản phẩm:', error);
      // Xử lý lỗi nếu cần
    }
  };

  // Hàm mở modal và set sản phẩm được chọn
  const toggleHideProduct = product => {
    setSelectedProduct(product);
    toggleModal();
  };

  // Hàm hiển thị ảnh với text tương ứng
  const renderImage = (img, text) => (
    <View style={styles.imageContainer}>
      <Image style={styles.productImage} source={img} />
      <Text>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isSearching ? (
        // Màn hình tìm kiếm
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
              <Text style={styles.cancelText}>Hủy</Text>
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

          {/* Danh sách sản phẩm */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {productList ? (
              <ProductList
                productList={productList}
                onToggleHide={toggleHideProduct}
              />
            ) : (
              // Hiển thị ảnh
              renderImage(
                require('../../../image/NoProduct.png'),
                'Không tìm thấy sản phẩm nào',
              )
            )}
          </ScrollView>
        </View>
      ) : (
        // Màn hình tìm kiếm tượng trưng
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
                <Text style={{left: '20%'}}>Nhập từ khóa</Text>
              </View>
            </Pressable>
          </View>
          {/* Hiển thị ảnh */}
          {renderImage(
            require('../../../image/Search.png'),
            'Tìm kiếm trong shop',
          )}
        </View>
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Xác nhận ẩn sản phẩm</Text>
          <Text style={styles.modalText}>
            Bạn có chắc muốn ẩn sản phẩm "{selectedProduct?.nameProduct}" không?
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
