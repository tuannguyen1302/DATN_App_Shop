import React, {useEffect} from 'react';
import {Notifications} from 'react-native-notifications';
import socketServices from './src/utils/socketService';
import {PermissionsAndroid, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Routes from './src/navigations/Router';

const App = () => {
  const handlePress = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      Notifications.postLocalNotification({
        title: 'Thông báo',
        body: 'Đây là một thông báo mẫu',
        extra: 'data',
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socketServices.initializeSocket();
  }, []);

  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <Routes />
      </View>
    </Provider>
  );
};

export default App;
