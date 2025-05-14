import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react-native";
import { useAuth } from "../Context/AuthContext";
import { TouchableOpacity, View, Text } from "react-native";

export default function SuccessMessage({
  visible,
  setVisible,
  successMessage,
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
      <View className="flex-row items-center gap-3 bg-white/80 border border-green-200 text-green-700 px-5 py-4 rounded-2xl shadow-2xl">
        <Text className="flex-1 text-sm font-semibold text-green-700">
          {successMessage}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShow(false);
            setVisible(false);
          }}
          className="p-1"
        >
          <CheckCircle size={18} color="#16A34A" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
