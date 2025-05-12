import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
export default function SalesReportScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const navigation = useNavigation();
  const periods = ["day", "week", "month", "year"];

  const metrics = [
    {
      title: "Total Sales",
      value: "$12,458.35",
      change: "+12.5%",
      trend: "up",
      color: "#10B981",
    },
    {
      title: "Average Order Value",
      value: "$85.24",
      change: "+8.3%",
      trend: "up",
      color: "#3B82F6",
    },
    {
      title: "Refunds",
      value: "$245.12",
      change: "-2.4%",
      trend: "down",
      color: "#EF4444",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-5 bg-white border-b border-gray-100">
        <Text className="text-2xl text-zinc-900 font-extrabold">
          Sales Reports
        </Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        {/* Period Selector */}
        <View className="flex-row px-4 py-4 bg-white border-b border-gray-100">
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedPeriod === period ? "bg-blue-500" : "bg-gray-100"
              }`}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedPeriod === period ? "text-white" : "text-zinc-500"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Metrics */}
        <View className="flex-row flex-wrap px-4 gap-4 mt-4">
          {metrics.map((metric, index) => (
            <View
              key={index}
              className="flex-1 min-w-[45%] bg-white rounded-2xl p-4 shadow shadow-black/5"
            >
              <Text className="text-sm text-zinc-500 font-regular mb-2">
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

        {/* Chart */}
        <View className="m-4 p-4 bg-white rounded-2xl shadow shadow-black/5">
          <Text className="text-lg font-semibold text-zinc-900 mb-4">
            Sales Trend
          </Text>
          <View className="h-48 bg-gray-100 rounded-lg justify-center items-center">
            <Text className="text-sm text-zinc-500">
              Sales Chart Visualization
            </Text>
          </View>
        </View>

        {/* Top Products */}
        <View className="m-4 p-4 bg-white rounded-2xl shadow shadow-black/5">
          <Text className="text-lg font-semibold text-zinc-900 mb-4">
            Top Selling Products
          </Text>
          {[1, 2, 3].map((item) => (
            <View
              key={item}
              className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0"
            >
              <View className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center mr-3">
                <Text className="text-sm font-semibold text-zinc-500">
                  {item}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-zinc-900">
                  Product {item}
                </Text>
                <Text className="text-sm text-zinc-500">234 sales</Text>
              </View>
              <Text className="text-base font-semibold text-blue-500">
                $2,345
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
