import React, {useRef, useState} from 'react';
import {
  Pressable,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {apiDelete, clearAllItem} from '../../utils/utils';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SIGNOUT_API} from '../../config/urls';
import socketServices from '../../utils/socketService';
import Spinner from 'react-native-loading-spinner-overlay';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SettingScreen = ({navigation}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const bottomSheetModalRef = useRef(null);

  const logout = async () => {
    setButtonDisabled(true);
    try {
      await apiDelete(SIGNOUT_API);
      clearAllItem();
      socketServices.emit('logout');
      setButtonDisabled(false);
      navigation.replace('Login2');
    } catch (error) {
      setButtonDisabled(false);
      console.log('Logout: ', error);
    }
  };

  return (
    <GestureHandlerRootView style={SettingStyles.container}>
      <BottomSheetModalProvider>
        <Pressable onPress={() => bottomSheetModalRef.current?.close()}>
          <View style={SettingStyles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={SettingStyles.backButton}>
              <AntDesign name="left" size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={[SettingStyles.headerText, {left: '20%'}]}>
              Setting
            </Text>
          </View>

          <View style={SettingStyles.content}>
            <Text style={SettingStyles.headerText}>Quản lý</Text>
            <Pressable
              style={SettingStyles.buttonView}
              onPress={() => navigation.navigate('Discount')}>
              <View style={SettingStyles.rowButton}>
                <View style={SettingStyles.iconTextContainer}>
                  <AntDesign
                    name="gift"
                    size={windowWidth * 0.08}
                    color={'#333333'}
                  />
                  <Text style={SettingStyles.text}>Ưu đãi</Text>
                </View>
                <AntDesign name="right" size={windowWidth * 0.03} />
              </View>
            </Pressable>
            <Pressable
              style={SettingStyles.buttonView}
              onPress={() => navigation.navigate('StatisticalScreen')}>
              <View style={SettingStyles.rowButton}>
                <View style={SettingStyles.iconTextContainer}>
                  <AntDesign
                    name="barchart"
                    size={windowWidth * 0.08}
                    color={'#333333'}
                  />
                  <Text style={SettingStyles.text}>Thống kê</Text>
                </View>
                <AntDesign name="right" size={windowWidth * 0.03} />
              </View>
            </Pressable>
            <Pressable
              style={SettingStyles.buttonView}
              onPress={() => navigation.navigate('InventoryScreen')}>
              <View style={SettingStyles.rowButton}>
                <View style={SettingStyles.iconTextContainer}>
                  <MaterialIcons
                    name="warehouse"
                    size={windowWidth * 0.08}
                    color={'#333333'}
                  />
                  <Text style={SettingStyles.text}>Kho hàng</Text>
                </View>
                <AntDesign name="right" size={windowWidth * 0.03} />
              </View>
            </Pressable>
            <Pressable
              style={SettingStyles.buttonView}
              onPress={() => navigation.navigate('ContactSup')}>
              <View style={SettingStyles.rowButton}>
                <View style={SettingStyles.iconTextContainer}>
                  <Feather
                    name="phone-call"
                    size={windowWidth * 0.08}
                    color={'#333333'}
                  />
                  <Text style={SettingStyles.text}>Liên hệ nhà cung cấp</Text>
                </View>
                <AntDesign name="right" size={windowWidth * 0.03} />
              </View>
            </Pressable>
            <Text
              style={[
                SettingStyles.headerText,
                {marginTop: windowHeight * 0.09},
              ]}>
              Khác
            </Text>
            <Pressable
              style={SettingStyles.buttonView}
              onPress={() => navigation.navigate('Password')}>
              <View style={SettingStyles.rowButton}>
                <View style={SettingStyles.iconTextContainer}>
                  <MaterialIcons
                    name="password"
                    size={windowWidth * 0.08}
                    color={'#333333'}
                  />
                  <Text style={SettingStyles.text}>Đổi mật khẩu</Text>
                </View>
                <AntDesign name="right" size={windowWidth * 0.03} />
              </View>
            </Pressable>
            <Pressable
              style={SettingStyles.buttonView}
              onPress={() => bottomSheetModalRef.current?.present()}>
              <View style={SettingStyles.rowButton}>
                <View style={SettingStyles.iconTextContainer}>
                  <MaterialIcons
                    name="logout"
                    size={windowWidth * 0.08}
                    color={'#333333'}
                  />
                  <Text style={SettingStyles.text}>Đăng xuất</Text>
                </View>
                <AntDesign name="right" size={windowWidth * 0.03} />
              </View>
            </Pressable>
          </View>

          <Spinner
            visible={isButtonDisabled}
            textContent={'Đang đăng xuất...'}
            textStyle={{color: '#FFF'}}
          />
        </Pressable>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={['1%', '30%']}
          backgroundStyle={{
            borderRadius: 25,
            borderWidth: 0.5,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <MaterialIcons
              name="logout"
              size={windowWidth * 0.11}
              color={'red'}
            />
            <Text
              style={{
                marginVertical: '3%',
                color: 'black',
                fontSize: 15,
                fontWeight: '500',
              }}>
              Bạn có chắc chắn muốn đăng xuất không?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => bottomSheetModalRef.current?.close()}
                style={{
                  width: '35%',
                  borderWidth: 1.5,
                  margin: '5%',
                  height: 55,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
                  Hủy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={logout}
                style={{
                  width: '35%',
                  margin: '5%',
                  height: 55,
                  backgroundColor: 'black',
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const SettingStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    marginVertical: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
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
    borderWidth: 0.5,
    elevation: 5,
    borderColor: 'gray',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  rowButton: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: windowWidth * 0.06,
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

export default SettingScreen;
