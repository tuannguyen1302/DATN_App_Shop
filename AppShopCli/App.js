// Khai báo điều hướng
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const StackDemo = createNativeStackNavigator();
const TabDemo = createBottomTabNavigator();

// Khai báo icon tại đây
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Khai báo màn hình tại đây
import GetStart from './screens/ClassStart/GetStart';
import GetStart2 from './screens/ClassStart/GetStart2';
import Login1 from './screens/ClassLogin/Login1';
import LoginWithPassword from './screens/ClassLogin/LoginWithPassword';
import SignUp from './screens/ClassLogin/SignUp';
import MyProduct from './screens/ClassTab/MyProduct';
import Order from './screens/ClassTab/Order';
import Search1Screen from './screens/ClassTab/ScreenTab/Search1Screen';
import Search2Screen from './screens/ClassTab/ScreenTab/Search2Screen';

const App = () => {
  return (
    <NavigationContainer>
      <StackDemo.Navigator screenOptions={{headerShown: false}}>
        <StackDemo.Screen name="GetStart" component={GetStart} />
        <StackDemo.Screen name="GetStart2" component={GetStart2} />
        {/* viết tiếp các màn hình khác vào đây */}
        <StackDemo.Screen name="Login1" component={Login1} />
        <StackDemo.Screen
          name="LoginWithPassword"
          component={LoginWithPassword}
        />
        <StackDemo.Screen name="SignUp" component={SignUp} />
        <StackDemo.Screen name="BottomTab" component={BottomTab} />
        <StackDemo.Screen name="Search1Screen" component={Search1Screen} />
        <StackDemo.Screen name="Search2Screen" component={Search2Screen} />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
};

const BottomTab = () => {
  return (
    <TabDemo.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
        },
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000',
      }}>
      <TabDemo.Screen
        name="MyProduct"
        component={MyProduct}
        options={{
          tabBarLabel: 'Sản phẩm của tôi',
          tabBarIcon: ({focused, size, color}) => (
            <FontAwesome5
              name={focused ? 'box-open' : 'box'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabDemo.Screen
        name="Order"
        component={Order}
        options={{
          tabBarLabel: 'Đơn hàng',
          tabBarIcon: ({focused, size, color}) => (
            <MaterialCommunityIcons
              name={focused ? 'clipboard-check-multiple' : 'clipboard-check'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabDemo.Navigator>
  );
};

export default App;
