import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import socketServices, {SOCKET_URL} from '../../../utils/socketService';
import {Pressable} from 'react-native';

const MessageItem = ({route}) => {
  const [messages, setMessages] = useState([]);
  const [chatItem, setChatItem] = useState('');
  const {_id} = route.params;
  const flatListRef = useRef(null);

  const headers = {
    'x-xclient-id': '654c895786644a5c7ac507df',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTRjODk1Nzg2NjQ0YTVjN2FjNTA3ZGYiLCJlbWFpbCI6Inh1YW5kdWFuMTIzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBBRVFHUU9qdjBSbmZYRlMyVHZpa2VDMy5OWXgzZ0FrdXJpR3Vzb0ZGVzVjQ0dHelA5aHd5IiwiaWF0IjoxNzAwMjkwOTk2LCJleHAiOjE3MDExNTQ5OTZ9.lzUBd4bBCBd6zUsjp9S5C47ofetyCEZ9_aTEZcpxYJY',
  };

  const apiUrl = `${SOCKET_URL}v1/api/chat/`;

  const getApi = async () => {
    try {
      const res = await axios.get(`${apiUrl}getMessages/${_id}`, {
        headers,
      });
      setMessages(res.data.message?.messagers);
    } catch (error) {
      console.log('API Error:', error.response.data);
    }
  };

  const senMessage = text => {
    setChatItem('');

    const mes = {
      senderId: '654c895786644a5c7ac507df',
      message: text,
      conversationId: _id,
    };
    socketServices.emit('chat message', mes);

    socketServices.on('send message', function (data) {
      messages.push(data);
      setMessages(messages);
    });
  };

  useEffect(() => {
    getApi();
  }, []);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({animated: true});
  };

  const renderItem = ({item}) => {
    const isSender0 = item.senderId === '654c895786644a5c7ac507df';

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
        <View style={[styles.messageBubble, isSender0 && styles.senderBubble]}>
          <Text style={[styles.messageText, isSender0 && styles.senderText]}>
            {item?.text}
          </Text>
          <Text style={[styles.messageTime, isSender0 && styles.senderText]}>
            {formattedTime}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        onContentSizeChange={() => scrollToBottom()}
        onLayout={() => scrollToBottom()}
        extraData={messages}
      />
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TextInput
            value={chatItem}
            onChangeText={setChatItem}
            placeholder="Nhắn tin..."
            style={{flex: 1}}
          />
          <Feather name="image" size={25} />
        </View>

        <Pressable
          disabled={!chatItem}
          onPress={() => {
            senMessage(chatItem);
          }}
          style={({pressed}) => [
            {opacity: pressed ? 0.5 : 1},
            styles.sendButton,
          ]}>
          <Feather name="send" size={35} color={chatItem ? 'blue' : 'gray'} />
        </Pressable>
      </View>
    </View>
  );
};

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
  senderBubble: {
    backgroundColor: '#333',
  },
  senderText: {
    color: 'white',
  },
  messageBubble: {
    width: '55%',
    padding: '4%',
    borderRadius: 10,
    marginVertical: '1%',
    backgroundColor: '#ECECEC',
  },
  messageText: {
    fontSize: 15,
    color: 'black',
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
    borderColor: '#eee',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#ECECEC',
    width: '70%',
    height: 50,
    padding: 5,
    marginRight: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  sendButton: {
    opacity: 0.5,
  },
});

export default MessageItem;
