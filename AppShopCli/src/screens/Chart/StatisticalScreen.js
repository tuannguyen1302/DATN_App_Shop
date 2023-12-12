import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import { BarChart } from 'react-native-chart-kit';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { formatCurrency } from '../../components/Price';
import { useSelector } from 'react-redux';
import { API_BASE_URL, SHOP_API } from '../../config/urls';
import { apiGet } from '../../utils/utils';

const StatisticalScreen = ({ navigation }) => {
  const userAccount = useSelector(state => state?.user?.userData);
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [isCheck, setIsCheck] = useState(true);

  const getApi = async () => {
    try {
      const res = await apiGet(
        `${SHOP_API}/overview/${new Date().getFullYear()}`,
      );
      setData(res?.message);
      console.log(res?.message[0]);
      const res2 = await apiGet(`${SHOP_API}/analysis/thang`);
      setData2(res2?.message?.revenue);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Statistics</Text>
      </View>

      <View style={styles.mainContainer}>
        <TouchableOpacity
          onPress={() => setIsCheck(true)}
          style={[styles.valueContainer, isCheck && styles.selectedTab]}>
          <Text style={[styles.valueLabel, isCheck && styles.selectedLabel]}>
            Tổng quan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsCheck(false)}
          style={[styles.valueContainer, !isCheck && styles.selectedTab]}>
          <Text style={[styles.valueLabel, !isCheck && styles.selectedLabel]}>
            Phân tích
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        {isCheck ? (
          <OverviewScreen data={data} userAccount={userAccount} />
        ) : (
          <AnalysisScreen data={data2} />
        )}
      </View>
    </View>
  );
};

const OverviewScreen = ({ data, userAccount }) => {
  if (!data) {
    return <ActivityIndicator size={'large'} color={'black'} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.shopInfoContainer}>
        <Text style={styles.shopName}>{userAccount?.nameShop}</Text>
        <Text style={styles.shopBalance}>
          {formatCurrency(data?.totalCheckout)}
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          <View style={styles.chartItem}>
            <Feather name="box" size={25} />
            <Text style={styles.chartLabel}>Sản phẩm</Text>
          </View>
          <Text style={styles.chartValue}>{data?.totalProduct}</Text>
        </View>
        <View style={styles.chart}>
          <View style={styles.chartItem}>
            <Feather name="users" size={25} color={'black'} />
            <Text style={styles.chartLabel}>Khách hàng</Text>
          </View>
          <Text style={styles.chartValue}>{data?.customerCount}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          <View style={styles.chartItem}>
            <Feather name="list" size={25} color={'black'} />
            <Text style={styles.chartLabel}>Đơn hàng</Text>
          </View>
          <Text style={styles.chartValue}>{data?.totalOrders}</Text>
        </View>
        <View style={styles.chart}>
          <View style={styles.chartItem}>
            <SimpleLineIcons name="user-following" size={25} color={'black'} />
            <Text style={styles.chartLabel}>Lượt theo dõi</Text>
          </View>
          <Text style={styles.chartValue}>{data?.totalFollow}</Text>
        </View>
      </View>

      {data?.topSold.length > 0 && (
        <View style={styles.productListContainer}>
          <Text style={styles.footerText}>Top 10 Sản phẩm bán chạy nhất</Text>
          <FlatList
            data={data?.topSold}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?._id}
            contentContainerStyle={styles.productList}
            renderItem={({ item }) => <ProductItem item={item} />}
          />
        </View>
      )}
    </ScrollView>
  );
};

const ProductItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.productInfo}>
      <Image
        style={styles.productImage}
        source={{ uri: `${API_BASE_URL}uploads/${item?.product_thumb[0]}` }}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={1}>
          {item?.product_name}
        </Text>
        <Text style={styles.infoText} numberOfLines={1}>
          Giá bán:{' '}
          <Text style={styles.priceText}>
            {formatCurrency(item?.product_price)}
          </Text>
        </Text>
      </View>
    </View>
    <Text style={styles.infoText} numberOfLines={1}>
      Đã bán: {item?.product_sold}
    </Text>
  </View>
);
const AnalysisScreen = ({ data }) => {
  if (!data) {
    return <ActivityIndicator size={'large'} color={'black'} />;
  }

  const dataChart = {
    labels: data?.map(item => `Tháng ${item?.month}`),
    datasets: [{ data: data.map(item => item?.totalRevenue) }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>Thống kê</Text>
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <BarChart
            data={dataChart}
            width={1000}
            height={300}
            yAxisSuffix="đ"
            chartConfig={{
              backgroundGradientFrom: '#9999FF',
              backgroundGradientTo: '#9999FF',
              color: () => `rgba(255, 255, 255,1)`,
            }}
            bezier
            style={styles.chartStyle}
          />
        </ScrollView>
      </View>
      <Text style={[styles.footerText, { textAlign: 'center', marginLeft: 0 }]}>
        Phân tích dữ liệu shop {new Date().getFullYear()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  chartItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartLabel: {
    marginLeft: '5%',
  },
  chartValue: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  productListContainer: {
    marginHorizontal: '4%',
    flex: 1,
    marginTop: '2%',
  },
  footerText: {
    marginLeft: '5%',
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
  productDetails: {
    left: '5%',
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
    margin: 8,
    borderRadius: 10,
  },
  productList: {
    marginTop: '2%',
  },
  priceText: {
    color: 'black',
  },
});

export default StatisticalScreen;
