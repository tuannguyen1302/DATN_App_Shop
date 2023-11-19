import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet, FlatList, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ListItem, Avatar} from '@rneui/themed';
import axios from 'axios';
import {SOCKET_URL} from '../../../utils/socketService';
import {Icon} from 'react-native-elements';

const MessageScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const renderItem = ({item}) => (
    <ListItem.Swipeable
      onPress={() => {
        navigation.navigate('MessItem', {
          _id: item?.chat?._id,
          name: item?.user?.user_name,
        });
      }}
      containerStyle={{marginBottom: '1%'}}
      rightContent={() => renderDeleteButton(item?._id)}
      bottomDivider>
      <Avatar
        size={70}
        rounded
        source={{
          uri: `${SOCKET_URL}${item?.user?.user_avatar}`,
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
          {item?.chat?.messagers.legth && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>
                {item.notificationCount}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.subtitleContainer}>
          <ListItem.Subtitle style={{width: '70%'}} numberOfLines={1}>
            {item?.chat?.messagers[item?.chat?.messagers.legth - 1]}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.timeText}>
            12:00 AM
          </ListItem.Subtitle>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );

  const renderDeleteButton = itemId => (
    <Pressable onPress={() => showAlert(itemId)} style={styles.deleteButton}>
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
      const res = await axios.get(
        `${SOCKET_URL}v1/api/chat/getConvarsationsForShop`,
        {
          headers: {
            'x-xclient-id': '654c895786644a5c7ac507df',
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNzAwMjkwOTk2LCJleHAiOjE3MDExNTQ5OTZ9.lzUBd4bBCBd6zUsjp9S5C47ofetyCEZ9_aTEZcpxYJY',
          },
        },
      );
      setData(res.data.message);
    } catch (error) {
      console.log('Call api: ', error.response.data);
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
        renderItem={renderItem}
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
  subtitleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    width: '70%',
  },
  timeText: {
    fontSize: 12,
    color: '#888',
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
