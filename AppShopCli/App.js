import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity, View} from 'react-native';

// Import screen components
import GetStart from './src/screens/WelcomeClass/GetStart';
import GetStart2 from './src/screens/WelcomeClass/GetStart2';
import Login1 from './src/screens/LoginClass/Login1';
import Login2 from './src/screens/LoginClass/Login2';
import SignUp from './src/screens/LoginClass/SignUp';
import MyProduct from './src/screens/HomeClass/MyProduct';
import MessageScreen from './src/screens/HomeClass/MyProductClass/MessageScreen';
import SearchScreen from './src/screens/HomeClass/MyProductClass/SearchScreen';
import ProductScreen from './src/screens/HomeClass/MyProductClass/ProductScreen';
import AddProduct from './src/screens/HomeClass/MyProductClass/AddProduct';
import UpdateProduct from './src/screens/HomeClass/MyProductClass/UpdateProduct';
import Order from './src/screens/HomeClass/Order';
import OrderScreen from './src/screens/HomeClass/OrderClass/OrderScreen';
import OrderHistory from './src/screens/HomeClass/OrderClass/OrderHistory';
import ShopScreen from './src/screens/HomeClass/OrderClass/ShopScreen';
import StatisticalScreen from './src/screens/HomeClass/OrderClass/StatisticalScreen';
import InventoryScreen from './src/screens/HomeClass/OrderClass/InventoryScreen';
import PromotionScreen from './src/screens/HomeClass/OrderClass/PromotionScreen';
import socketServices from './src/utils/socketService';
import MessItem from './src/screens/HomeClass/MyProductClass/MessItem';

// Declare Stack and Tab Navigation
const StackDemo = createNativeStackNavigator();
const TabDemo = createBottomTabNavigator();

// Main component
const App = () => {
  useEffect(() => {
    socketServices.initializeSocket();
  }, []);

  return (
    <NavigationContainer>
      <StackDemo.Navigator screenOptions={{headerShown: false}}>
        {/* Authentication Screens */}
        {/* <StackDemo.Screen name="GetStart" component={GetStart} />
        <StackDemo.Screen name="GetStart2" component={GetStart2} />
        <StackDemo.Screen name="Login1" component={Login1} />
        <StackDemo.Screen name="Login2" component={Login2} />
        <StackDemo.Screen name="SignUp" component={SignUp} /> */}

        {/* Main */}
        <StackDemo.Screen name="BottomTab" component={BottomTab} />
        <StackDemo.Screen
          name="MessageScreen"
          component={MessageScreen}
          options={{headerShown: true, title: 'Tin nhắn'}}
        />
        <StackDemo.Screen
          name="MessItem"
          component={MessItem}
          options={({route}) => ({
            title: route.params.name,
            headerShown: true,
          })}
        />
        <StackDemo.Screen name="SearchScreen" component={SearchScreen} />
        <StackDemo.Screen name="AddProduct" component={AddProduct} />
        <StackDemo.Screen name="UpdateProduct" component={UpdateProduct} />
        <StackDemo.Screen name="Product" component={ProductScreen} />

        {/* Order */}
        <StackDemo.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            headerShown: true,
            title: 'Đơn hàng',
            headerTransparent: true,
          }}
        />
        <StackDemo.Screen name="OrderHistory" component={OrderHistory} />
        <StackDemo.Screen name="ShopScreen" component={ShopScreen} />
        <StackDemo.Screen name="PromotionScreen" component={PromotionScreen} />
        <StackDemo.Screen
          name="StatisticalScreen"
          component={StatisticalScreen}
          options={{
            headerShown: true,
            title: 'Thống kê',
            headerTransparent: true,
          }}
        />
        <StackDemo.Screen
          name="InventoryScreen"
          component={InventoryScreen}
          options={{
            headerShown: true,
            title: 'Kho hàng',
            headerTransparent: true,
          }}
        />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
};

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
        options={tabOptions('Sản phẩm', 'box-open', 'box')}
      />
      <TabDemo.Screen
        name="Order"
        component={Order}
        options={tabOptions('Đơn hàng', 'clipboard', 'clipboard-list')}
      />
    </TabDemo.Navigator>
  );
};

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
