import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

function Routes() {
  const userData = useSelector(state => state.auth);

  console.log('Reducer all values', userData);
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {MainStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
