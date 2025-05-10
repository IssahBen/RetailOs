import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "../global.css";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Shared/Navigation";
import { AuthProvider } from "./Context/AuthContext";
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AuthProvider>
  );
}
