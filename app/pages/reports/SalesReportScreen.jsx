import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
export default function SalesReportScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  const navigation = useNavigation();
  const [report, setReport] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const periods = ["all", "day", "week", "month"];
  async function GetReport() {
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/reports",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      // Set the fetched data to state

      setReport(data);
      setMetrics(data.All);
      setTopProducts(data.Top);
      return "success";
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data from the server.");
    }
  }
  useEffect(() => {
    GetReport();
  }, []);

  useEffect(() => {
    if (selectedPeriod === "all") {
      setMetrics(report.All);
    } else if (selectedPeriod === "day") {
      setMetrics(report.Day);
    } else if (selectedPeriod === "week") {
      setMetrics(report.Week);
    } else if (selectedPeriod === "month") {
      setMetrics(report.Month);
    }
  }, [selectedPeriod, report]);

  // const metrics = [
  //   {
  //     title: "Total Sales",
  //     value: "$12,458.35",
  //     change: "+12.5%",
  //     trend: "up",
  //     color: "#10B981",
  //   },
  //   {
  //     title: "Average Order Value",
  //     value: "$85.24",
  //     change: "+8.3%",
  //     trend: "up",
  //     color: "#3B82F6",
  //   },
  //   {
  //     title: "Total Orders",
  //     value: "145",
  //     change: "-5.2%",
  //     trend: "down",
  //     color: "#EF4444",
  //   },
  // ];

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
                {metric.title === "Total Orders" ? "" : "$"}
                {metric.value}
              </Text>
              {/* { <View className="flex-row items-center">
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
              </View>} */}
            </View>
          ))}
        </View>

        {/* Top Products */}
        <View className="m-4 p-4 bg-white rounded-2xl shadow shadow-black/5">
          <Text className="text-lg font-semibold text-zinc-900 mb-4">
            Top Selling Products
          </Text>
          {topProducts.map((item) => (
            <View
              key={item.total_quantity}
              className="flex-row items-center py-3 border-b border-gray-100 last:border-b-0"
            >
              <View className="w-8 h-8 rounded-full bg-gray-100 justify-center items-center mr-3"></View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-zinc-900">
                  {item.name}
                </Text>
                <Text className="text-sm text-zinc-500">
                  {item.total_quantity}
                </Text>
              </View>
              <Text className="text-base font-semibold text-blue-500">
                ${item.total_quantity * item.price}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
