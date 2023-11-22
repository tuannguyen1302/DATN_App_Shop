import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import socketServices from './src/utils/socketService';
import {StyleSheet, View} from 'react-native';
import store from './src/redux/store';
import Routes from './src/navigations/Router';

const App = () => {
  useEffect(() => {
    socketServices.initializeSocket();
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Routes />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
