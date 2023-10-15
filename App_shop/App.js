import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStart from "./screens/ClassStart/GetStart";
import GetStart2 from "./screens/ClassStart/GetStart2";
import HomeScreen from "./screens/MainScreen";

const StackDemo = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StackDemo.Navigator screenOptions={{ headerShown: false }}>
        <StackDemo.Screen name="GetStart" component={GetStart} />
        <StackDemo.Screen name="GetStart2" component={GetStart2} />
        <StackDemo.Screen name="HomeScreen" component={HomeScreen} />
        {/* viết tiếp các màn hình khác vào đây */}
      </StackDemo.Navigator>
    </NavigationContainer>
  );
};

export default App;
