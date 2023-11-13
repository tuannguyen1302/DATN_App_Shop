import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Order = () => {
  const navigation = useNavigation();
  const logout = () => {
    AsyncStorage.clear();
    navigation.replace('Login2');
  }
  return (
    <View style={styles.container}>
      {/* Avatar image */}
      <Image style={styles.image} source={require('../../images/Box.png')} />
      {/* Horizontal line */}
      <View style={styles.horizontalLine} />
      {/* Functional content section */}
      <View style={styles.content}>
        {/* Header "Quản lý" */}
        <Text style={styles.headerText}>Quản lý</Text>
        {/* Button to navigate to OrderScreen */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('OrderScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Order icon */}
              <AntDesign name="profile" size={30} color={'#333333'} />
              {/* Text "Đơn hàng" */}
              <Text style={styles.text}>Đơn hàng</Text>
            </View>
            {/* Right arrow icon */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Button to navigate to ShopScreen */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('ShopScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Shop icon */}
              <Entypo name="shop" size={30} color={'#333333'} />
              {/* Text "Cửa hàng" */}
              <Text style={styles.text}>Cửa hàng</Text>
            </View>
            {/* Right arrow icon */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Header "Thông tin" */}
        <Text style={[styles.headerText, { marginTop: '5%' }]}>Thông tin</Text>
        {/* Button to navigate to StatisticalScreen */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('StatisticalScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Statistical chart icon */}
              <AntDesign name="barchart" size={30} color={'#333333'} />
              {/* Text "Thống kê" */}
              <Text style={styles.text}>Thống kê</Text>
            </View>
            {/* Right arrow icon */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Button to navigate to InventoryScreen */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('InventoryScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Warehouse icon */}
              <MaterialIcons name="warehouse" size={30} color={'#333333'} />
              {/* Text "Tồn kho" */}
              <Text style={styles.text}>Tồn kho</Text>
            </View>
            {/* Right arrow icon */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Header "Thông tin" */}
        <Text style={[styles.headerText, { marginTop: '5%' }]}>Thông tin</Text>
        {/* Logout button */}
        <Pressable
          style={styles.buttonView}
          onPress={logout}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Logout icon */}
              <MaterialIcons name="logout" size={30} color={'#333333'} />
              {/* Text "Đăng xuất" */}
              <Text style={styles.text}>Đăng xuất</Text>
            </View>
            {/* Right arrow icon */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20, // Extra space for notch
  },
  image: {
    width: 210,
    height: 200,
    marginTop: '7%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  horizontalLine: {
    width: '75%',
    alignSelf: 'center',
    borderColor: '#999999',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  content: {
    marginVertical: '5%',
    marginHorizontal: '5%',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
  buttonView: {
    marginTop: '3%',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#999999',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: '4%',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    left: '30%',
    fontSize: 16,
    color: 'black',
  },
});

export default Order;
