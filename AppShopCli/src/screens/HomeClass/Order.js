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
import imagePath from '../../constatns/imagePath';
import {clearAllItem} from '../../utils/utilus';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Order = ({navigation}) => {
  const logout = () => {
    clearAllItem();
    navigation.replace('Login2');
  };

  const renderButton = (iconName, text, onPress) => (
    <Pressable style={styles.buttonView} onPress={onPress}>
      <View style={styles.rowButton}>
        <View style={styles.iconTextContainer}>
          {iconName()}
          <Text style={styles.text}>{text}</Text>
        </View>
        <AntDesign name="right" color={'#19B9EC'} size={windowWidth * 0.03} />
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={imagePath.box} />
      <View style={styles.horizontalLine} />
      <View style={styles.content}>
        <Text style={styles.headerText}>Quản lý</Text>
        <View style={styles.categoryContainer}>
          {renderButton(
            () => (
              <AntDesign
                name="profile"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
            ),
            'Đơn hàng',
            () => navigation.navigate('OrderScreen'),
          )}
          {renderButton(
            () => (
              <Entypo name="shop" size={windowWidth * 0.08} color={'#333333'} />
            ),
            'Cửa hàng',
            () => navigation.navigate('ShopScreen'),
          )}
          {renderButton(
            () => (
              <AntDesign
                name="gift"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
            ),
            'Ưu đãi',
            () => navigation.navigate('PromotionScreen'),
          )}
        </View>
        <Text style={[styles.headerText, {marginTop: windowHeight * 0.02}]}>
          Thông tin
        </Text>
        <View style={styles.categoryContainer}>
          {renderButton(
            () => (
              <AntDesign
                name="barchart"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
            ),
            'Thống kê',
            () => navigation.navigate('StatisticalScreen'),
          )}
          {renderButton(
            () => (
              <MaterialIcons
                name="warehouse"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
            ),
            'Tồn kho',
            () => navigation.navigate('InventoryScreen'),
          )}
        </View>
        <Text style={[styles.headerText, {marginTop: windowHeight * 0.02}]}>
          Khác
        </Text>
        <View style={styles.categoryContainer}>
          {renderButton(
            () => (
              <MaterialIcons
                name="logout"
                size={windowWidth * 0.08}
                color={'#333333'}
              />
            ),
            'Đăng xuất',
            logout,
          )}
        </View>
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
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.05,
  },
  headerText: {
    fontSize: windowWidth * 0.06,
    color: 'black',
    fontWeight: '500',
  },
  buttonView: {
    height: windowHeight * 0.05,
    borderRadius: 10,
    borderColor: '#999999',
    justifyContent: 'center',
    marginHorizontal: windowHeight * 0.01,
    marginVertical: windowHeight * 0.01,
  },
  rowButton: {
    alignItems: 'center',
    flexDirection: 'row',
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
  categoryContainer: {
    marginTop: windowHeight * 0.01,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#F1F0F0',
  },
});

export default Order;
