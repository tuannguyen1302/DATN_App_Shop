import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import socketService from './src/utils/socketService';
import {View} from 'react-native';
import store from './src/redux/store';
import Routes from './src/navigations/Router';

const App = () => {
  useEffect(() => {
    socketService.initializeSocket();
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
