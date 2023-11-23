import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

function Routes() {
  const userData = useSelector(state => state.auth);

  console.log('Reducer all values', userData);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {MainStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
