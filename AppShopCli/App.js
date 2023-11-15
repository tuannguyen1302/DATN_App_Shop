import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// Import screen components
import GetStart from './screens/WelcomeClass/GetStart';
import GetStart2 from './screens/WelcomeClass/GetStart2';
import Login1 from './screens/LoginClass/Login1';
import Login2 from './screens/LoginClass/Login2';
import SignUp from './screens/LoginClass/SignUp';
import MyProduct from './screens/HomeClass/MyProduct';
import SearchScreen from './screens/HomeClass/MyProductClass/SearchScreen';
import ProductScreen from './screens/HomeClass/MyProductClass/ProductScreen';
import Order from './screens/HomeClass/Order';
import OrderScreen from './screens/HomeClass/OrderClass/OrderScreen';
import OrderHistory from './screens/HomeClass/OrderClass/OrderHistory';
import ShopScreen from './screens/HomeClass/OrderClass/ShopScreen';
import StatisticalScreen from './screens/HomeClass/OrderClass/StatisticalScreen';
import InventoryScreen from './screens/HomeClass/OrderClass/InventoryScreen';
import AddProduct from './screens/HomeClass/MyProductClass/AddProduct';
import UpdateProduct from './screens/HomeClass/MyProductClass/UpdateProduct';
import socketServices from './screens/utils/socketService';

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

        {/* Main App Screens */}
        <StackDemo.Screen name="BottomTab" component={BottomTab} />
        <StackDemo.Screen name="SearchScreen" component={SearchScreen} />
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
        <StackDemo.Screen name="AddProduct" component={AddProduct} />
        <StackDemo.Screen name="UpdateProduct" component={UpdateProduct} />
        <StackDemo.Screen name="Product" component={ProductScreen} />
      </StackDemo.Navigator>
    </NavigationContainer>
  );
};

// Tab Bar component
const BottomTab = () => {
  return (
    <TabDemo.Navigator
      screenOptions={{
        tabBarStyle: {height: 55},
        headerShown: false,
        tabBarActiveTintColor: '#000000',
      }}>
      {/* Tab Screens */}
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

// Function to set Tab Options
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

// Export the main App component
export default App;
