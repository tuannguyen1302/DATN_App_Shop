import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {TAB_ITEMS} from './ProductScreen';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('All');
  const [array, setArray] = useState('');
  const [searchHis, setSearchHis] = useState('');

  const renderImage = (img, text) => (
    <View style={styles.imageContainer}>
      <Image style={styles.productImage} source={img} />
      <Text style={styles.imageText}>{text}</Text>
    </View>
  );

  const renderTabItem = ({item}) => (
    <Pressable
      style={[styles.tabItem, item.status === status && styles.selectedTab]}
      onPress={() => setStatus(item.status)}>
      <Text style={styles.tabText}>{item.status}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {isSearching ? (
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

          {searchHis && (
            <FlatList
              data={TAB_ITEMS}
              renderItem={renderTabItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}

          {array && (
            <FlatList
              data={TAB_ITEMS}
              renderItem={renderTabItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      ) : (
        <View>
          <View style={[styles.header, styles.searchHeaderButton]}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color={'black'} />
            </Pressable>
            <Pressable
              style={styles.searchHeaderView}
              onPress={() => setIsSearching(true)}>
              <AntDesign name="search1" size={30} />
              <Text style={styles.searchPlaceholder}>Nhập từ khóa</Text>
            </Pressable>
          </View>
          {renderImage(
            require('../../../images/Search.png'),
            'Tìm kiếm trong cửa hàng',
          )}
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
  searchPlaceholder: {marginLeft: '5%', color: '#BBBBBB'},
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
  clearSearchButton: {marginRight: '3%'},
  cancelText: {
    color: 'red',
    fontSize: 18,
    fontWeight: '500',
    marginRight: '5%',
  },
  tabItem: {
    width: 100,
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
    borderBottomColor: 'black',
  },
  tabText: {
    color: 'black',
    fontWeight: '500',
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
    fontWeight: '500',
  },
});

export default SearchScreen;
