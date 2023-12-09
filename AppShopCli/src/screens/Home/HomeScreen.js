import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ProductScreen from './ProductScreen';
import {API_BASE_URL} from '../../config/urls';
import HomeStyle from './styles';
import {useSelector} from 'react-redux';
import {saveNotiData} from '../../redux/actions/chat';
import {setItem} from '../../utils/utils';
import {fetchData} from '../../redux/actions/socket';

const HomeScreen = ({navigation}) => {
  const userAccount = useSelector(state => state?.user?.userData);
  const notifiCount = useSelector(state => state?.chat?.notifi);

  useEffect(() => {
    fetchData(navigation);
  }, []);

  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.header}>
        <Image
          style={HomeStyle.avatarShop}
          source={{uri: `${API_BASE_URL}${userAccount?.avatarShop}`}}
        />
        <Text style={HomeStyle.name}>Hello, {userAccount?.nameShop}!</Text>
        <TouchableOpacity
          style={HomeStyle.button}
          onPress={() => {
            saveNotiData(0);
            setItem('notifi', 0);
            navigation.navigate('NotifiScreen');
          }}>
          <Ionicons name="notifications-outline" size={30} color="#333" />
          {notifiCount > 0 && (
            <View style={HomeStyle.notificationBadge}>
              <Text style={HomeStyle.notificationText}>
                {notifiCount > 9 ? '9+' : notifiCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ProductScreen navigation={navigation} />

      <TouchableOpacity
        style={HomeStyle.btnAdd}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Feather name="plus-square" size={25} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
