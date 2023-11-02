import React from 'react';
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
import UpdateProduct from './screens/HomeClass/MyProductClass/Update';
import ProductScreen from './screens/HomeClass/MyProductClass/ProductScreen';
import Order from './screens/HomeClass/Order';
import OrderScreen from './screens/HomeClass/OrderClass/OrderScreen';
import ShopScreen from './screens/HomeClass/OrderClass/ShopScreen';
import StatisticalScreen from './screens/HomeClass/OrderClass/StatisticalScreen';
import InventoryScreen from './screens/HomeClass/OrderClass/InventoryScreen';
import AddProduct from './screens/HomeClass/MyProductClass/AddProduct';

// Declare Stack and Tab Navigation
const StackDemo = createNativeStackNavigator();
const TabDemo = createBottomTabNavigator();

// Main component
const App = () => {
  return (
    <NavigationContainer>
      <StackDemo.Navigator screenOptions={{headerShown: false}}>
        {/* Authentication Screens */}
        <StackDemo.Screen name="GetStart" component={GetStart} />
        <StackDemo.Screen name="GetStart2" component={GetStart2} />
        <StackDemo.Screen name="Login1" component={Login1} />
        <StackDemo.Screen name="Login2" component={Login2} />
        <StackDemo.Screen name="SignUp" component={SignUp} />

        {/* Main App Screens */}
        <StackDemo.Screen name="BottomTab" component={BottomTab} />
        <StackDemo.Screen name="SearchScreen" component={SearchScreen} />
        <StackDemo.Screen name="OrderScreen" component={OrderScreen} />
        <StackDemo.Screen name="ShopScreen" component={ShopScreen} />
        <StackDemo.Screen
          name="StatisticalScreen"
          component={StatisticalScreen}
        />
        <StackDemo.Screen name="InventoryScreen" component={InventoryScreen} />
        <StackDemo.Screen name="addProduct" component={AddProduct} />
        <StackDemo.Screen name="UpdateProduct" component={UpdateProduct} />
        <StackDemo.Screen name="MyProduct" component={MyProduct} />
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
