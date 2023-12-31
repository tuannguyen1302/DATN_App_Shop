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
import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { apiGet } from '../../../src/utils/utils';
import { API_BASE_URL, SHOP_API } from '../../../src/config/urls';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

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


            <Ionicons name="settings-sharp" size={30} color="#333" />

          </View>
        </View>

        <View style={styles.avatarSection}>
          <View>
            {avatarSource?.uri ? (
              <Image style={styles.avatar} source={{ uri: avatarSource?.uri }} />
            ) : (
              <Image
                style={styles.avatar}
                source={{
                  uri: 'https://i.ytimg.com/vi/Sj0NENb2nT4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBk8S6cRMKFRWzWWGT8hOL1e0LO3w',
                }}
              />
            )}
            <Pressable
              onPress={() => {
                navigation.navigate('ShopUpdate');
              }}
              style={{ width: 30, height: 30, borderRadius: 20, backgroundColor: '#474747', marginLeft: 80, marginTop: -30, justifyContent: 'center', alignItems: 'center' }} >
              <Feather color={'white'} name="edit-3" size={20} />
            </Pressable>
          </View>
          <View style={{ marginHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }} > {shopName} </Text>
            <Text style={{ fontSize: 20, color: '#575656' }} > {shopEmail} </Text>
            <Text style={{ fontSize: 20, color: '#575656' }} > {shopPhone} </Text>
          </View>

        </View>
        <View style={styles.hori}>
        </View>

        <View style={styles.viewname}>
          <Text style={styles.text}> Tên Cửa Hàng: </Text>
          <Text style={styles.otxt} > {shopName} </Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.text} > Địa chỉ cửa hàng:</Text>
          <Text style={styles.otxt}> {shopAddress} </Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.text} > SĐT cửa hàng:</Text>
          <Text style={styles.otxt}> {shopPhone} </Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.text} > Email cửa hàng:</Text>
          <Text style={styles.otxt}> {shopEmail} </Text>
        </View>
        <View style={styles.viewname}>
          <Text style={styles.text} > Mô tả cửa hàng:</Text>
          <Text style={styles.otxt}> {shopDescription} </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView >
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

  avatarSection: {
    alignItems: 'flex-start',
    justifyContent: 'ceter',
    marginTop: 20,
    marginBottom: 25,
    marginLeft: 30,
    flexDirection: 'row'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  viewname: {

    marginTop: 25,
    marginHorizontal: 30,

  },

  hori: {
    height: 1,
    borderWidth: 1,
    borderColor: '#A8A8A880',
    marginHorizontal: 30

  }, otxt: {
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    height: 50,
    lineHeight: 50,
    textAlignVertical: 'center',
    paddingLeft: 20,
    marginTop: 5,
    color: 'black'
  }, text: { fontSize: 20, marginLeft: 20, fontWeight: 'bold' }
});
export default ShopScreen;
