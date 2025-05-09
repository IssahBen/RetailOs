import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../pages/Welcome/Login";
import SignupScreen from "../pages/Welcome/Signup";
import LandingScreen from "../pages/Welcome/Home";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function Tabs() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={EntryStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="log-in-outline" size={24} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (isLoggedIn) {
              navigation.navigate("Bot");
            } else {
              navigation.navigate("Home");
            }
          },
        })}
      />
    </Tab.Navigator>
  );
}

function EntryStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "black", // makes the back arrow white
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />

      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "black", // back arrow color
          headerStyle: {
            backgroundColor: "transparent",
          },
        }}
      />
    </Stack.Navigator>
  );
}
