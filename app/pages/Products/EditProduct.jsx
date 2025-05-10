import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import { X, Camera, Upload, Trash2 } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
export default function EditProductScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "Blue T-Shirt",
    price: "24.99",
    category: "Apparel",
    quantity: "45",
    description: "Comfortable cotton t-shirt in classic blue.",
    image:
      "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Product name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-16 pb-5 border-b border-gray-100">
        <Text className="text-2xl font-extrabold text-zinc-900">
          Edit Product
        </Text>
        <TouchableOpacity
          className="w-10 h-10 bg-gray-100 rounded-full justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <X size={24} color="#71717A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View className="p-6 items-center">
          <Image
            source={{ uri: formData.image }}
            className="w-full h-52 rounded-xl mb-4 bg-gray-100"
          />
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-row items-center bg-blue-500 py-2.5 px-4 rounded-lg space-x-2">
              <Camera size={20} color="#FFFFFF" />
              <Text className="text-white font-semibold text-sm">
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-blue-500 py-2.5 px-4 rounded-lg space-x-2">
              <Upload size={20} color="#FFFFFF" />
              <Text className="text-white font-semibold text-sm">
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View className="p-6">
          {/* Product Name */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-zinc-600 mb-2">
              Product Name
            </Text>
            <TextInput
              className={`h-12 bg-gray-50 border rounded-lg px-4 text-base text-zinc-900 ${
                errors.name ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter product name"
              value={formData.name}
              onChangeText={(text) => {
                setFormData({ ...formData, name: text });
                if (errors.name) setErrors({ ...errors, name: null });
              }}
            />
            {errors.name && (
              <Text className="text-xs text-red-500 mt-1">{errors.name}</Text>
            )}
          </View>

          {/* Price & Quantity */}
          <View className="flex-row">
            <View className="flex-1 mr-2 mb-5">
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Price
              </Text>
              <TextInput
                className={`h-12 bg-gray-50 border rounded-lg px-4 text-base text-zinc-900 ${
                  errors.price ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={formData.price}
                onChangeText={(text) => {
                  setFormData({ ...formData, price: text });
                  if (errors.price) setErrors({ ...errors, price: null });
                }}
              />
              {errors.price && (
                <Text className="text-xs text-red-500 mt-1">
                  {errors.price}
                </Text>
              )}
            </View>

            <View className="flex-1 ml-2 mb-5">
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Quantity
              </Text>
              <TextInput
                className={`h-12 bg-gray-50 border rounded-lg px-4 text-base text-zinc-900 ${
                  errors.quantity ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="0"
                keyboardType="number-pad"
                value={formData.quantity}
                onChangeText={(text) => {
                  setFormData({ ...formData, quantity: text });
                  if (errors.quantity) setErrors({ ...errors, quantity: null });
                }}
              />
              {errors.quantity && (
                <Text className="text-xs text-red-500 mt-1">
                  {errors.quantity}
                </Text>
              )}
            </View>
          </View>

          {/* Category */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-zinc-600 mb-2">
              Category
            </Text>
            <TextInput
              className={`h-12 bg-gray-50 border rounded-lg px-4 text-base text-zinc-900 ${
                errors.category ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Select category"
              value={formData.category}
              onChangeText={(text) => {
                setFormData({ ...formData, category: text });
                if (errors.category) setErrors({ ...errors, category: null });
              }}
            />
            {errors.category && (
              <Text className="text-xs text-red-500 mt-1">
                {errors.category}
              </Text>
            )}
          </View>

          {/* Description */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-zinc-600 mb-2">
              Description
            </Text>
            <TextInput
              className="h-30 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base text-zinc-900"
              placeholder="Enter product description"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 border-t border-gray-100">
        <TouchableOpacity
          className="w-full h-14 bg-red-100 rounded-xl justify-center items-center"
          onPress={handleDelete}
        >
          <Trash2 size={24} color="#EF4444" />
        </TouchableOpacity>

        <View className="flex-row space-x-3 mt-3">
          <TouchableOpacity
            className="flex-1 h-14 bg-gray-100 rounded-xl justify-center items-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-base font-semibold text-zinc-500">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-[2] h-14 bg-blue-500 rounded-xl justify-center items-center"
            onPress={handleSubmit}
          >
            <Text className="text-base font-semibold text-white">
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
