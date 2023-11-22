import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import socketServices from '../../../utils/socketService';
import {Pressable} from 'react-native';
import {apiGet, getItem} from '../../../utils/utilus';
import {CHAT_API} from '../../../config/urls';

const MessageItem = ({route}) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const {_id} = route.params;

  const getApi = useCallback(async () => {
    try {
      const token = await getItem('LoginUser');
      const res = await apiGet(`${CHAT_API}/getMessages/${_id}`);
      setUserId(token?.userId);
      setData(res?.message?.messagers);
    } catch (error) {
      console.log('API Error:', error);
    }
  }, [_id]);

  // Hàm gửi tin nhắn
  const senMessage = () => {
    if (!!message) {
      setMessage('');
      socketServices.emit('chat message', {
        senderId: userId,
        message,
        conversationId: _id,
      });
    } else {
      alert('Tin nhắn trống');
    }
  };

  useEffect(() => {
    getApi();
    socketServices.emit('joinRoom', _id);
  }, [getApi, _id]);

  useEffect(() => {
    socketServices.on('send message', msg => {
      setData(prevData => [...prevData, msg]);
    });
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      const isSender0 = item.senderId === userId;
      const createdAt = new Date(item.createdAt);
      const formattedTime = createdAt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });

      return (
        <View
          style={[
            styles.messageContainer,
            isSender0 ? styles.sender1 : styles.sender0,
          ]}>
          <View
            style={[
              styles.messageBubble,
              isSender0 && {
                backgroundColor: '#19B9EC',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 0,
              },
            ]}>
            <Text style={[styles.messageText, isSender0 && {color: 'white'}]}>
              {item?.text}
            </Text>
            <Text style={[styles.messageTime, isSender0 && {color: 'white'}]}>
              {formattedTime}
            </Text>
          </View>
        </View>
      );
    },
    [userId],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item?._id}
        renderItem={renderItem}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
      />
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <MaterialIcons name="insert-emoticon" size={25} />
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Nhắn tin..."
            style={{width: '80%', fontSize: 16}}
          />
          <Feather name="camera" size={25} color="#333" />
        </View>

        <Pressable
          onPress={senMessage}
          style={[styles.sendButton, !message && {backgroundColor: 'gray'}]}>
          <MaterialIcons name="send" size={25} color={'white'} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// Style của component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: '2%',
    marginBottom: '1%',
  },
  sender0: {
    justifyContent: 'flex-start',
  },
  sender1: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    width: '55%',
    padding: '4%',
    borderRadius: 10,
    marginVertical: '1%',
    borderTopLeftRadius: 0,
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '400',
    width: '90%',
  },
  messageTime: {
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    bottom: 5,
    right: '7%',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    bottom: 0,
    height: 80,
    borderTopWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '3%',
  },
  input: {
    backgroundColor: '#f0f0f0',
    width: '80%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  sendButton: {
    width: 55,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#19B9EC',
  },
});

// Xuất component để sử dụng
export default MessageItem;
