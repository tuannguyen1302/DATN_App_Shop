import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStart from "./screens/ClassStart/GetStart";
import GetStart2 from "./screens/ClassStart/GetStart2";
import Login1 from "./screens/ClassLogin/Login1"
import LoginWithPassword from "./screens/ClassLogin/LoginWithPassword";
import SignUp from './screens/ClassLogin/SignUp'
const StackDemo = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StackDemo.Navigator screenOptions={{ headerShown: false }}>
        <StackDemo.Screen name="GetStart" component={GetStart} />
        <StackDemo.Screen name="GetStart2" component={GetStart2} />
        <StackDemo.Screen name="Login1" component={Login1} />
        <StackDemo.Screen name="LoginWithPassword" component={LoginWithPassword} />
        <StackDemo.Screen name="SignUp" component={SignUp} />
        {/* viết tiếp các màn hình khác vào đây */}
      </StackDemo.Navigator>
    </NavigationContainer>
  );
};

export default App;
