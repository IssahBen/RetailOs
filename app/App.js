import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "../global.css";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Shared/Navigation";
import { AuthProvider } from "./Context/AuthContext";
import ProductsPovider from "./Context/ProductsContext";
import * as Notifications from "expo-notifications"; // 👈 Add this
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <AuthProvider>
      <ProductsPovider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ProductsPovider>
    </AuthProvider>
  );
}
