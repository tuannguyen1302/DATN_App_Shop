import { StatusBar } from 'expo-status-bar';


import * as Progress from 'react-native-progress';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import HomeScreen from './comp/MainScreen';
import { useEffect } from 'react';

import { View, Image, StyleSheet, Text } from 'react-native';


const StackDemo = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <StackDemo.Navigator initialRouteName='getstart'>
        <StackDemo.Screen name='getstart' component={getstart} options={{ title: '', headerShown: false }} />
        <StackDemo.Screen name='getstart2' component={getstart2} options={{ title: '', headerShown: false }} />
        {/* viết tiếp các màn hình khác vào đây */}
      </StackDemo.Navigator>
    </NavigationContainer>

  );
}
const getstart = ({ navigation }) => {
  // const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('getstart2');
    }, 3000);
  }, []);


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}> Welcome Welcome </Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 90 }}>
          <Text style={styles.text}> Welcome  </Text>
        </View>
      </View>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Progress.CircleSnail size={50} thickness={4} color={['white', 'white', 'white']} />
    </View>
  );
}
const getstart2 = ({ navigation }) => {
  // const navigation = useNavigation();


  return (
    <HomeScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {

    width: 400,
    height: 400,

    marginBottom: 100
  },
  text: { color: "#ffff", fontSize: 32, fontWeight: 'bold', }
});
