import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {PRODUCT_API, API_BASE_URL} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {formatCurrency} from '../../components/Price';
import {Rating} from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const ProductItem = ({navigation, route}) => {
  const {id} = route.params;
  const [productData, setProductData] = useState(null);

  const getApi = async () => {
    try {
      const res = await apiGet(`${PRODUCT_API}/getProduct/${id}`);
      setProductData(res?.message);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.title}>Product Information</Text>
      </View>

      {productData && (
        <ScrollView style={styles.content}>
          <Swiper
            style={styles.swiperContainer}
            showsButtons={true}
            activeDotColor="white"
            dotColor="gray">
            {productData.product_thumb.map((image, index) => (
              <Image
                key={index}
                style={styles.productImage}
                source={{uri: `${API_BASE_URL}uploads/${image}`}}
              />
            ))}
          </Swiper>

          <Card containerStyle={styles.cardContainer}>
            <Card.Title style={styles.cardTitle}>
              {productData.product_name}
            </Card.Title>
            <Card.Divider />
            <View style={styles.productInfo}>
              <Text style={styles.productPrice}>
                {formatCurrency(productData.product_price)}
              </Text>
              <Rating
                type="star"
                startingValue={productData?.product_ratingAverage}
                readonly
                imageSize={20}
                ratingBackgroundColor="#ccc"
              />
            </View>

            <FlatList
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              data={productData?.product_attributes}
              keyExtractor={item => item?._id}
              renderItem={({item}) => <AttributeItem item={item} />}
            />

            <Text style={styles.sectionTitle}>Mô tả</Text>
            <Text style={styles.productDescription}>
              {productData.product_description}
            </Text>
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

const AttributeItem = ({item}) => (
  <View style={styles.attributeItem}>
    <Text style={styles.attributeLabel}>{item?.color}</Text>
    <Text style={styles.totalQuantity}>Tổng: {item?.quantity}</Text>

    <View style={styles.sizeContainer}>
      {item?.options.map((value, index) => (
        <View key={index} style={styles.sizeItem}>
          <Text style={styles.sizeLabel}>{value.size}</Text>
          <Text style={styles.quantityLabel}>{value.options_quantity}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  title: {
    left: '30%',
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  swiperContainer: {
    height: height * 0.3,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardContainer: {
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'red',
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '600',
  },
  attributeItem: {
    marginTop: 10,
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 8,
  },
  attributeLabel: {
    fontWeight: 'bold',
    fontSize: width * 0.035,
  },
  totalQuantity: {
    marginTop: 5,
    color: '#6B6B6B',
  },
  sizeContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  sizeItem: {
    backgroundColor: '#9F9F9F',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeLabel: {
    color: 'white',
    marginRight: 5,
  },
  quantityLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: width * 0.035,
    lineHeight: 24,
    color: 'black',
    marginVertical: 5,
  },
});

export default ProductItem;
