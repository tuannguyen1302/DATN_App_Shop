import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import imagePath from '../../constants/imagePath';
import {clearAllItem} from '../../utils/utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Order = ({navigation}) => {
  const logout = () => {
    clearAllItem();
    navigation.replace('Login2');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.horizontalLine}>
        <Image style={styles.image} source={imagePath.box} />
      </View>
      <View style={styles.content}>
        <Text style={styles.headerText}>Quản lý</Text>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('OrderScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <AntDesign
                name="profile"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={styles.text}>Đơn hàng</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('ShopScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <Entypo name="shop" size={windowWidth * 0.08} color={'#333333'} />
              <Text style={styles.text}>Cửa hàng</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('Discount')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <AntDesign
                name="gift"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={styles.text}>Ưu đãi</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text style={[styles.headerText, {marginTop: windowHeight * 0.02}]}>
          Thông tin
        </Text>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('StatisticalScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <AntDesign
                name="barchart"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={styles.text}>Thống kê</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('InventoryScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <MaterialIcons
                name="warehouse"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={styles.text}>Tồn kho</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text style={[styles.headerText, {marginTop: windowHeight * 0.02}]}>
          Khác
        </Text>
        <Pressable style={styles.buttonView} onPress={logout}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <MaterialIcons
                name="logout"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={styles.text}>Đăng xuất</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    width: windowWidth * 1,
    height: windowHeight * 0.2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  horizontalLine: {
    borderColor: '#999',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  content: {
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.05,
  },
  headerText: {
    fontSize: windowWidth * 0.06,
    color: 'black',
    fontWeight: '500',
  },
  buttonView: {
    marginTop: windowHeight * 0.02,
    height: windowHeight * 0.06,
    borderRadius: 10,
    borderWidth: 0.5,
    elevation: 5,
    borderColor: 'gray',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: windowWidth * 0.04,
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: windowWidth * 0.04,
    left: '30%',
    fontSize: windowWidth * 0.04,
    color: 'black',
  },
});

export default Order;
