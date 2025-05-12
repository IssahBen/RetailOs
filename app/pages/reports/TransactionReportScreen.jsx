import { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft, DollarSign, CreditCard, Wallet } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
export default function TransactionReportScreen() {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const periods = ["day", "week", "month", "year"];

  const metrics = [
    {
      title: "Total Transactions",
      value: "2,458",
      icon: DollarSign,
      color: "#3B82F6",
    },
    {
      title: "Card Payments",
      value: "1,845",
      icon: CreditCard,
      color: "#10B981",
    },
    {
      title: "Cash Payments",
      value: "613",
      icon: Wallet,
      color: "#8B5CF6",
    },
  ];

  const transactions = [
    {
      id: "1",
      type: "sale",
      amount: 124.99,
      method: "Credit Card",
      date: "2025-05-15 14:30",
      status: "completed",
    },
    {
      id: "2",
      type: "refund",
      amount: -45.0,
      method: "Credit Card",
      date: "2025-05-15 12:15",
      status: "completed",
    },
    {
      id: "3",
      type: "sale",
      amount: 67.5,
      method: "Cash",
      date: "2025-05-15 10:45",
      status: "completed",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-5 bg-white border-b border-gray-100">
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-gray-100 justify-center items-center mr-4"
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#18181B" />
        </TouchableOpacity>
        <Text className="text-2xl text-gray-900 font-extrabold">
          Transaction Reports
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Period Selector */}
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
                className={`text-sm font-semibold ${
                  selectedPeriod === period ? "text-white" : "text-gray-500"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Metrics Grid */}
        <View className="flex-row flex-wrap px-4 gap-4">
          {metrics.map((metric, index) => (
            <View
              key={index}
              className="flex-1 min-w-[45%] bg-white rounded-2xl p-4 shadow-sm elevation-2"
            >
              <View
                className="w-12 h-12 rounded-full justify-center items-center mb-3"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon size={24} color={metric.color} />
              </View>
              <Text className="text-sm text-gray-500 font-regular mb-2">
                {metric.title}
              </Text>
              <Text className="text-2xl text-gray-900 font-extrabold">
                {metric.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Chart Section */}
        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm elevation-2">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Transaction Volume
          </Text>
          <View className="h-52 bg-gray-100 rounded justify-center items-center">
            <Text className="text-sm text-gray-500">Transaction Chart</Text>
          </View>
        </View>

        {/* Transactions */}
        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm elevation-2">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Recent Transactions
          </Text>
          {transactions.map((transaction) => (
            <View
              key={transaction.id}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <View
                className="w-10 h-10 rounded-full justify-center items-center mr-3"
                style={{
                  backgroundColor:
                    transaction.type === "sale" ? "#10B98120" : "#EF444420",
                }}
              >
                <DollarSign
                  size={20}
                  color={transaction.type === "sale" ? "#10B981" : "#EF4444"}
                />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {transaction.type === "sale" ? "Sale" : "Refund"}
                  </Text>
                  <Text
                    className="text-base font-semibold"
                    style={{
                      color:
                        transaction.type === "sale" ? "#10B981" : "#EF4444",
                    }}
                  >
                    {transaction.type === "sale" ? "+" : ""}
                    {transaction.amount.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500">
                    {transaction.method}
                  </Text>
                  <Text className="text-sm text-gray-400">
                    {transaction.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
