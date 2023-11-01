import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Order = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Hình ảnh đại diện */}
      <Image style={styles.image} source={require('../../image/Box.png')} />
      {/* Dòng kẻ ngang phân chia */}
      <View style={styles.horizontalLine} />
      {/* Phần nội dung chức năng */}
      <View style={styles.content}>
        {/* Tiêu đề "Quản lý" */}
        <Text style={styles.headerText}>Quản lý</Text>
        {/* Nút chuyển đến màn hình Đơn hàng */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('OrderScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Icon đơn hàng */}
              <AntDesign name="profile" size={30} color={'#333333'} />
              {/* Văn bản "Đơn hàng" */}
              <Text style={styles.text}>Đơn hàng</Text>
            </View>
            {/* Icon mũi tên phải */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Nút chuyển đến màn hình Cửa hàng */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('ShopScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Icon cửa hàng */}
              <Entypo name="shop" size={30} color={'#333333'} />
              {/* Văn bản "Cửa hàng" */}
              <Text style={styles.text}>Cửa hàng</Text>
            </View>
            {/* Icon mũi tên phải */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Tiêu đề "Thông tin" */}
        <Text style={[styles.headerText, {marginTop: '5%'}]}>Thông tin</Text>
        {/* Nút chuyển đến màn hình Thống kê */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('StatisticalScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Icon biểu đồ thống kê */}
              <AntDesign name="barchart" size={30} color={'#333333'} />
              {/* Văn bản "Thống kê" */}
              <Text style={styles.text}>Thống kê</Text>
            </View>
            {/* Icon mũi tên phải */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Nút chuyển đến màn hình Tồn kho */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('InventoryScreen')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Icon kho hàng */}
              <MaterialIcons name="warehouse" size={30} color={'#333333'} />
              {/* Văn bản "Tồn kho" */}
              <Text style={styles.text}>Tồn kho</Text>
            </View>
            {/* Icon mũi tên phải */}
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Tiêu đề "Thông tin" */}
        <Text style={[styles.headerText, {marginTop: '5%'}]}>Thông tin</Text>
        {/* Nút đăng xuất */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.replace('Login2')}>
          <View style={styles.rowButton}>
            <View style={styles.iconTextContainer}>
              {/* Icon đăng xuất */}
              <MaterialIcons name="logout" size={30} color={'#333333'} />
              {/* Văn bản "Đăng xuất" */}
              <Text style={styles.text}>Đăng xuất</Text>
            </View>
            {/* Icon mũi tên phải */}
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
    paddingTop: 20, // Thêm phần trên cho notch
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
