import React, {useEffect} from 'react';
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
import {useSelector} from 'react-redux';
import {API_BASE_URL} from '../../config/urls';
import imagePath from '../../constants/imagePath';
import {formatMessageTime} from '../../components/DateTime';

const MessageScreen = ({navigation}) => {
  const data = useSelector(state => state?.chat?.chatData);

  const showAlert = itemId => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa tin nhắn này?',
      [
        {text: 'Hủy', style: 'cancel'},
        {text: 'Xóa', onPress: () => {}},
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => {
    const count = item?.chat?.isRead?.shop?.countNew || 0;
    return (
      <ListItem.Swipeable
        onPress={() => navigateToMessItem(item)}
        rightContent={() => renderDeleteButton(item._id)}
        bottomDivider>
        <Avatar
          size={70}
          rounded
          source={{uri: `${API_BASE_URL}${item?.user?.user_avatar}`}}>
          <Icon
            name="circle"
            type="font-awesome"
            color={item?.user?.user_status === 'active' ? 'green' : 'red'}
            size={15}
            containerStyle={styles.statusIcon}
          />
        </Avatar>
        <ListItem.Content>
          <View style={styles.titleContainer}>
            <ListItem.Title numberOfLines={1} style={styles.txtName}>
              {item?.user?.user_name}
            </ListItem.Title>
            {count > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadText}>{count}</Text>
              </View>
            )}
          </View>
          <View style={styles.titleContainer}>
            <ListItem.Subtitle
              style={[
                styles.subtitle,
                {color: count > 0 ? '#536EFF' : 'black'},
              ]}>
              {item?.chat?.messagers[item?.chat?.messagers.length - 1]}
            </ListItem.Subtitle>
            <ListItem.Subtitle style={styles.timeText}>
              {formatMessageTime(item?.chat?.updatedAt)}
            </ListItem.Subtitle>
          </View>
        </ListItem.Content>
      </ListItem.Swipeable>
    );
  };

  const navigateToMessItem = item => {
    navigation.navigate('MessItem', {
      data: {
        idRoom: item?.chat?._id,
        idShop: item?.chat?.shopId,
        useName: item?.user?.user_name,
        avatar: item?.user?.user_avatar,
      },
    });
  };

  const renderDeleteButton = itemId => (
    <Pressable onPress={() => showAlert(itemId)} style={styles.deleteButton}>
      <MaterialIcons name="delete" size={30} color={'white'} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={imagePath.logo} />
        <Text style={styles.title}>Chat box</Text>
      </View>
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
    width: '80%',
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
  subtitle: {
    width: '80%',
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
  unreadBadge: {
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#536EFF',
  },
  unreadText: {
    color: 'white',
  },
});

export default MessageScreen;
