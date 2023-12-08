import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import navigationStrings from '../constants/navigationStrings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TabButton from '../components/TabButton';
import { useSelector } from 'react-redux';
import * as Screens from '../screens';

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  const count = useSelector(state =>
    state?.chat?.chatData
      ? state?.chat?.chatData.reduce(
        (count, item) => count + item.chat?.isRead?.shop?.countNew,
        0,
      )
      : 0,
  );

  const TabArr = [
    {
      route: navigationStrings.HomeScreen,
      label: 'Home',
      type: FontAwesome5,
      icon: 'home',
      component: Screens.HomeScreen,
    },
    {
      route: navigationStrings.MESSAGES,
      label: 'Message',
      type: AntDesign,
      icon: 'message1',
      count: count,
      component: Screens.MessageScreen,
    },
    {
      route: navigationStrings.ORDER,
      label: 'Order',
      type: AntDesign,
      icon: 'profile',
      component: Screens.OrderScreen,
    },
    {
      route: navigationStrings.PROFILE,
      label: 'Profile',
      type: FontAwesome5,
      icon: 'user-alt',
      component: Screens.ProfileScreen,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarStyle: {
          height: 60,
          borderRadius: 10,
          elevation: 5,
        },
      }}>
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabRoutes;