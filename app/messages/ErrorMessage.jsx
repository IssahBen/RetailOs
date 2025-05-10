import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react-native";
import { useAuth } from "../Context/AuthContext";
import { TouchableOpacity, View, Text } from "react-native";

export default function ErrorMessage({ duration = 3000 }) {
  const [show, setShow] = useState(false);
  const { visible, setVisible, errorMessage } = useAuth();

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
      <View className="flex-row items-center gap-3 bg-white/80 border border-red-200 text-red-700 px-5 py-4 rounded-2xl shadow-2xl">
        <Text className="flex-1 text-sm font-semibold text-red-700">
          {errorMessage}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShow(false);
            setVisible(false);
          }}
          className="p-1"
        >
          <XCircle size={18} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
