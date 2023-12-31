import React, {useEffect} from 'react';
import socketServices from './src/utils/socketService';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Routes from './src/navigations/Router';

const App = () => {
  useEffect(() => {
    socketServices.initializeSocket();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{flex: 1}}>
        <Routes />
      </View>
    </Provider>
  );
};

export default App;
