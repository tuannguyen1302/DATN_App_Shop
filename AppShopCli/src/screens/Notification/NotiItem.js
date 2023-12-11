import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NotiItem = ({navigation, route}) => {
  const item = route.params;
  console.log(item);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name="left" size={20} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.title}>Information Notification</Text>
      </View>
      <WebView
        source={{uri: 'https://741e-116-96-45-68.ngrok-free.app/shopNoti/'}}
        style={{flex: 1}}
      />
    </View>
  );
};

export default NotiItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 15,
  },
  title: {
    left: '30%',
    fontSize: 22,
    color: 'black',
    fontWeight: '600',
  },
});
