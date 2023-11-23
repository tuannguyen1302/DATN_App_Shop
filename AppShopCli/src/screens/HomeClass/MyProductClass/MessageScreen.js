import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, FlatList, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {ListItem, Avatar} from '@rneui/themed';
import {Icon} from 'react-native-elements';
import {API_BASE_URL, CHAT_API} from '../../../config/urls';
import {apiGet} from '../../../utils/utils';

const MessageScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const renderButton = (itemId, check) => (
    <Pressable
      onPress={() => showAlert(itemId)}
      style={[
        styles.deleteButton,
        check == 'left' && {backgroundColor: 'green'},
      ]}>
      {check == 'left' ? (
        <Entypo name="swarm" size={30} color={'white'} />
      ) : (
        <MaterialIcons name="delete" size={30} color={'white'} />
      )}
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
    <View style={styles.container}>
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
            containerStyle={{marginBottom: 1}}
            leftContent={() => renderButton(item?._id, 'left')}
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
                  containerStyle={styles.statusIcon}
                />
              )}
              {item?.user?.user_status === 'inactive' && (
                <Icon
                  name="circle"
                  type="font-awesome"
                  color="red"
                  size={13}
                  containerStyle={styles.statusIcon}
                />
              )}
            </Avatar>
            <ListItem.Content>
              <View style={styles.titleContainer}>
                <ListItem.Title numberOfLines={1} style={styles.title}>
                  {item?.user?.user_name}
                </ListItem.Title>

                <ListItem.Subtitle style={styles.timeText}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    width: '70%',
  },
  timeText: {
    fontSize: 15,
  },
  notificationBadge: {
    backgroundColor: 'blue',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  statusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default MessageScreen;
