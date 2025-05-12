import { View } from "react-native";
import React from "react";
export default function Loader() {
  return (
    <View className="flex-1 flex-row gap-2 justify-center items-center">
      <View className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></View>
      <View className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></View>
      <View className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></View>
    </View>
  );
}
