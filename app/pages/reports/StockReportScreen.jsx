import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import {
  ArrowLeft,
  Package,
  TriangleAlert as AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
export default function StockReportScreen() {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const periods = ["day", "week", "month", "year"];

  const metrics = [
    {
      title: "Total Items",
      value: "1,245",
      change: "+15",
      trend: "up",
      color: "#3B82F6",
    },
    {
      title: "Low Stock Items",
      value: "23",
      change: "-5",
      trend: "down",
      color: "#F59E0B",
    },
    {
      title: "Out of Stock",
      value: "8",
      change: "+2",
      trend: "up",
      color: "#EF4444",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row items-center px-6 pt-16 pb-5 bg-white border-b border-gray-100">
        <Text className="text-2xl text-zinc-900 font-extrabold">
          Stock Reports
        </Text>
      </View>

      <ScrollView className="flex-1">
        <View className="flex-row px-4 py-4 bg-white border-b border-gray-100">
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedPeriod === period ? "bg-blue-500" : "bg-gray-100"
              }`}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                className={`${
                  selectedPeriod === period ? "text-white" : "text-gray-500"
                } text-sm font-semibold`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="flex-row flex-wrap px-4 gap-4">
          {metrics.map((metric, index) => (
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
              <View className="flex-row items-center">
                {metric.trend === "up" ? (
                  <TrendingUp size={16} color={metric.color} />
                ) : (
                  <TrendingDown size={16} color={metric.color} />
                )}
                <Text
                  className="text-sm font-semibold ml-1"
                  style={{ color: metric.color }}
                >
                  {metric.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm">
          <Text className="text-lg text-zinc-900 font-semibold mb-4">
            Stock Level Trends
          </Text>
          <View className="h-52 bg-gray-100 rounded-lg justify-center items-center">
            <Text className="text-sm text-gray-500">Stock Level Chart</Text>
          </View>
        </View>

        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm">
          <Text className="text-lg text-zinc-900 font-semibold mb-4">
            Stock Alerts
          </Text>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <View
                className={`w-10 h-10 rounded-full justify-center items-center mr-3 ${
                  item === 1 ? "bg-red-100" : "bg-yellow-100"
                }`}
              >
                <AlertTriangle
                  size={20}
                  color={item === 1 ? "#EF4444" : "#F59E0B"}
                />
              </View>
              <View className="flex-1">
                <Text className="text-base text-zinc-900 font-semibold">
                  {item === 1 ? "Out of Stock" : "Low Stock"}
                </Text>
                <Text className="text-sm text-gray-500">
                  Product {item} -{" "}
                  {item === 1 ? "0 units remaining" : "5 units remaining"}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm">
          <Text className="text-lg text-zinc-900 font-semibold mb-4">
            Recent Stock Movements
          </Text>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <View className="w-10 h-10 rounded-full bg-blue-100 justify-center items-center mr-3">
                <Package size={20} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-base text-zinc-900 font-semibold">
                  Product {item}
                </Text>
                <Text className="text-sm text-gray-500">
                  {item % 2 === 0 ? "Stock In" : "Stock Out"} - {item * 5} units
                </Text>
              </View>
              <Text className="text-sm text-gray-400">2h ago</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
