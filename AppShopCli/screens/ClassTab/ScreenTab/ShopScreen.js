import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ShopScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Chứa btton back, save */}
      <View style={styles.header}>
        <View style={styles.rowHeader}>
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </Pressable>
          <Text style={styles.txtTitle}>Sửa hồ sơ</Text>
          <Pressable>
            <Text style={styles.txtSave}>Lưu</Text>
          </Pressable>
        </View>
      </View>
      {/* Chứa avatar shop */}
      <View style={styles.nav}>
        <Pressable>
          <Image
            style={styles.avatarShop}
            source={{
              uri: 'https://i.ytimg.com/vi/Sj0NENb2nT4/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBk8S6cRMKFRWzWWGT8hOL1e0LO3w',
            }}
          />
          <Text style={styles.navTxt}>Sửa</Text>
          <View style={styles.navButton} />
        </Pressable>
      </View>
      {/* Chứa text input sửa thông tin*/}
      <View style={styles.footer}>
        {/* Nhập tên cửa hàng */}
        <View style={styles.inputFooter}>
          <View style={styles.rowInput}>
            <View>
              <Text style={styles.txtInput}>Tên cửa hàng *</Text>
              <TextInput style={{ width: 340 }} placeholder="Nhập tên cửa hàng" />
            </View>
            <View
              style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>0/120</Text>
              <AntDesign name="closesquareo" size={20} />
            </View>
          </View>
        </View>
        {/* Nhập mô tả cửa hàng */}
        <View style={styles.inputFooter}>
          <View style={styles.rowInput}>
            <View>
              <Text style={styles.txtInput}>Mô tả cửa hàng*</Text>
              <TextInput
                style={{ width: 340 }}
                placeholder="Nhập mô tả cửa hàng"
              />
            </View>
            <View
              style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>0/120</Text>
              <AntDesign name="closesquareo" size={20} />
            </View>
          </View>
        </View>
        {/* Nhập địa chỉ cửa hàng */}
        <View style={styles.inputFooter}>
          <View style={styles.rowInput}>
            <View>
              <Text style={styles.txtInput}>Địa chỉ cửa hàng*</Text>
              <TextInput
                style={{ width: 340 }}
                placeholder="Nhập địa chỉ cửa hàng"
              />
            </View>
            <View
              style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>0/120</Text>
              <AntDesign name="closesquareo" size={20} />
            </View>
          </View>
        </View>
        {/* Nhập số điện thoại cửa hàng */}
        <View style={styles.inputFooter}>
          <View style={styles.rowInput}>
            <View>
              <Text style={styles.txtInput}>Số điện thoại cửa hàng</Text>
              <TextInput
                style={{ width: 340 }}
                placeholder="Nhập số điện thoại cửa hàng"
              />
            </View>
            <View
              style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>0/120</Text>
              <AntDesign name="closesquareo" size={20} />
            </View>
          </View>
        </View>
        {/* Nhập email cửa hàng */}
        <View style={styles.inputFooter}>
          <View style={styles.rowInput}>
            <View>
              <Text style={styles.txtInput}>Email cửa hàng</Text>
              <TextInput style={{ width: 340 }} placeholder="Nhập email" />
            </View>
            <View
              style={{ justifyContent: 'space-around', alignItems: 'center' }}>
              <Text>0/120</Text>
              <AntDesign name="closesquareo" size={20} />
            </View>
          </View>
        </View>
      </View>
      {/* Ảnh bottom */}
      <Image
        style={styles.imgBottom}
        source={{
          uri: 'https://cdn4.iconfinder.com/data/icons/pop-scenes/1000/holidays___vacation_holiday_sea_beach_ocean_lounge_chill_relax-256.png',
        }}
      />
    </View>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    justifyContent: 'center',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  txtTitle: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
  },
  txtSave: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
  },
  nav: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A29C9C',
  },
  avatarShop: {
    width: 190,
    height: 190,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  navTxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
    bottom: '8%',
    zIndex: 1,
  },
  navButton: {
    width: 190,
    height: 50,
    opacity: 0.5,
    bottom: '0%',
    position: 'absolute',
    backgroundColor: '#A29C9C',
  },
  footer: {
    borderColor: '#CDCDCD',
    borderTopWidth: 5,
    borderBottomWidth: 5,
  },
  inputFooter: {
    height: 70,
    borderColor: '#CDCDCD',
    borderTopWidth: 3,
    justifyContent: 'center',
    borderBottomWidth: 3,
  },
  rowInput: {
    marginVertical: '3%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtInput: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
  imgBottom: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
