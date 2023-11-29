// Order.js
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
import { clearAllItem } from '../../utils/utils';
import { OrderStyles } from './styles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Order = ({ navigation }) => {
  const logout = () => {
    clearAllItem();
    navigation.replace('Login2');
  };

  return (
    <ScrollView style={OrderStyles.container}>
      <View style={OrderStyles.horizontalLine}>
        <Image style={OrderStyles.image} source={imagePath.box} />
      </View>
      <View style={OrderStyles.content}>
        <Text style={OrderStyles.headerText}>Quản lý</Text>
        <Pressable
          style={OrderStyles.buttonView}
          onPress={() => navigation.navigate('OrderScreen')}>
          <View style={OrderStyles.rowButton}>
            <View style={OrderStyles.iconTextContainer}>
              <AntDesign
                name="profile"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={OrderStyles.text}>Đơn hàng</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={OrderStyles.buttonView}
          onPress={() => navigation.navigate('ShopScreen')}>
          <View style={OrderStyles.rowButton}>
            <View style={OrderStyles.iconTextContainer}>
              <Entypo name="shop" size={windowWidth * 0.08} color={'#333333'} />
              <Text style={OrderStyles.text}>Cửa hàng</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={OrderStyles.buttonView}
          onPress={() => navigation.navigate('Discount')}>
          <View style={OrderStyles.rowButton}>
            <View style={OrderStyles.iconTextContainer}>
              <AntDesign
                name="gift"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={OrderStyles.text}>Ưu đãi</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text
          style={[OrderStyles.headerText, { marginTop: windowHeight * 0.02 }]}>
          Thông tin
        </Text>
        <Pressable
          style={OrderStyles.buttonView}
          onPress={() => navigation.navigate('StatisticalScreen')}>
          <View style={OrderStyles.rowButton}>
            <View style={OrderStyles.iconTextContainer}>
              <AntDesign
                name="barchart"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={OrderStyles.text}>Thống kê</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={OrderStyles.buttonView}
          onPress={() => navigation.navigate('InventoryScreen')}>
          <View style={OrderStyles.rowButton}>
            <View style={OrderStyles.iconTextContainer}>
              <MaterialIcons
                name="warehouse"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={OrderStyles.text}>Tồn kho</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Pressable
          style={OrderStyles.buttonView}
          onPress={() => navigation.navigate('Password')}>
          <View style={OrderStyles.rowButton}>
            <View style={OrderStyles.iconTextContainer}>
              <MaterialIcons
                name="password"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={OrderStyles.text}>Đổi mật khẩu </Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
        <Text
          style={[OrderStyles.headerText, { marginTop: windowHeight * 0.02 }]}>
          Khác
        </Text>
        <Pressable style={OrderStyles.buttonView} onPress={logout}>
          <View style={OrderStyles.rowButton}>
            <View style={OrderStyles.iconTextContainer}>
              <MaterialIcons
                name="logout"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
              <Text style={OrderStyles.text}>Đăng xuất</Text>
            </View>
            <AntDesign name="right" size={windowWidth * 0.03} />
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Order;
