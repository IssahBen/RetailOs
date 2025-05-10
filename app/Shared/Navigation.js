import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../pages/Welcome/Login";
import SignupScreen from "../pages/Welcome/Signup";
import LandingScreen from "../pages/Welcome/Home";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import POSScreen from "../pages/Salesfloor/Pos";
import { useAuth } from "../Context/AuthContext";
import ProductsPage from "../pages/Products/ProductsPage";
import EditProductScreen from "../pages/Products/EditProduct";
import AddProductScreen from "../pages/Products/AddProduct";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function Tabs() {
  const { isLoggedIn, setVisible, setErrorMessage } = useAuth(false);
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
        name="Main"
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
              navigation.navigate("Salesfloor");
            } else {
              navigation.navigate("Main");
            }
          },
        })}
      />

      <Tab.Screen
        name="Salesfloor"
        component={SalesStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={24} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (isLoggedIn) {
              navigation.navigate("Salesfloor");
            } else {
              navigation.navigate("Main");
              setErrorMessage("Sign Up || Sign In");
              setVisible(true);
            }
          },
        })}
      />
      <Tab.Screen
        name="Items"
        component={ProductsStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="pricetags-outline" size={24} color={color} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (isLoggedIn) {
              navigation.navigate("Items");
            } else {
              navigation.navigate("Main");
              setErrorMessage("Sign Up || Sign In");
              setVisible(true);
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
function SalesStack() {
  return (
    <Stack.Navigator initialRouteName="Sales">
      <Stack.Screen
        name="Sales"
        component={POSScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function ProductsStack() {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ProductsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-product"
        component={AddProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="edit-product"
        component={EditProductScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
