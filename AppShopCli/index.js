/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Order from './screens/HomeClass/Order';
import DiscountCodeScreen from './screens/HomeClass/discountclass/Discountscreens';


AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => DiscountCodeScreen);