import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react-native";
import { useAuth } from "../Context/AuthContext";
import { TouchableOpacity, View, Text } from "react-native";

export default function InfoMessage({
  visible,
  setVisible,
  info = "Check Stock",
  duration = 3000,
}) {
  const [show, setShow] = useState(false); // assuming same message source
  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, setVisible, duration]);

  if (!show) return null;

  return (
    <View className="absolute top-6 left-4 right-4 z-50 px-4">
      <View className="flex-row items-center gap-3 bg-white border border-red-300 px-5 py-4 rounded-2xl shadow-xl">
        <Text className="flex-1 text-sm font-medium text-green-700">
          {info}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShow(false);
            setVisible(false);
          }}
          className="p-1 rounded-full"
          accessibilityLabel="Dismiss message"
        >
          <XCircle size={20} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
