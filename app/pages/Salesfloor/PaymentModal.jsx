import { Modal, Text, View, TouchableOpacity } from "react-native";
import { X, CreditCard, Smartphone, DollarSign } from "lucide-react-native";
import { useState } from "react";
import MobileMoneyModal from "./MobileMoneyModal";
import { Alert } from "react-native";
import CashPaymentModal from "./CashPaymentModal";
export default function PaymentModal({
  isVisible,
  onClose,
  total,
  onPaymentComplete,
  setIsVisible,
}) {
  const [showMobileMoneyModal, setShowMobileMoneyModal] = useState(false);
  const [showCashModal, setShowCashModal] = useState(false);
  return (
    <>
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
                Payment
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="w-10 h-10 rounded-full bg-zinc-100 justify-center items-center"
              >
                <X size={24} color="#71717A" />
              </TouchableOpacity>
            </View>

            {/* Total */}
            <View className="items-center mb-8 p-4 bg-zinc-50 rounded-xl">
              <Text className="text-base text-zinc-500 mb-2 font-['Inter-Regular']">
                Total Amount
              </Text>
              <Text className="text-4xl text-zinc-900 font-extrabold">
                ${total.toFixed(2)}
              </Text>
            </View>

            {/* Payment Options */}
            <View className="space-y-4">
              {/* Cash */}
              <TouchableOpacity
                className="flex-row items-center p-4 bg-zinc-50 rounded-xl border border-zinc-200"
                onPress={() => {
                  setShowCashModal(true);
                  setIsVisible(false);
                }}
              >
                <View
                  className="w-12 h-12 rounded-full justify-center items-center mr-4"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                >
                  <DollarSign size={24} color="#10B981" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-zinc-900 mb-1">
                    Cash
                  </Text>
                  <Text className="text-sm text-zinc-500">
                    Pay with physical cash
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Mobile Money */}
              <TouchableOpacity
                className="flex-row items-center p-4 bg-zinc-50 rounded-xl border border-zinc-200"
                onPress={() => {
                  setIsVisible(false);
                  setShowMobileMoneyModal(true);
                }}
              >
                <View
                  className="w-12 h-12 rounded-full justify-center items-center mr-4"
                  style={{ backgroundColor: "rgba(236, 72, 153, 0.1)" }}
                >
                  <Smartphone size={24} color="#EC4899" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-zinc-900 mb-1">
                    Mobile Money
                  </Text>
                  <Text className="text-sm text-zinc-500">
                    Pay with mobile wallet
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Card */}
              <TouchableOpacity
                className="flex-row items-center p-4 bg-zinc-50 rounded-xl border border-zinc-200"
                onPress={() => {
                  Alert.alert("Coming soon", "", [
                    {
                      text: "OK",
                      onPress: onPaymentComplete,
                    },
                  ]);
                }}
              >
                <View
                  className="w-12 h-12 rounded-full justify-center items-center mr-4"
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <CreditCard size={24} color="#3B82F6" />
                </View>
                <View>
                  <Text className="text-base font-semibold text-zinc-900 mb-1">
                    Card
                  </Text>
                  <Text className="text-sm text-zinc-500">
                    Pay with credit/debit card
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <MobileMoneyModal
        isVisible={showMobileMoneyModal}
        onClose={() => setShowMobileMoneyModal(false)}
        amount={total}
        onPaymentComplete={() => {
          setShowMobileMoneyModal(false);
          onPaymentComplete();
        }}
      />
      <CashPaymentModal
        isVisible={showCashModal}
        onClose={() => setShowCashModal(false)}
        amount={total}
        onConfirm={() => {
          setShowCashModal(false);
          onPaymentComplete();
        }}
      />
    </>
  );
}
