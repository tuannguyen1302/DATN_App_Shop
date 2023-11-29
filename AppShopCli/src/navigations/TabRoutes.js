import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from '../constants/navigationStrings';
import * as Screens from '../screens';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName={navigationStrings.HomeScreen}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {height: 60, borderTopWidth: 1},
        headerShown: false,
        tabBarActiveTintColor: '#000',
      }}>
      <Tab.Screen
        name={navigationStrings.HomeScreen}
        component={Screens.HomeScreen}
        options={tabOptions('home', FontAwesome5)}
      />
      <Tab.Screen
        name={navigationStrings.MESSAGES}
        component={Screens.MessageScreen}
        options={tabOptions('message1', AntDesign)}
      />
      <Tab.Screen
        name={navigationStrings.ORDER}
        component={Screens.OrderScreen}
        options={tabOptions('profile', AntDesign)}
      />
      <Tab.Screen
        name={navigationStrings.PROFILE}
        component={Screens.ProfileScreen}
        options={tabOptions('user-alt', FontAwesome5)}
      />
    </Tab.Navigator>
  );
}

const tabOptions = (focused, Icons) => ({
  tabBarIcon: ({size, color}) => (
    <Icons name={focused} size={size} color={color} />
  ),
});
