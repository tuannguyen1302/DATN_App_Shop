import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {BarChart} from 'react-native-chart-kit';
import {formatCurrency} from '../../components/Price';
import {useSelector} from 'react-redux';
import {API_BASE_URL, SHOP_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';

const StatisticalScreen = ({navigation}) => {
  const userAccount = useSelector(state => state?.user?.userData);
  const [data, setData] = useState(null);
  const [isCheck, setIsCheck] = useState(true);

  const getApi = async () => {
    try {
      const res = await apiGet(`${SHOP_API}/overview/2023`);
      setData(res?.message[0]);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={StaticStyle.container}>
      <View style={StaticStyle.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={StaticStyle.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={StaticStyle.titleText}>Statistics</Text>
      </View>

      <View style={StaticStyle.mainContainer}>
        <TouchableOpacity
          onPress={() => setIsCheck(true)}
          style={[
            StaticStyle.valueContainer,
            isCheck && StaticStyle.selectedTab,
          ]}>
          <Text
            style={[
              StaticStyle.valueLabel,
              isCheck && StaticStyle.selectedLabel,
            ]}>
            Tổng quan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsCheck(false)}
          style={[
            StaticStyle.valueContainer,
            !isCheck && StaticStyle.selectedTab,
          ]}>
          <Text
            style={[
              StaticStyle.valueLabel,
              !isCheck && StaticStyle.selectedLabel,
            ]}>
            Phân tích
          </Text>
        </TouchableOpacity>
      </View>

      {isCheck ? (
        <OverviewScreen data={data} userAccount={userAccount} />
      ) : (
        <AnalysisScreen />
      )}
    </View>
  );
};

const OverviewScreen = ({data, userAccount}) => {
  return (
    <ScrollView style={StaticStyle.container}>
      <View style={StaticStyle.shopInfoContainer}>
        <Text style={StaticStyle.shopName}>{userAccount?.nameShop}</Text>
        <Text style={StaticStyle.shopBalance}>
          {formatCurrency(data?.totalCheckout)}
        </Text>
      </View>

      <View style={StaticStyle.chartContainer}>
        <View style={StaticStyle.chart}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather name="box" size={25} />
            <Text style={{left: '20%'}}>Sản phẩm</Text>
          </View>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            {data?.totalProduct}
          </Text>
        </View>
        <View style={StaticStyle.chart}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather name="users" size={25} color={'black'} />
            <Text style={{left: '20%'}}>Khách hàng</Text>
          </View>

          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            {data?.customerCount}
          </Text>
        </View>
      </View>

      <View style={StaticStyle.chartContainer}>
        <View style={StaticStyle.chart}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather name="list" size={25} color={'black'} />
            <Text style={{left: '20%'}}>Đơn hàng</Text>
          </View>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            {data?.totalOrders}
          </Text>
        </View>
        <View style={StaticStyle.chart}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <SimpleLineIcons name="user-following" size={25} color={'black'} />
            <Text style={{left: '20%'}}>Lượt theo dõi</Text>
          </View>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            {data?.totalFollow}
          </Text>
        </View>
      </View>

      {data?.topSold && (
        <View style={StaticStyle.productListContainer}>
          <Text style={StaticStyle.footerText}>
            Top 10 Sản phẩm bán chạy nhất
          </Text>
          <FlatList
            data={data?.topSold}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?._id}
            contentContainerStyle={StaticStyle.productList}
            renderItem={({item}) => <ProductItem item={item} />}
          />
        </View>
      )}
    </ScrollView>
  );
};

const ProductItem = ({item}) => (
  <View style={StaticStyle.itemContainer}>
    <View style={StaticStyle.productInfo}>
      <Image
        style={StaticStyle.productImage}
        source={{uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}`}}
      />
      <View style={{left: '5%'}}>
        <Text style={StaticStyle.productName} numberOfLines={1}>
          {item?.product_name}
        </Text>
        <Text style={StaticStyle.infoText} numberOfLines={1}>
          Giá bán:{' '}
          <Text style={StaticStyle.priceText}>
            {formatCurrency(item?.product_price)}
          </Text>
        </Text>
      </View>
    </View>
    <Text style={StaticStyle.infoText} numberOfLines={1}>
      Đã bán: {item?.product_sold}
    </Text>
  </View>
);

const AnalysisScreen = () => {
  return (
    <View style={[StaticStyle.container, {marginTop: '10%'}]}>
      <Text style={StaticStyle.footerText}>Thống kê</Text>

      <View horizontal style={StaticStyle.chartContainer}>
        <BarChart
          data={{
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width / 1.05}
          height={Dimensions.get('window').height / 4}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundGradientFrom: '#ffa726',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={StaticStyle.chartStyle}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          color: 'black',
          fontWeight: '600',
        }}>
        Biểu đồ
      </Text>
    </View>
  );
};

const StaticStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 15,
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
  titleText: {
    marginLeft: '5%',
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  mainContainer: {
    backgroundColor: '#D9E1FF',
    borderRadius: 10,
    marginHorizontal: '3%',
    padding: '3%',
    elevation: 2,
    marginBottom: '2%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTab: {
    backgroundColor: '#4343FD',
  },
  selectedLabel: {
    color: 'white',
  },
  valueContainer: {
    width: '45%',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  valueLabel: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
  },
  shopInfoContainer: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5656FF',
    marginHorizontal: '3%',
    marginVertical: '1%',
    borderRadius: 20,
    padding: '5%',
  },
  shopName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  shopBalance: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  chartContainer: {
    flexDirection: 'row',
    marginVertical: '2%',
    justifyContent: 'space-around',
  },
  chart: {
    width: '45%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  productListContainer: {
    marginHorizontal: '4%',
    flex: 1,
    marginTop: '2%',
  },
  footerText: {
    left: '5%',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  itemContainer: {
    height: 100,
    marginVertical: '2%',
    padding: '2%',
    borderRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  productInfo: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    marginBottom: '5%',
    marginTop: '2%',
    color: 'black',
    fontWeight: 'bold',
  },
  infoText: {
    margin: '2%',
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
  },
  quantityContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 10,
  },
  productList: {
    marginTop: '2%',
  },
  dropdownText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  priceText: {
    color: 'black',
  },
});

export default StatisticalScreen;
