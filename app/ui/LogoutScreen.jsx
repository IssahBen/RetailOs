import { View, TouchableOpacity, Text } from "react-native";
import { LogOut } from "lucide-react-native"; // Import your icon here
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Context/AuthContext";
export default function LogoutButton() {
  const { logout } = useAuth();
  const navigation = useNavigation();
  async function HandleLogout() {
    const result = await logout();
    if (result === "success") {
      navigation.navigate("Main");
    }
  }
  return (
    <View className="absolute bottom-0 right-[-110] w-full p-4 border-t border-gray-200 dark:border-gray-700">
      <TouchableOpacity
        onPress={HandleLogout}
        className="flex-row items-center px-4 py-2 w-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
      >
        <LogOut size={18} className="mr-2" />
        <Text>Exit</Text>
      </TouchableOpacity>
    </View>
  );
}
