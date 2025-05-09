import { useState } from "react";
import { Text, View, Modal, TouchableOpacity, TextInput } from "react-native";
import { X, Smartphone } from "lucide-react-native";

export default function MobileMoneyModal({
  isVisible,
  onClose,
  amount,
  onPaymentComplete,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!phoneNumber.trim()) {
      setError("Please enter a valid phone number");
      return;
    }
    setPhoneNumber("");
    onPaymentComplete();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 w-[90%] max-w-[500px]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-extrabold text-zinc-900">
              Mobile Money Payment
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 rounded-full bg-zinc-100 justify-center items-center"
            >
              <X size={24} color="#71717A" />
            </TouchableOpacity>
          </View>

          {/* Icon */}
          <View className="w-20 h-20 rounded-full bg-pink-500/10 justify-center items-center self-center mb-6">
            <Smartphone size={40} color="#EC4899" />
          </View>

          {/* Amount Display */}
          <View className="items-center mb-8 p-4 bg-zinc-50 rounded-xl">
            <Text className="text-base text-zinc-500 mb-2">Amount to Pay</Text>
            <Text className="text-3xl font-extrabold text-zinc-900">
              ${amount.toFixed(2)} USD
            </Text>
          </View>

          {/* Input */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-zinc-600 mb-2">
              Phone Number
            </Text>
            <TextInput
              className="h-14 border border-zinc-200 rounded-xl px-4 text-base text-zinc-900 bg-zinc-50"
              placeholder="Enter mobile money number"
              placeholderTextColor="#A1A1AA"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setError("");
              }}
            />
            {error ? (
              <Text className="text-xs text-red-500 mt-1">{error}</Text>
            ) : null}
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            className="h-14 bg-pink-500 rounded-xl justify-center items-center mb-4"
            onPress={handleSubmit}
          >
            <Text className="text-base font-semibold text-white">Pay Now</Text>
          </TouchableOpacity>

          {/* Security Note */}
          <Text className="text-sm text-center text-zinc-500">
            🔒 Your payment is secure. We use industry-standard encryption.
          </Text>
        </View>
      </View>
    </Modal>
  );
}
