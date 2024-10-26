// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "./screens/AdminScreen";
import UserScreen from "./screens/UserScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Admin">
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
