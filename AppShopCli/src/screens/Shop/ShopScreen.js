import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React, {useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {apiGet} from '../../../src/utils/utils';
import {API_BASE_URL, SHOP_API} from '../../../src/config/urls';

const ShopScreen = () => {
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopPhone, setShopPhone] = useState('');
  const [shopEmail, setShopEmail] = useState('');
  const [avatarSource, setAvatarSource] = useState([]);
  const navigation = useNavigation();
  const getApi = async () => {
    try {
      const res = await apiGet(`${SHOP_API}/getShopForShop`);
      //console.log(res);
      setShopName(res?.message?.nameShop);
      setShopDescription(res?.message?.des);
      setShopAddress(res?.message?.address);
      setShopPhone(res?.message?.phoneNumberShop.toString());
      setShopEmail(res?.message?.emailShop);
      setAvatarSource({
        uri: `${API_BASE_URL}${res?.message?.avatarShop}`,
      });
    } catch (error) {
      console.log('Post api: ', error.message);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getApi();
    }, []),
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.rowHeader}>
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color={'black'} />
            </Pressable>
            <Text style={styles.titleText}>Thông tin shop </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('ShopUpdate');
              }}>
              <Text style={styles.saveText}>Sửa </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.avatarSection}>
          <Image style={styles.avatar} source={{uri: avatarSource?.uri}} />
        </View>
        <View style={styles.viewname}>
          <Text style={{...styles.txt, fontSize: 20}}>Tên cửa hàng: </Text>
          <Text style={{fontSize: 18, color: 'black'}}>{shopName}</Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.txt}>Mô Tả cửa hàng: </Text>
          <Text style={{fontSize: 18, color: 'black', marginLeft: 2}}>
            {shopDescription}
          </Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.txt}>Địa chỉ cửa hàng: </Text>
          <Text style={{fontSize: 18, color: 'black'}}>{shopName}</Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.txt}>Số điện thoại: </Text>
          <Text style={{fontSize: 18, color: 'black'}}>{shopPhone}</Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.txt}>Email: </Text>
          <Text style={{fontSize: 18, color: 'black'}}>{shopEmail}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  saveText: {
    color: '#3498db',
    fontSize: 18,
    fontWeight: 'bold',
  },
  anh: {
    backgroundColor: 'red',
    height: 200,
  },
  avatarSection: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  viewname: {
    backgroundColor: '#F0F0F0',
    marginHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    padding: 10,
    paddingRight: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  txt: {fontSize: 20, fontWeight: '600', color: 'black'},
});
export default ShopScreen;
