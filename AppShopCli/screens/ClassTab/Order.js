import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Order = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* Ảnh */}
      <Image style={styles.imager} source={require('../../image/Box.png')} />
      {/* Thanh kẻ */}
      <View style={styles.hr} />

      <View style={styles.view}>
        {/* Item quản lý */}
        <Text style={styles.txt}>Quản lý</Text>
        {/* Đơn hàng */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('OrderScreen')}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="profile" size={30} color={'#333333'} />
              <Text style={[styles.txt, {left: '30%', fontSize: 16}]}>
                Đơn hàng
              </Text>
            </View>
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Cửa hàng */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.navigate('ShopScreen')}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Entypo name="shop" size={30} color={'#333333'} />
              <Text style={[styles.txt, {left: '30%', fontSize: 16}]}>
                Cửa hàng
              </Text>
            </View>
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Item thông tin */}
        <Text style={[styles.txt, {marginTop: '5%'}]}>Thông tin</Text>
        {/* Thống kê */}
        <Pressable style={styles.buttonView}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AntDesign name="barchart" size={30} color={'#333333'} />
              <Text style={[styles.txt, {left: '30%', fontSize: 16}]}>
                Thống kê
              </Text>
            </View>
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Tồn kho */}
        <Pressable style={styles.buttonView}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="warehouse" size={30} color={'#333333'} />
              <Text style={[styles.txt, {left: '30%', fontSize: 16}]}>
                Tồn kho
              </Text>
            </View>
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
        {/* Item khác */}
        <Text style={[styles.txt, {marginTop: '5%'}]}>Thông tin</Text>
        {/* Đăng xuất */}
        <Pressable
          style={styles.buttonView}
          onPress={() => navigation.replace('Login2')}>
          <View style={styles.rowButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="logout" size={30} color={'#333333'} />
              <Text style={[styles.txt, {left: '30%', fontSize: 16}]}>
                Đăng xuất
              </Text>
            </View>
            <AntDesign name="right" size={15} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imager: {
    width: 210,
    height: 200,
    marginTop: '7%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  hr: {
    width: '75%',
    alignSelf: 'center',
    borderColor: '#999999',
    borderBottomWidth: 1,
  },
  view: {
    marginVertical: '5%',
    marginHorizontal: '5%',
  },
  txt: {
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
});
