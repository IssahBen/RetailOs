import { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import {
  ArrowLeft,
  Package,
  TriangleAlert as AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { v4 as uuid } from "uuid";
import { saveReminder } from "../../Shared/ReminderManager";
export default function StockReportScreen() {
  const navigation = useNavigation();
  const [metric, setMetric] = useState([]);
  const [stock, setStock] = useState([]);
  async function GetReport() {
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/reports/stock",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      // Set the fetched data to state
      setMetric(data.metrics);
      setStock(data.current_stock);
      return "success";
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data from the server.");
    }
  }
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Enable notifications in settings.");
      }
    })();
  }, []);

  useEffect(() => {
    GetReport();
  }, []);
  const scheduleReminder = async (productName, quantity) => {
    // Schedule 5 seconds from now
    const scheduledDate = new Date(Date.now() + 5000);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Stock Alert`,
        body: `Stock for ${productName} is low (${quantity} units left)`,
        sound: "default",
      },
      trigger: scheduledDate,
    });

    console.log("Scheduled Notification ID:", notificationId);

    const id = uuid.v4();
    await saveReminder({
      id,
      title,
      time: scheduledDate.toLocaleTimeString(), // or scheduledDate.toISOString() for full time
      notificationId,
    });
  };
  useEffect(() => {
    stock.map((item) => {
      if (item.quantity <= item.reorder_level) {
        scheduleReminder(item.product_name, item.quantity);
      }
    });
  }, [stock]);
  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-6 pt-16 pb-5 bg-white border-b border-gray-100">
        <Text className="text-2xl text-zinc-900 font-extrabold">
          Stock Reports
        </Text>
        <TouchableOpacity
          className="ml-auto p-2 rounded-full bg-gray-100"
          onPress={() => {
            GetReport();
          }}
        >
          <RefreshCw size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="flex-row flex-wrap px-4 gap-4">
          {metric.map((metric, index) => (
            <View
              key={index}
              className="flex-1 min-w-[45%] bg-white rounded-2xl p-4 shadow-sm"
            >
              <Text className="text-sm text-gray-500 font-normal mb-2">
                {metric.title}
              </Text>
              <Text className="text-2xl text-zinc-900 font-extrabold mb-2">
                {metric.value}
              </Text>
            </View>
          ))}
        </View>

        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm">
          <Text className="text-lg text-zinc-900 font-semibold mb-4">
            Current Stock
          </Text>
          {stock.map((item) => (
            <View
              key={Math.floor(100000 + Math.random() * 900000)}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <View className="w-10 h-10 rounded-full bg-blue-100 justify-center items-center mr-3">
                <Package size={20} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-base text-zinc-900 font-semibold">
                  {item.product_name}
                </Text>
                <Text className="text-sm text-gray-500">
                  Stock - {item.quantity} units
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
