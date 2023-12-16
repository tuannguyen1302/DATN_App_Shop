import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {apiGet} from '../../utils/utils';
import {API_BASE_URL, CHAT_API} from '../../config/urls';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import socketServices from '../../utils/socketService';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Removed unused import
import {saveChatData} from '../../redux/actions/chat';

const MessageItem = ({navigation, route}) => {
  const {data} = route.params;
  const [messages, setMessages] = useState([]);

  const getApi = async () => {
    try {
      const res = await apiGet(`${CHAT_API}/getMessages/${data?.idRoom}`);
      const mess = res?.message?.messagers.map(message => ({
        ...message,
        user: {
          _id: message?.senderId,
          name: message?.senderId === data?.idShop ? 'Me' : data.useName,
          avatar: `${API_BASE_URL}${data?.avatar}`,
        },
      }));
      setMessages(mess.reverse());
    } catch (error) {
      console.log('API Error:', error);
    }
  };

  const openImagePicker = async isCheck => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      const result = isCheck
        ? await launchCamera({mediaType: 'photo', includeBase64: true})
        : await launchImageLibrary({
            mediaType: 'photo',
            multiple: true,
            includeBase64: true,
          });

      if (!result.cancelled) {
        const imageMessage = {
          _id: Math.round(Math.random() * 1000000),
          text: ' ',
          createdAt: new Date(),
          user: {
            _id: data?.idShop,
          },
          image: `data:image/jpeg;base64,${result.assets[0].base64}`,
        };
        onSend(true, [imageMessage]);
      }
    } catch (error) {
      console.log('Error selecting image:', error);
    }
  };

  const onSend = (ischeck, newMessages) => {
    socketServices.emit('chat message', {
      senderId: data?.idShop,
      message: newMessages[0].text,
      image: ischeck ? newMessages[0].image : null,
      conversationId: data?.idRoom,
    });
  };

  useEffect(() => {
    getApi();
    socketServices.emit('joinRoom', data?.idRoom);
    socketServices.on('send message', msg => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, {
          ...msg,
          user: {
            _id: msg?.senderId,
            name: msg?.senderId === data?.idShop ? 'Me' : data.useName,
            avatar: `${API_BASE_URL}${msg.avatar}`,
          },
        }),
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={async () => {
            socketServices.emit('leaveRoom', {
              roomName: data?.idRoom,
              userId: data?.idShop,
            });
            await saveChatData();
            navigation.goBack();
          }}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Image
            source={{uri: `${API_BASE_URL}${data?.avatar}`}}
            style={styles.userAvatar}
          />
          <Text style={styles.userName}>{data?.useName}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="questioncircleo" size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(false, newMessages)}
        placeholder="Nhập tin nhắn..."
        user={{
          _id: data?.idShop,
        }}
        textInputStyle={styles.input}
        renderSend={props => (
          <Send {...props} containerStyle={styles.sendContainer}>
            <TouchableOpacity
              onPress={() => props.onSend({text: props.text.trim()}, true)}
              style={styles.sendButton}>
              <MaterialIcons name="send" size={25} color={'white'} />
            </TouchableOpacity>
          </Send>
        )}
        // isTyping
        isLoadingEarlier
        renderActions={() => (
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Thông báo',
                'Bạn muốn lấy ảnh từ 🦘',
                [
                  {
                    text: 'Chụp ảnh',
                    onPress: () => {
                      openImagePicker(true);
                    },
                  },
                  {
                    text: 'Thư viện',
                    onPress: () => {
                      openImagePicker(false);
                    },
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              );
            }}
            style={styles.cameraButton}>
            <Feather name="camera" size={25} color="#333" />
          </TouchableOpacity>
        )}
        renderMessageText={props =>
          !props.currentMessage.image && (
            <Text
              style={[
                styles.messageText,
                {
                  color:
                    props.currentMessage.user._id == data.idShop
                      ? 'white'
                      : 'black',
                },
              ]}>
              {props.currentMessage.text}
            </Text>
          )
        }
        renderMessageImage={props => (
          <Image
            source={{uri: props.currentMessage.image}}
            style={styles.messageImage}
          />
        )}
        renderTime={props =>
          !props.currentMessage.image && (
            <Text
              style={[
                styles.messageText,
                {
                  fontSize: 10,
                  paddingVertical: 2,
                  color:
                    props.currentMessage.user._id == data.idShop
                      ? 'white'
                      : 'black',
                },
              ]}>
              {new Date(props.currentMessage.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {new Date(props.currentMessage.createdAt).getHours() < 12
                ? ' AM'
                : ' PM'}
            </Text>
          )
        }
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
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    padding: '3%',
    justifyContent: 'space-between',
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    right: '6%',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  input: {
    marginTop: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#999',
  },
  sendContainer: {
    justifyContent: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: '2%',
    backgroundColor: '#19B9EC',
  },
  cameraButton: {
    alignSelf: 'center',
    marginLeft: '3%',
  },
  messageText: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    color: 'white',
    fontWeight: '400',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
});

export default MessageItem;
