import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import fuzzy from 'fuzzy';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import imagePath from '../../constants/imagePath';
import {apiGet, getItem, setItem} from '../../utils/utils';
import {PRODUCT_API} from '../../config/urls';
import {renderProductItem} from '../../components/Product';

const SearchScreen = ({navigation}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [loading, setLoading] = useState(false);
  const bottomSheetModalRef = useRef(null);

  const saveSearchToHistory = async query => {
    try {
      if (query) {
        setSearchText(query);
        setIsCheck(true);
        setLoading(true);

        const existingItem = searchHistory.find(
          item => item.name.toLowerCase() === query.toLowerCase(),
        );

        if (!existingItem) {
          const newSearchItem = {id: Math.random().toString(), name: query};
          const updatedHistory = [...searchHistory, newSearchItem];

          setSearchHistory(updatedHistory);
          setItem('searchHistory', updatedHistory);
        }
      }

      const res = await apiGet(`${PRODUCT_API}/findProduct/${query}`);
      setLoading(false);
      setProductList(res?.message);
    } catch (error) {
      setLoading(false);
      console.error('Call api: ', error.message);
    }
  };

  const fetchProductList = async () => {
    try {
      const searchHis = await getItem('searchHistory');
      setSearchHistory(searchHis ? searchHis : []);

      const res = await apiGet(`${PRODUCT_API}/getAllNameProductByShop`);
      setSearchSuggestions(res?.message);
    } catch (error) {
      console.log('Call api: ', error.message);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const deleteSearchItem = async itemId => {
    try {
      const updatedHistory = searchHistory.filter(item => item.id !== itemId);
      setSearchHistory(updatedHistory);
      setItem('searchHistory', updatedHistory);
    } catch (error) {
      console.error('Delete search: ', error);
    }
  };

  const renderSearchItem = ({item}) => (
    <TouchableOpacity
      onPress={() => saveSearchToHistory(item?.id ? item.name : item)}
      style={SearchScreenStyles.searchItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesome5 name={item?.id ? 'history' : 'search'} size={23} />
        <Text style={SearchScreenStyles.searchText}>
          {item?.id ? item.name : item}
        </Text>
      </View>
      {item?.id && (
        <TouchableOpacity onPress={() => deleteSearchItem(item.id)}>
          <Feather name="x-circle" size={22} color="black" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const renderSearchList = () => {
    if (!isCheck) {
      if (searchText) {
        const filtHistory = searchHistory.filter(item =>
          fuzzy.test(searchText.toLowerCase(), item.name.toLowerCase()),
        );

        const filtSugges = searchSuggestions.filter(
          item =>
            !searchHistory.find(
              historyItem =>
                historyItem.name.toLowerCase() === item.toLowerCase(),
            ) && fuzzy.test(searchText.toLowerCase(), item.toLowerCase()),
        );

        return (
          <View>
            <FlatList
              data={filtHistory}
              renderItem={renderSearchItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
            <FlatList
              data={filtSugges}
              renderItem={renderSearchItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );
      } else {
        return (
          <View>
            {searchHistory.length ? (
              <FlatList
                data={searchHistory}
                renderItem={renderSearchItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={SearchScreenStyles.imageContainer}>
                <Image
                  style={SearchScreenStyles.productImage}
                  source={imagePath.search}
                />
                <Text style={SearchScreenStyles.imageText}>
                  Tìm kiếm trong cửa hàng
                </Text>
              </View>
            )}
          </View>
        );
      }
    } else {
      if (productList.length < 1) {
        return (
          <View style={SearchScreenStyles.imageContainer}>
            <Image
              style={SearchScreenStyles.productImage}
              source={imagePath.noProduct}
            />
            <Text style={SearchScreenStyles.imageText}>
              Không tìm thấy sản phẩm nào
            </Text>
          </View>
        );
      }

      return (
        <FlatList
          data={productList?.slice(0, visibleProducts)}
          renderItem={({item}) => renderProductItem(item, navigation, {})}
          keyExtractor={item => item?._id}
          onEndReached={() => setVisibleProducts(prev => prev + 5)}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };

  return (
    <GestureHandlerRootView style={SearchScreenStyles.container}>
      <BottomSheetModalProvider>
        <Pressable
          style={{flex: 1}}
          onPress={() => bottomSheetModalRef.current?.close()}>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '5%',
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
              Search
            </Text>
          </View>
          <View style={SearchScreenStyles.searchHeader}>
            <View
              style={{
                flex: 0.95,
                height: 45,
                marginVertical: 15,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: '#EEEEEE',
              }}
              onPress={() => navigation.navigate('SearchScreen')}>
              <TextInput
                style={SearchScreenStyles.searchInput}
                defaultValue={searchText}
                placeholder="Nhập tìm kiếm"
                returnKeyType="search"
                onFocus={() => setIsCheck(false)}
                onSubmitEditing={() => saveSearchToHistory(searchText)}
                onChangeText={setSearchText}
              />
              {searchText ? (
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => setSearchText('')}>
                  <Feather name="x-circle" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <AntDesign
                  style={{marginRight: 10}}
                  name="search1"
                  size={24}
                  color={'gray'}
                />
              )}
            </View>
            <Pressable
              onPress={() => bottomSheetModalRef.current?.present()}
              style={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#EEEEEE',
                borderRadius: 15,
              }}>
              <Ionicons name="filter-sharp" size={24} color={'black'} />
            </Pressable>
          </View>
          {loading ? (
            <View style={SearchScreenStyles.loadingContainer}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          ) : (
            renderSearchList()
          )}
        </Pressable>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={['25%', '50%']}
          backgroundStyle={{
            borderRadius: 25,
            borderWidth: 0.5,
          }}>
          <View style={{flex: 1}}></View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const SearchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchHeaderView: {
    alignSelf: 'center',
    width: '85%',
    marginVertical: '2%',
    height: 45,
    padding: 5,
    backgroundColor: '#DDDDDD',
    borderRadius: 10,
  },
  searchPlaceholder: {
    marginLeft: '5%',
    fontSize: 15,
    color: 'gray',
  },
  imageContainer: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchHeader: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    marginVertical: '1%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBox: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingLeft: '3%',
    marginRight: '4%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: '2%',
    color: 'black',
  },
  cancelText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500',
    marginRight: '5%',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  imageText: {
    marginTop: '5%',
    color: 'black',
    fontSize: 18,
  },
  searchItem: {
    padding: 5,
    height: 40,
    marginBottom: '1%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    justifyContent: 'space-between',
  },
  searchText: {
    left: '20%',
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
