// import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SettingScreen from "./screens/setting-screen";
import FocusScreen from "./screens/focus-screen";
import MainScreen from "./screens/main-screen";
import PorfileScreen from "./screens/profile-screen";
import { Ionicons,MaterialIcons } from "@expo/vector-icons";
import { View } from "native-base";
const tab = createBottomTabNavigator();

const App = () => {
  // const HomeStack =  createNativeStackNavigator()
  // function HomeStackScreen() {
  //   return (
  //     <HomeStack.Navigator screenOptions={{
  //       headerShown: false
  //     }}>
  //       <HomeStack.Screen   name="Index" component={MainScreen} />
  //       <HomeStack.Screen name="Detail"component={TaskDetailScreen} />
  //     </HomeStack.Navigator>
  //   )
  // }

  return (
    <tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "ios-home" : "ios-home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Focus") {
            return (
              <MaterialIcons
                name={focused ? "timer" : "timer"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Porfile") {
            return (
              <Ionicons
                name={focused ? "ios-list" : "ios-home-outline"}
                size={size}
                color={color}
              />
            );
          }
        },
        tabBarInactiveTintColor: "gray",
        // tabBarActiveTintColor: "tomato",
        tabBarStyle: {position: 'absolute', bottom: 0,left: 0,right:0,maxHeight: 70}
      })}
    >
        <tab.Screen name="Home" component={MainScreen}></tab.Screen>
        <tab.Screen name="Focus" component={FocusScreen}></tab.Screen>
        <tab.Screen name="Porfile" component={PorfileScreen}></tab.Screen>
    </tab.Navigator>
  );
};
export default App;
