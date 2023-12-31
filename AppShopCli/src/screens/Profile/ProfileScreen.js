import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import imagePath from '../../constants/imagePath';
import {useSelector} from 'react-redux';
import {API_BASE_URL} from '../../config/urls';

const ProfileScreen = ({navigation}) => {
  const account = useSelector(state => state?.user?.userData);

  const navigateToSettings = () => {
    navigation.navigate('SettingScreen');
  };

  const navigateToShopUpdate = () => {
    navigation.navigate('ShopUpdate');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.logo} source={imagePath.logo} />
          <Text style={styles.titleText}>Profile</Text>
        </View>
        <TouchableOpacity
          onPress={navigateToSettings}
          style={styles.settingsButton}>
          <Ionicons name="settings-sharp" size={30} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.avatarSection}>
        <Pressable onPress={navigateToShopUpdate}>
          <Image
            style={styles.avatar}
            source={{uri: `${API_BASE_URL}${account?.avatarShop}`}}
          />
          <View style={styles.editButton}>
            <Feather color={'white'} name="edit-3" size={20} />
          </View>
        </Pressable>
        <View style={{left: '5%'}}>
          <Text style={styles.nameText}> {account?.nameShop} </Text>
          <Text style={styles.infoText}> 0{account?.phoneNumberShop} </Text>
        </View>
      </View>
      <View style={{marginHorizontal: '5%'}}>
        <View style={styles.infoItem}>
          <Text style={styles.labelText}>Tên Cửa Hàng:</Text>
          <Text style={styles.valueText}> {account?.nameShop} </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.labelText}>Địa chỉ cửa hàng:</Text>
          <Text style={styles.valueText}> {account?.address} </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.labelText}>SĐT cửa hàng:</Text>
          <Text style={styles.valueText}> 0{account?.phoneNumberShop} </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.labelText}>Mô tả cửa hàng:</Text>
          <Text style={styles.valueText}> {account?.des} </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  logo: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
  },
  titleText: {
    left: '20%',
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
  settingsButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  avatarSection: {
    alignItems: 'center',
    marginHorizontal: '8%',
    marginVertical: '5%',
    flexDirection: 'row',
  },
  avatar: {
    borderWidth: 1,
    borderColor: 'gray',
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  editButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#474747',
    marginLeft: 80,
    marginTop: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  infoText: {
    fontSize: 19,
    color: 'black',
  },
  infoItem: {
    marginTop: '4%',
  },
  labelText: {
    fontSize: 19,
    left: '4%',
    fontWeight: '600',
    color: 'black',
  },
  valueText: {
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 50,
    textAlignVertical: 'center',
    paddingLeft: 10,
    marginTop: 5,
    color: '#000000',
    marginHorizontal: 10,
  },
});

export default ProfileScreen;
