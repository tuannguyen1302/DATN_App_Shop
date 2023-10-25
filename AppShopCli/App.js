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
import Login2 from './screens/ClassLogin/Login2';
import SignUp from './screens/ClassLogin/SignUp';
// Màn hình tab 1
import MyProduct from './screens/ClassTab/MyProduct';
import SearchScreen from './screens/ClassTab/ScreenTab/SearchScreen';
// Màn hình tab 2
import Order from './screens/ClassTab/Order';
import OrderScreen from './screens/ClassTab/ScreenTab/OrderScreen';

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
        {/* viết tiếp các màn hình khác vào đây */}
        <StackDemo.Screen name="SearchScreen" component={SearchScreen} />
        <StackDemo.Screen name="OrderScreen" component={OrderScreen} />
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