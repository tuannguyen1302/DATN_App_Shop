import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import GetStart from './screens/ClassStart/GetStart';
import GetStart2 from './screens/ClassStart/GetStart2';
import Login1 from './screens/ClassLogin/Login1';
import Login2 from './screens/ClassLogin/Login2';
import SignUp from './screens/ClassLogin/SignUp';
import MyProduct from './screens/ClassTab/MyProduct';
import SearchScreen from './screens/ClassTab/ScreenTab/SearchScreen';
import Order from './screens/ClassTab/Order';
import OrderScreen from './screens/ClassTab/ScreenTab/OrderScreen';
import ShopScreen from './screens/ClassTab/ScreenTab/ShopScreen';
import StatisticalScreen from './screens/ClassTab/ScreenTab/StatisticalScreen';
import InventoryScreen from './screens/ClassTab/ScreenTab/InventoryScreen';

// Khai báo Stack và Tab Navigation
const StackDemo = createNativeStackNavigator();
const TabDemo = createBottomTabNavigator();

// Component chính
const App = () => {
  return (
    <NavigationContainer>
      <StackDemo.Navigator screenOptions={{headerShown: false}}>
        <StackDemo.Screen name="GetStart" component={GetStart} />
        <StackDemo.Screen name="GetStart2" component={GetStart2} />
        <StackDemo.Screen name="Login1" component={Login1} />
        <StackDemo.Screen name="Login2" component={Login2} />
        <StackDemo.Screen name="SignUp" component={SignUp} />
        <StackDemo.Screen name="BottomTab" component={BottomTab} />
        <StackDemo.Screen name="SearchScreen" component={SearchScreen} />
        <StackDemo.Screen name="OrderScreen" component={OrderScreen} />
        <StackDemo.Screen name="ShopScreen" component={ShopScreen} />
        <StackDemo.Screen
          name="StatisticalScreen"
          component={StatisticalScreen}
        />
        <StackDemo.Screen name="InventoryScreen" component={InventoryScreen} />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
};

// Component Tab Bar
const BottomTab = () => {
  return (
    <TabDemo.Navigator
      screenOptions={{
        tabBarStyle: {height: 55},
        headerShown: false,
        tabBarActiveTintColor: '#000000',
      }}>
      <TabDemo.Screen
        name="MyProduct"
        component={MyProduct}
        options={tabOptions('Sản phẩm của tôi', 'box-open', 'box')}
      />
      <TabDemo.Screen
        name="Order"
        component={Order}
        options={tabOptions('Đơn hàng', 'clipboard', 'clipboard-list')}
      />
    </TabDemo.Navigator>
  );
};

// Function để thiết lập Tab Options
const tabOptions = (label, iconNameFocused, iconNameUnfocused) => ({
  tabBarLabel: label,
  tabBarIcon: ({focused, size, color}) => (
    <FontAwesome5
      name={focused ? iconNameFocused : iconNameUnfocused}
      size={size}
      color={color}
    />
  ),
});

export default App;
