import {StyleSheet, View} from 'react-native';
import {Text, TouchableOpacity, Pressable} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import {API_BASE_URL} from '../config/urls';
import {formatCurrency} from './Price';

export const renderProductItem = (item, navigation, toggleHideProduct) => (
  <Pressable
    onPress={() => navigation.navigate('ProductItem', {id: item?._id})}
    style={styles.productItem}>
    <TouchableOpacity onPress={() => toggleHideProduct(item)}>
      <FastImage
        style={styles.productImage}
        source={{uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}`}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{position: 'absolute', right: 0}}>
        <Octicons
          name={item?.isDraft ? 'eye-closed' : 'eye'}
          size={20}
          color={'black'}
        />
      </View>
    </TouchableOpacity>

    <View style={{flex: 1}}>
      <Text style={styles.productName} numberOfLines={1}>
        {item?.product_name}
      </Text>
      <Text style={styles.txt}>
        Trạng thái:{' '}
        <Text style={{color: item?.product_quantity ? 'green' : 'red'}}>
          {item?.product_quantity ? 'còn hàng' : 'hết hàng'}
        </Text>
      </Text>
      <Text style={styles.txt}>
        Kho: {item?.product_quantity} | Bán: {item?.product_sold}
      </Text>
    </View>
    <View style={styles.itemActions}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate('UpdateProduct', {item})}>
        <FontAwesome name="edit" size={20} color={'black'} />
      </TouchableOpacity>
      <Text style={[styles.txt, {color: 'red', fontWeight: '700'}]}>
        {formatCurrency(item?.product_price)}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  productItem: {
    padding: '1%',
    elevation: 3,
    height: 110,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'gray',
    marginBottom: '2%',
    marginHorizontal: '2%',
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
});

export default styles;
