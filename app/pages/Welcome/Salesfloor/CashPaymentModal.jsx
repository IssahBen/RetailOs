import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { X, Check, DollarSign } from "lucide-react-native";

export default function CashPaymentModal({
  isVisible,
  onClose,
  amount,
  onConfirm,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-[90%] max-w-[500px] bg-white rounded-2xl p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-extrabold text-zinc-900 font-['Inter-ExtraBold']">
              Confirm Payment
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 rounded-full bg-zinc-100 items-center justify-center"
            >
              <X size={24} color="#71717A" />
            </TouchableOpacity>
          </View>

          {/* Icon */}
          <View className="w-20 h-20 rounded-full bg-emerald-500/10 items-center justify-center self-center mb-6">
            <DollarSign size={40} color="#10B981" />
          </View>

          {/* Amount */}
          <View className="items-center bg-zinc-50 rounded-xl p-4 mb-6">
            <Text className="text-base text-zinc-500 font-['Inter-Regular'] mb-2">
              Amount Received
            </Text>
            <Text className="text-3xl font-extrabold text-zinc-900 font-['Inter-ExtraBold']">
              ${amount.toFixed(2)}
            </Text>
          </View>

          {/* Confirmation Text */}
          <Text className="text-center text-base text-zinc-600 leading-6 mb-6 font-['Inter-Regular']">
            Please confirm that you have received the cash payment from the
            customer.
          </Text>

          {/* Buttons */}
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 h-14 bg-zinc-100 rounded-xl items-center justify-center"
              onPress={onClose}
            >
              <Text className="text-base font-semibold text-zinc-500 font-['Inter-SemiBold']">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-[2] h-14 bg-emerald-500 rounded-xl flex-row items-center justify-center space-x-2"
              onPress={onConfirm}
            >
              <Check size={20} color="#FFFFFF" />
              <Text className="text-base font-semibold text-white font-['Inter-SemiBold']">
                Confirm Receipt
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
