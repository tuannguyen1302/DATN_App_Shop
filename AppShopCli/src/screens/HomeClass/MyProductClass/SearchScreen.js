import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import fuzzy from 'fuzzy';
import axios from 'axios';
import {SOCKET_URL} from '../../../utils/socketService';
import {renderProductItem} from './ProductScreen';

const SearchScreen = ({navigation}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [loading, setLoading] = useState(false);

  const getHeaders = () => ({
    headers: {
      'x-xclient-id': '654c895786644a5c7ac507df',
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNzAwMjkwOTk2LCJleHAiOjE3MDExNTQ5OTZ9.lzUBd4bBCBd6zUsjp9S5C47ofetyCEZ9_aTEZcpxYJY',
    },
  });

  const loadSearchHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('searchHistory');
      storedHistory && setSearchHistory(JSON.parse(storedHistory));
    } catch (error) {
      console.error('Error loading search history', error);
    }
  };

  const toggleHideProduct = async product => {
    const action = product?.isDraft ? 'hiện' : 'ẩn';
    const message = `Bạn muốn ${action} sản phẩm "${product?.product_name}"?`;

    Alert.alert('Xác nhận ẩn sản phẩm', message, [
      {
        text: 'Hủy',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Xác nhận',
        onPress: async () => {
          try {
            const endpoint = `${SOCKET_URL}v1/api/product/${
              product?.isDraft ? 'unpublishById' : 'publishById'
            }/${product?._id}`;
            await axios.put(endpoint, {}, getHeaders());
            getApi(searchText);
            ToastAndroid.show(
              `Thay đổi trạng thái ${action} thành công`,
              ToastAndroid.show,
            );
          } catch (error) {
            console.log('Put api: ', error.message);
          }
        },
      },
    ]);
  };

  const saveSearchToHistory = async query => {
    try {
      setSearchText(query);
      setIsCheck(true);
      setLoading(true);

      if (query) {
        const existingItem = searchHistory.find(
          item => item.name.toLowerCase() === query.toLowerCase(),
        );

        if (!existingItem) {
          const newSearchItem = {id: Math.random().toString(), name: query};
          const updatedHistory = [...searchHistory, newSearchItem];

          setSearchHistory(updatedHistory);
          await AsyncStorage.setItem(
            'searchHistory',
            JSON.stringify(updatedHistory),
          );
        }
      }
      getApi(query);
    } catch (error) {
      console.error('Error save history', error);
    }
  };

  const getApi = async query => {
    try {
      const response = await axios.get(
        `${SOCKET_URL}v1/api/product/findProduct/${query}`,
        getHeaders(),
      );
      setLoading(false);
      setProductList(response.data.message);
    } catch (error) {
      setLoading(false);
      console.log('Call api: ', error.message);
    }
  };

  const fetchProductList = async () => {
    try {
      const response = await axios.get(
        `${SOCKET_URL}v1/api/product/getAllNameProductByShop`,
        getHeaders(),
      );
      setSearchSuggestions(response.data.message);
    } catch (error) {
      console.log('Error calling API: ', error.message);
    }
  };

  const renderSearchItem = ({item}) => (
    <Pressable
      onPress={() => saveSearchToHistory(item?.id ? item.name : item)}
      style={styles.searchItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesome5 name={item?.id ? 'history' : 'search'} size={20} />
        <Text style={styles.searchText}>{item?.id ? item.name : item}</Text>
      </View>
      {item?.id && (
        <TouchableOpacity onPress={() => deleteSearchItem(item.id)}>
          <Feather name="x-circle" size={20} color="black" />
        </TouchableOpacity>
      )}
    </Pressable>
  );

  const deleteSearchItem = async itemId => {
    try {
      const updatedHistory = searchHistory.filter(item => item.id !== itemId);
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(
        'searchHistory',
        JSON.stringify(updatedHistory),
      );
    } catch (error) {
      console.error('Error deleting search history item', error);
    }
  };

  const onEndReached = () =>
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 5);

  const renderSearchList = () => {
    if (!isCheck) {
      if (searchText) {
        const filteredSearchHistory = searchHistory.filter(item =>
          fuzzy.test(searchText.toLowerCase(), item.name.toLowerCase()),
        );

        const filteredSearchSuggestions = searchSuggestions.filter(
          item =>
            !searchHistory.find(
              historyItem =>
                historyItem.name.toLowerCase() === item.toLowerCase(),
            ) && fuzzy.test(searchText.toLowerCase(), item.toLowerCase()),
        );

        return (
          <View>
            <FlatList
              data={filteredSearchHistory}
              renderItem={renderSearchItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
            <FlatList
              data={filteredSearchSuggestions}
              renderItem={renderSearchItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </View>
        );
      } else {
        return (
          <FlatList
            data={searchHistory}
            renderItem={renderSearchItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        );
      }
    } else {
      if (productList.length === 0) {
        return (
          <View style={styles.imageContainer}>
            <Image
              style={styles.productImage}
              source={require('../../../../images/NoProduct.png')}
            />
            <Text style={styles.imageText}>Không tìm thấy sản phẩm nào</Text>
          </View>
        );
      }
      return (
        <FlatList
          data={productList?.slice(0, visibleProducts)}
          renderItem={({item}) =>
            renderProductItem(item, navigation, toggleHideProduct)
          }
          keyExtractor={item => item?._id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
        />
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProductList();
      loadSearchHistory();
    }, []),
  );

  return (
    <View style={styles.container}>
      {isSearching ? (
        <View style={{flex: 1}}>
          <View style={styles.searchHeader}>
            <View style={styles.searchBox}>
              <Pressable>
                <Ionicons name="search" size={24} color="black" />
              </Pressable>
              <TextInput
                style={styles.searchInput}
                defaultValue={searchText}
                placeholder="Nhập tìm kiếm"
                returnKeyType="search"
                onFocus={() => setIsCheck(false)}
                onSubmitEditing={() => saveSearchToHistory(searchText)}
                onChangeText={content => setSearchText(content)}
              />
              {searchText && (
                <TouchableOpacity
                  style={styles.clearSearchButton}
                  onPress={() => setSearchText('')}>
                  <Feather name="x-circle" size={24} color="black" />
                </TouchableOpacity>
              )}
            </View>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          ) : (
            renderSearchList()
          )}
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={[styles.header, styles.searchHeaderButton]}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color={'black'} />
            </Pressable>
            <Pressable
              style={styles.searchHeaderView}
              onPress={() => setIsSearching(true)}>
              <AntDesign name="search1" size={30} />
              <Text style={styles.searchPlaceholder}>Tìm kiếm</Text>
            </Pressable>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.productImage}
              source={require('../../../../images/Search.png')}
            />
            <Text style={styles.imageText}>Tìm kiếm trong cửa hàng</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchHeaderButton: {
    height: 50,
    marginHorizontal: '5%',
    borderRadius: 10,
  },
  searchHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    width: '80%',
  },
  searchPlaceholder: {
    marginLeft: '5%',
    color: '#BBBBBB',
  },
  imageContainer: {
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchHeader: {
    height: 55,
    flexDirection: 'row',
    padding: '2%',
    alignItems: 'center',
    backgroundColor: 'white',
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
  clearSearchButton: {
    marginRight: '3%',
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
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: '1%',
  },
  searchText: {
    marginLeft: '2%',
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
