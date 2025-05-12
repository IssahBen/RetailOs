import { Text, View, TouchableOpacity } from "react-native";

import {
  ChartBar as BarChart3,
  Package,
  Receipt,
  ArrowRight,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
export default function ReportsScreen() {
  const navigation = useNavigation();

  const reports = [
    {
      id: "sales",
      title: "Sales Reports",
      description: "View detailed sales analytics and trends",
      icon: BarChart3,
      color: "#3B82F6",
      bgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      id: "stock",
      title: "Stock Reports",
      description: "Monitor inventory levels and movements",
      icon: Package,
      color: "#10B981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      id: "transactions",
      title: "Transaction Reports",
      description: "Track all financial transactions",
      icon: Receipt,
      color: "#8B5CF6",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 pt-16 pb-5 bg-white border-b border-zinc-100">
        <Text className="text-2xl text-zinc-900 font-extrabold">Reports</Text>
      </View>

      {/* Report Cards */}
      <View className="p-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <TouchableOpacity
              key={report.id}
              className="flex-row items-center p-4 bg-white rounded-2xl mb-3 shadow-sm"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
              onPress={() => navigation.navigate(`/reports/${report.id}`)}
            >
              <View
                className="w-12 h-12 rounded-xl justify-center items-center mr-4"
                style={{ backgroundColor: report.bgColor }}
              >
                <Icon size={24} color={report.color} />
              </View>

              <View className="flex-1 mr-4">
                <Text className="text-base text-zinc-900 font-semibold mb-1">
                  {report.title}
                </Text>
                <Text className="text-sm text-zinc-500 font-normal">
                  {report.description}
                </Text>
              </View>

              <ArrowRight size={20} color="#A1A1AA" />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
