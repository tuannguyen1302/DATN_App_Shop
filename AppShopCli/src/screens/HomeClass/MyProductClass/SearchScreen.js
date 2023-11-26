import React, {useState, useCallback} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import fuzzy from 'fuzzy';
import {renderProductItem} from './ProductScreen';
import imagePath from '../../../constants/imagePath';
import {apiGet, getItem, setItem} from '../../../utils/utils';
import {PRODUCT_API} from '../../../config/urls';

const SearchScreen = ({navigation}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(5);
  const [loading, setLoading] = useState(false);

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

  useFocusEffect(
    useCallback(() => {
      fetchProductList();
    }, []),
  );

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
    <Pressable
      onPress={() => saveSearchToHistory(item?.id ? item.name : item)}
      style={styles.searchItem}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesome5 name={item?.id ? 'history' : 'search'} size={23} />
        <Text style={styles.searchText}>{item?.id ? item.name : item}</Text>
      </View>
      {item?.id && (
        <TouchableOpacity onPress={() => deleteSearchItem(item.id)}>
          <Feather name="x-circle" size={22} color="black" />
        </TouchableOpacity>
      )}
    </Pressable>
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
              <View style={styles.imageContainer}>
                <Image style={styles.productImage} source={imagePath.search} />
                <Text style={styles.imageText}>Tìm kiếm trong cửa hàng</Text>
              </View>
            )}
          </View>
        );
      }
    } else {
      if (productList.length < 1) {
        return (
          <View style={styles.imageContainer}>
            <Image style={styles.productImage} source={imagePath.noProduct} />
            <Text style={styles.imageText}>Không tìm thấy sản phẩm nào</Text>
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
    <View style={styles.container}>
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
              onChangeText={setSearchText}
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
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 55,
    flexDirection: 'row',
    padding: '2%',
    borderColor: '#D9D9D9',
    alignItems: 'center',
    borderBottomWidth: 1,
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
    padding: '2%',
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
