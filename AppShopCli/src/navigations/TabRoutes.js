import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import navigationStrings from '../constatns/navigationStrings';
import * as Screens from '../screens';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName={navigationStrings.MY_PRODUCT}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {height: 60},
        headerShown: false,
        tabBarActiveTintColor: '#000000',
      }}>
      <Tab.Screen
        name={navigationStrings.MY_PRODUCT}
        component={Screens.MyProduct}
        options={tabOptions('box-open', 'box')}
      />
      <Tab.Screen
        name={navigationStrings.ORDER}
        component={Screens.Order}
        options={tabOptions('clipboard', 'clipboard-list')}
      />
    </Tab.Navigator>
  );
}

const tabOptions = (iconNameFocused, iconNameUnfocused) => ({
  tabBarActiveTintColor: '#19B9EC',
  tabBarIcon: ({focused, size, color}) => (
    <FontAwesome5
      name={focused ? iconNameFocused : iconNameUnfocused}
      size={size}
      color={color}
    />
  ),
});
