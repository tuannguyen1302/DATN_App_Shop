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
import Swiper from 'react-native-swiper';
import {formatCurrency} from '../../components/Price';
import {Rating} from 'react-native-elements';
import {API_BASE_URL, PRODUCT_API} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';
import {useSelector} from 'react-redux';
import Comment from '../Rating/Comment';

const {width, height} = Dimensions.get('window');

const ProductItem = ({navigation, route}) => {
  const typeProduct = useSelector(state => state?.product?.typeData);
  const {id} = route.params;
  const [productData, setProductData] = useState(null);
  const [isExpanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiGet(`${PRODUCT_API}/getProduct/${id}`);
        setProductData(res?.message);
      } catch (error) {
        throw error;
      }
    };

    fetchData();
  }, [id]);

  const toggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      {productData && (
        <ScrollView style={styles.content}>
          <ImageSlider images={productData.product_thumb} />
          <ProductDetails
            navigation={navigation}
            typeProduct={typeProduct}
            productData={productData}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
          />
        </ScrollView>
      )}
    </View>
  );
};

const Header = ({navigation}) => (
  <View style={styles.header}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backButton}>
      <AntDesign name="left" size={20} color={'black'} />
    </TouchableOpacity>
    <Text style={styles.title}>Product Information</Text>
  </View>
);

const ImageSlider = ({images}) => (
  <Swiper
    autoplay
    autoplayTimeout={5}
    style={styles.swiperContainer}
    activeDotColor="white"
    dotColor="gray">
    {images.map((image, index) => (
      <Image
        key={index}
        style={styles.productImage}
        source={{uri: `${API_BASE_URL}uploads/${image}`}}
      />
    ))}
  </Swiper>
);

const ProductDetails = ({
  navigation,
  typeProduct,
  productData,
  isExpanded,
  toggleExpand,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {productData.product_name}
      </Text>
      <PriceAndSales productData={productData} />
      <View style={styles.productInfo}>
        <Text style={[styles.cardTitle, styles.categoryTitle]}>
          Loại sản phẩm (
          {
            typeProduct.find(items => items?._id === productData?.category)
              ?.category_name
          }
          )
        </Text>
        <Text style={styles.sales}>
          {`Đã bán: ${
            productData.product_sold > 1000
              ? `${productData.product_sold.toString().charAt(0)}k`
              : productData.product_sold
          }`}
        </Text>
      </View>
      <AttributeList
        isExpanded={isExpanded}
        attributes={productData.product_attributes}
        toggleExpand={toggleExpand}
      />

      <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
      <Description
        productData={productData}
        isExpanded={isExpanded}
        toggleExpand={toggleExpand}
      />
      <Comment navigation={navigation} data={productData} />
    </View>
  );
};

const PriceAndSales = ({productData}) => (
  <View style={styles.productInfo}>
    <Text style={styles.productPrice}>
      {formatCurrency(productData.product_price)}
    </Text>
    <Rating
      startingValue={productData?.product_ratingAverage}
      imageSize={20}
      readonly
      ratingBackgroundColor="#FFD700"
    />
  </View>
);

const AttributeList = ({isExpanded, attributes, toggleExpand}) => (
  <>
    <FlatList
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={styles.attributeList}
      showsVerticalScrollIndicator={false}
      data={attributes}
      keyExtractor={item => item?._id}
      renderItem={({item}) => <AttributeItem item={item} />}
    />
    {attributes.length > 2 && (
      <TouchableOpacity onPress={toggleExpand} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isExpanded ? 'Rút Gọn' : 'Xem Thêm'}
        </Text>
      </TouchableOpacity>
    )}
  </>
);

const Description = ({productData, isExpanded, toggleExpand}) => (
  <>
    <Text style={styles.productDescription}>
      {isExpanded
        ? productData.product_description
        : `${productData.product_description.substring(0, 100)}...`}
    </Text>
    {productData.product_description.length > 100 && (
      <TouchableOpacity onPress={toggleExpand} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isExpanded ? 'Rút Gọn' : 'Xem Thêm'}
        </Text>
      </TouchableOpacity>
    )}
  </>
);

const AttributeItem = ({item}) => (
  <View style={styles.attributeItem}>
    <Text style={styles.attributeLabel}>
      {`${item?.color}\n(${item?.quantity})`}
    </Text>
    <FlatList
      numColumns={3}
      columnWrapperStyle={styles.sizeList}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      data={item?.options}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => <SizeItem item={item} />}
    />
  </View>
);

const SizeItem = ({item}) => (
  <View style={styles.sizeItem}>
    <Text style={styles.sizeLabel}>{item.size}</Text>
    <Text style={styles.quantityLabel}>{item.options_quantity}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  title: {
    left: '20%',
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
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
    marginHorizontal: '3%',
    borderRadius: 10,
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: width * 0.05,
    color: 'black',
    fontWeight: '600',
  },
  categoryTitle: {
    fontSize: 18,
    marginVertical: '1%',
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
  sales: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
    marginTop: 5,
  },
  sectionTitle: {
    marginTop: 5,
    fontSize: width * 0.045,
    color: 'black',
    fontWeight: '600',
  },
  attributeList: {
    justifyContent: 'space-between',
  },
  attributeItem: {
    width: '49%',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderRadius: 10,
    marginBottom: 10,
  },
  attributeLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontWeight: '400',
    fontSize: width * 0.035,
  },
  sizeList: {
    marginVertical: 2,
    justifyContent: 'space-around',
  },
  sizeItem: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: '7%',
    marginHorizontal: '1%',
    flexDirection: 'row',
  },
  sizeLabel: {
    marginRight: 5,
    color: 'black',
    fontWeight: '400',
  },
  quantityLabel: {
    fontWeight: 'bold',
    color: 'black',
    fontWeight: '400',
  },
  productDescription: {
    fontSize: width * 0.035,
    lineHeight: 24,
    marginVertical: 5,
  },
  toggleButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderTopWidth: 0.5,
    borderColor: 'gray',
  },
  toggleButtonText: {
    fontSize: width * 0.035,
    color: 'black',
    fontWeight: '400',
  },
});

export default ProductItem;
