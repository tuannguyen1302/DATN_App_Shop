import React, { useState, useRef, useCallback, useEffect } from 'react';

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imagePath from '../../constants/imagePath';
import {
  saveProductData,
  saveTypeData,
  updateProductData,
} from '../../redux/actions/product';
import { useSelector } from 'react-redux';
import { renderProductItem } from '../../components/Product';
import { useFocusEffect } from '@react-navigation/native';

const TAB_ITEMS = [
  { status: 'all' },
  { status: 'con_hang' },
  { status: 'het_hang' },
  { status: 'private' },
];

const ProductScreen = ({ navigation }) => {
  const productList = useSelector(state => state?.product?.productData);
  const typeProduct = useSelector(state => state?.product?.typeData);
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const flatListRef = useRef();
  const bottomSheetModalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleHideProduct = async product => {
    const action = product?.isDraft ? 'hiện' : 'ẩn';
    const message = `Bạn muốn ${action} sản phẩm "${product?.product_name}"?`;

    Alert.alert(`Cảnh báo`, message, [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: async () => {
          try {
            const check = await updateProductData({
              isDraft: product?.isDraft,
              productId: product._id,
            });
            if (check) {
              ToastAndroid.show(
                `Thay đổi trạng thái ${action} thành công`,
                ToastAndroid.show,
              );
            }
          } catch (error) {
            throw error;
          }
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      // Gọi hàm tải dữ liệu ở đây
      const load = async () => {
        try {
          saveTypeData();
          setLoading(false);
          setLoading(await saveProductData(status));
        } catch (error) {
          throw error;
        }
      };
      load();
    }, [status])
  );


  const renderTabItem = ({ item, index }) => (
    <Pressable
      style={[
        styles.tabItem,
        item?.status === status && { backgroundColor: '#EEEEEE' },
      ]}
      onPress={() => {
        setStatus(item?.status);
        flatListRef.current.scrollToIndex({ index });
      }}>
      <Text
        style={[styles.tabText, item?.status === status && { color: 'black' }]}>
        {item?.status}
      </Text>
    </Pressable>
  );

  const renderFilterButton = () => (
    <Pressable
      onPress={() => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
          setIsOpen(true);
        }, 100);
      }}
      style={styles.filterButton}>
      <Ionicons name="filter-sharp" size={24} color={'black'} />
    </Pressable>
  );

  const handleTypePress = typeId => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(prevTypes => prevTypes.filter(id => id !== typeId));
    } else {
      setSelectedTypes(prevTypes => [...prevTypes, typeId]);
    }
  };

  const handleClearSelection = () => {
    setSelectedTypes([]);
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { zIndex: isOpen ? 1 : 0 }]}>
      <BottomSheetModalProvider>
        <Pressable onPress={() => bottomSheetModalRef.current?.close()}>
          <ScrollView>
            <View style={styles.filter}>
              <Pressable
                style={styles.searchButton}
                onPress={() => navigation.navigate('SearchScreen')}>
                <Text style={styles.searchButtonText}>Search</Text>
                <AntDesign
                  style={styles.searchIcon}
                  name="search1"
                  size={24}
                  color={'gray'}
                />
              </Pressable>
              {renderFilterButton()}
            </View>
            <FlatList
              scrollEnabled={false}
              ref={flatListRef}
              data={TAB_ITEMS}
              renderItem={renderTabItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            {!loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="gray" />
              </View>
            ) : productList[status] ? (
              <FlatList
                scrollEnabled={false}
                data={productList[status]}
                renderItem={({ item }) =>
                  renderProductItem(item, navigation, toggleHideProduct)
                }
                keyExtractor={item => item?._id}
              />
            ) : (
              <View style={styles.imageContainer}>
                <Image
                  style={styles.productImage2}
                  source={imagePath.noProduct}
                />
                <Text style={styles.imageText}>Tab không có sản phẩm nào</Text>
              </View>
            )}
          </ScrollView>
        </Pressable>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={['40%', '70%']}
          backgroundStyle={bottomSheetStyles.backgroundStyle}
          onDismiss={() => setIsOpen(false)}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 17,
                fontWeight: 'bold',
              }}>
              Product filler
            </Text>
            <Text style={bottomSheetStyles.subHeaderText}>Type</Text>
            <View style={bottomSheetStyles.typeContainer}>
              {typeProduct && (
                <FlatList
                  numColumns={4}
                  data={typeProduct}
                  keyExtractor={item => item._id}
                  columnWrapperStyle={bottomSheetStyles.typeColumnWrapper}
                  renderItem={({ item }) => (
                    <Pressable
                      style={[
                        bottomSheetStyles.typeItem,
                        selectedTypes.includes(item._id) && {
                          backgroundColor: '#EEEEEE',
                        },
                      ]}
                      onPress={() => handleTypePress(item._id)}>
                      <Text style={bottomSheetStyles.typeText}>
                        {item?.category_name}
                      </Text>
                    </Pressable>
                  )}
                />
              )}
            </View>
            <Text style={bottomSheetStyles.subHeaderText}>Price</Text>
            <View style={styles.buttonRow}>
              <Pressable style={bottomSheetStyles.priceButton}>
                <Text style={bottomSheetStyles.typeText}>Tăng dần</Text>
              </Pressable>
              <Pressable style={bottomSheetStyles.priceButton}>
                <Text style={bottomSheetStyles.typeText}>Giảm dần</Text>
              </Pressable>
            </View>
            <View style={bottomSheetStyles.applyButtonContainer}>
              <TouchableOpacity
                style={[
                  bottomSheetStyles.applyButton,
                  { backgroundColor: '#536EFF' },
                ]}
                onPress={() => {
                  console.log('Đã áp dụng:', selectedTypes);
                }}>
                <Text style={[bottomSheetStyles.typeText, { color: 'white' }]}>
                  Áp dụng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  bottomSheetStyles.applyButton,
                  { backgroundColor: 'gray' },
                ]}
                onPress={handleClearSelection}>
                <Text style={[bottomSheetStyles.typeText, { color: 'white' }]}>
                  Xóa bỏ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  tabItem: {
    width: 95,
    height: 35,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: '10%',
    backgroundColor: 'white',
    borderColor: '#DDDDDD',
    justifyContent: 'center',
  },
  tabText: {
    color: 'gray',
    fontWeight: '700',
  },
  filter: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: '5%',
  },
  searchButton: {
    flex: 0.95,
    height: 45,
    marginVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
  },
  searchButtonText: {
    left: 20,
  },
  searchIcon: {
    right: 20,
  },
  filterButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '3%',
  },
  applyButton: {
    marginVertical: '2%',
    borderRadius: 30,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  applyButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  productItem: {
    padding: '2%',
    elevation: 3,
    height: 120,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'gray',
    marginBottom: '2%',
    marginHorizontal: '4%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginLeft: '2%',
  },
  txt: {
    color: 'black',
    marginTop: '2%',
    marginLeft: '2%',
    fontSize: 15,
  },
  itemActions: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#E0EEEE',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: '500',
  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage2: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageText: {
    marginTop: '5%',
    color: 'black',
    fontSize: 18,
  },
});

const bottomSheetStyles = StyleSheet.create({
  backgroundStyle: {
    borderRadius: 25,
    borderWidth: 0.5,
  },
  subHeaderText: {
    marginLeft: '5%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: '2%',
  },
  typeContainer: {
    marginTop: '2%',
  },
  typeColumnWrapper: {
    justifyContent: 'center',
  },
  typeItem: {
    margin: '2%',
    width: '20%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  typeText: {
    color: 'black',
    fontWeight: '600',
  },
  priceButton: {
    width: '35%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20,
  },
  applyButtonContainer: {
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  applyButton: {
    marginVertical: '2%',
    borderRadius: 30,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;
