import { useState, useEffect, use } from "react";
import { Text, View, ScrollView, TouchableOpacity, Alert } from "react-native";
import {
  ArrowLeft,
  DollarSign,
  CreditCard,
  Wallet,
  RefreshCw,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "../../ui/DatePicker";
import { formatDate } from "../../ui/Utils/dateUtils";
export default function TransactionReportScreen() {
  const [timeDate, setTimeDate] = useState(null);

  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState("day");
  const [metric, setMetric] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [report, setReport] = useState(null);
  const periods = ["day", "week", "month"];
  const [query, setQuery] = useState([]);
  async function GetReport() {
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/reports/transactions",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        Alert.alert("Error", "Server responded with an error.");
        return null;
      }

      const data = await res.json();
      return data;
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data from the server.");
      return null;
    }
  }

  useEffect(() => {
    GetReport().then((res) => {
      setReport((val) => (val = res));
      setMetric(report.day);
      setTransaction(res.today_transactions);
    });
  }, []);
  useEffect(() => {
    if (report) {
      if (selectedPeriod === "day") {
        setMetric(report.day);
        setTransaction(report.today_transactions);
      } else if (selectedPeriod === "week") {
        setMetric(report.week);
        setTransaction(report.week_transactions);
      } else if (selectedPeriod === "month") {
        setMetric(report.month);
        setTransaction(report.month_transactions);
      } else if (selectedPeriod === "year") {
        setMetric(report.year);
        setTransaction(report.year_transactions);
      }
    }
  }, [selectedPeriod, report]);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-6 pt-16 pb-5 bg-white border-b border-gray-100">
        <Text className="text-2xl text-gray-900 font-extrabold">
          Transaction Reports
        </Text>
        <TouchableOpacity
          className="ml-auto p-2 rounded-full bg-gray-100"
          onPress={() => {
            GetReport().then((res) => {
              setReport((val) => (val = res));
              setMetric(report.day);
              setTransaction(res.today_transactions);
              setSelectedPeriod("day");
            });
          }}
        >
          <RefreshCw size={24} color="#3B82F6" />
        </TouchableOpacity>
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
          {metric?.map((metric, index) => (
            <View
              key={index}
              className="flex-1 min-w-[45%] bg-white rounded-2xl p-4 shadow-sm elevation-2"
            >
              <View
                className="w-12 h-12 rounded-full justify-center items-center mb-3"
                style={{ backgroundColor: `${"#3B82F6"}20` }}
              >
                <DollarSign size={24} color={"#3B82F6"} />
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

        {/* Transactions */}
        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm elevation-2">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Transactions
          </Text>
          {transaction?.map((transaction) => (
            <View
              key={transaction.id}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <View
                className="w-10 h-10 rounded-full justify-center items-center mr-3"
                style={{
                  backgroundColor: "#10B98120",
                }}
              >
                <DollarSign size={20} color={"#10B981"} />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {transaction?.product_name}
                  </Text>
                  <Text
                    className="text-base font-semibold"
                    style={{
                      color: "#10B981",
                    }}
                  >
                    +{transaction.total_value.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500">Cash</Text>
                  <Text className="text-sm text-gray-400">
                    {transaction.date}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View className="p-4">
          <DatePicker
            date={timeDate || new Date()}
            onChange={setTimeDate}
            placeholder="Select time"
            mode="time"
            label="Time "
            setTransactions={setQuery}
          />
        </View>
        <View className="m-4 p-4 bg-white rounded-2xl shadow-sm elevation-2">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Day Transaction Tracker
          </Text>
          {query?.map((transaction) => (
            <View
              key={transaction.id}
              className="flex-row items-center py-3 border-b border-gray-100"
            >
              <View
                className="w-10 h-10 rounded-full justify-center items-center mr-3"
                style={{
                  backgroundColor: "#10B98120",
                }}
              >
                <DollarSign size={20} color={"#10B981"} />
              </View>
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {transaction?.product_name}
                  </Text>
                  <Text
                    className="text-base font-semibold"
                    style={{
                      color: "#10B981",
                    }}
                  >
                    +{transaction.total_value.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-500">Cash</Text>
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
