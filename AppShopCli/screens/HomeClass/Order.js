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
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Order = () => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.clear();
    navigation.replace('Login2');
  }



  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={require('../../images/Box.png')} />
      <View style={styles.horizontalLine} />
      <View style={styles.content}>
        <Text style={styles.headerText}>Quản lý</Text>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('OrderScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <AntDesign
                name="profile"
                size={windowWidth * 0.1}
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
              <Entypo name="shop" size={windowWidth * 0.1} color={'#333333'} />
              <Text style={styles.text}>Cửa hàng</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('ShopScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <AntDesign
                name="gift"
                size={windowWidth * 0.1}
                color={'#333333'}
              />
              <Text style={styles.text}>Ưu đãi</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text style={[styles.headerText, { marginTop: windowHeight * 0.02 }]}>
          Thông tin
        </Text>
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('StatisticalScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <AntDesign
                name="barchart"
                size={windowWidth * 0.1}
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
                size={windowWidth * 0.1}
                color={'#333333'}
              />
              <Text style={styles.text}>Tồn kho</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text style={[styles.headerText, { marginTop: windowHeight * 0.02 }]}>
          Thông tin
        </Text>
        <Pressable
          style={styles.buttonView}
          onPress={logout}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              <MaterialIcons
                name="logout"
                size={windowWidth * 0.1}
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
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  horizontalLine: {
    width: windowWidth * 0.75,
    alignSelf: 'center',
    borderColor: '#999999',
    borderBottomWidth: 1,
    marginTop: windowHeight * 0.01,
  },
  content: {
    marginVertical: windowHeight * 0.05,
    marginHorizontal: windowWidth * 0.05,
  },
  headerText: {
    fontSize: windowWidth * 0.06,
    color: 'black',
    fontWeight: '500',
  },
  buttonView: {
    marginTop: windowHeight * 0.03,
    height: windowHeight * 0.06,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999999',
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
