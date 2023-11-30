import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {apiGet} from '../../utils/utils';
import {API_BASE_URL, CHAT_API} from '../../config/urls';
import {MessageItemStyles} from './styles';
import {GiftedChat} from 'react-native-gifted-chat';
import socketServices from '../../utils/socketService';

const MessageItem = ({navigation, route}) => {
  const {_id, name, avatar} = route.params;
  const [messages, setMessages] = useState([]);
  const [shopId, setShopId] = useState();

  const getApi = async () => {
    try {
      const res = await apiGet(`${CHAT_API}/getMessages/${_id}`);
      const data = res?.message;
      const formattedMessages = data?.messagers.map(message => ({
        ...message,
        user: {
          _id: message?.senderId,
          name: message?.senderId === shopId ? 'Me' : name,
          avatar: `${API_BASE_URL}${avatar}`,
        },
      }));
      setShopId(data?.shopId);
      setMessages(formattedMessages.reverse());
    } catch (error) {
      console.log('API Error:', error);
    }
  };

  const onSend = newMessages => {
    socketServices.emit('chat message', {
      senderId: shopId,
      message: newMessages[0].text,
      conversationId: _id,
    });
  };

  useEffect(() => {
    getApi();
    socketServices.emit('joinRoom', _id);
    socketServices.on('send message', msg => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          ...msg,
          user: {
            _id: msg?.senderId,
            name: msg?.senderId === shopId ? 'Me' : name,
            avatar: `${API_BASE_URL}${avatar}`,
          },
        }),
      );
    });
  }, []);

  return (
    <View style={MessageItemStyles.container}>
      <View style={MessageItemStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#EEEEEE',
            borderRadius: 15,
          }}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <View style={MessageItemStyles.userInfo}>
          <Image
            source={{uri: `${API_BASE_URL}${avatar}`}}
            style={MessageItemStyles.userAvatar}
          />
          <Text style={MessageItemStyles.userName}>{name}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="questioncircleo" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        placeholder="Nhập tin nhắn..."
        user={{
          _id: shopId,
        }}
        textInputStyle={MessageItemStyles.input}
        // renderSend={props => (
        //   <Send {...props} containerStyle={{justifyContent: 'center'}}>
        //     <TouchableOpacity style={MessageItemStyles.sendButton}>
        //       <MaterialIcons name="send" size={25} color={'white'} />
        //     </TouchableOpacity>
        //   </Send>
        // )}
        isLoadingEarlier
        renderActions={() => (
          <TouchableOpacity style={{alignSelf: 'center', marginLeft: '3%'}}>
            <Feather name="camera" size={25} color="#333" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessageItem;
