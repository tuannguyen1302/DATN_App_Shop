import React, {useEffect, useState} from 'react';
import {View, Pressable, FlatList, Alert, Image, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ListItem, Avatar} from '@rneui/themed';
import {Icon} from 'react-native-elements';
import {API_BASE_URL, CHAT_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import {MessageScreenStyles} from './styles';
import imagePath from '../../constants/imagePath';

const MessageScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const renderButton = (itemId, check) => (
    <Pressable
      onPress={() => showAlert(itemId)}
      style={MessageScreenStyles.deleteButton}>
      <MaterialIcons name="delete" size={30} color={'white'} />
    </Pressable>
  );

  const showAlert = itemId => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa tin nhắn này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => handleDelete(itemId),
        },
      ],
      {cancelable: false},
    );
  };

  const handleDelete = itemId => {
    console.log(`Xóa tin nhắn có ID: ${itemId}`);
  };

  const getApi = async () => {
    try {
      const res = await apiGet(`${CHAT_API}/getConvarsationsForShop`);
      setData(res?.message);
    } catch (error) {
      console.log('Call api: ', error.message);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={MessageScreenStyles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '5%',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderWidth: 1,
            borderColor: 'green',
            borderRadius: 20,
          }}
          source={imagePath.logo}
        />
        <Text
          style={{
            left: '20%',
            fontSize: 22,
            color: 'black',
            fontWeight: '600',
          }}>
          Chat box
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item?.chat?._id}
        renderItem={({item}) => (
          <ListItem.Swipeable
            onPress={() => {
              navigation.navigate('MessItem', {
                _id: item?.chat?._id,
                name: item?.user?.user_name,
                avatar: item?.user?.user_avatar,
              });
            }}
            containerStyle={{marginVertical: 1}}
            rightContent={() => renderButton(item?._id, 'right')}
            bottomDivider>
            <Avatar
              size={70}
              rounded
              source={{
                uri: `${API_BASE_URL}${item?.user?.user_avatar}`,
              }}>
              {item?.user?.user_status === 'active' && (
                <Icon
                  name="circle"
                  type="font-awesome"
                  color="green"
                  size={16}
                  containerStyle={MessageScreenStyles.statusIcon}
                />
              )}
              {item?.user?.user_status === 'inactive' && (
                <Icon
                  name="circle"
                  type="font-awesome"
                  color="red"
                  size={13}
                  containerStyle={MessageScreenStyles.statusIcon}
                />
              )}
            </Avatar>
            <ListItem.Content>
              <View style={MessageScreenStyles.titleContainer}>
                <ListItem.Title
                  numberOfLines={1}
                  style={MessageScreenStyles.title}>
                  {item?.user?.user_name}
                </ListItem.Title>

                <ListItem.Subtitle style={MessageScreenStyles.timeText}>
                  12:00
                </ListItem.Subtitle>
              </View>
              <ListItem.Subtitle
                style={{width: '70%', color: '#19B9EC'}}
                numberOfLines={1}>
                {item?.chat?.messagers[0]}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Swipeable>
        )}
      />
    </View>
  );
};

export default MessageScreen;
