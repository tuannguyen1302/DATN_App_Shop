import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  FlatList,
  Alert,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ListItem, Avatar} from '@rneui/themed';
import {Icon} from 'react-native-elements';
import {API_BASE_URL, CHAT_API} from '../../config/urls';
import {apiGet} from '../../utils/utils';
import imagePath from '../../constants/imagePath';

const MessageScreen = ({navigation}) => {
  const [data, setData] = useState([]);

  const renderButton = itemId => (
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
      <View style={styles.header}>
        <Image style={styles.logo} source={imagePath.logo} />
        <Text style={styles.title}>Chat box</Text>
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
            rightContent={() => renderButton(item?._id)}
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
                <ListItem.Title numberOfLines={1} style={styles.txtName}>
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
    backgroundColor: 'white',
  },
  header: {
    marginTop: 15,
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: 'center',
    marginBottom: '2%',
  },
  logo: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
  },
  title: {
    left: '20%',
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
  },
  txtName: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 15,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  statusIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default MessageScreen;
