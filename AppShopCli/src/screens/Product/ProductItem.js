import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Card} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import {PRODUCT_API, API_BASE_URL} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {formatCurrency} from '../../components/Price';
import {Rating, AirbnbRating} from 'react-native-elements';

const ProductItem = ({navigation, route}) => {
  const {id} = route.params;
  const [productData, setProductData] = useState(null);

  const getApi = async () => {
    try {
      const res = await apiGet(`${PRODUCT_API}/getProduct/${id}`);
      console.log(res);
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

              {/* AirbnbRating component with customizable stars */}
              {/* <AirbnbRating
                  count={5} // Số sao tối đa
                  reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']} // Nhãn cho từng sao
                  defaultRating={1} // Số sao mặc định
                  size={20} // Kích thước của từng sao
                /> */}
            </View>
            <Text style={styles.productDescription}>
              {productData.product_description}
            </Text>
          </Card>
        </ScrollView>
      )}
    </View>
  );
};

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
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  swiperContainer: {
    height: 300,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  addButton: {
    backgroundColor: 'green',
    borderRadius: 5,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: 'gray',
    marginBottom: 16,
  },
});

export default ProductItem;
