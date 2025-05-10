import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { X, Camera, Upload } from "lucide-react-native";

export default function AddProductScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    image:
      "https://images.pexels.com/photos/4464821/pexels-photo-4464821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-16 pb-5 border-b border-zinc-100 bg-white">
        <Text className="text-2xl font-extrabold text-zinc-900">
          Add New Product
        </Text>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-zinc-100 justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <X size={24} color="#71717A" />
        </TouchableOpacity>
      </View>

      {/* Scroll Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View className="px-6 py-6 items-center">
          <Image
            source={{ uri: formData.image }}
            className="w-full h-52 rounded-xl mb-4 bg-zinc-100"
            resizeMode="cover"
          />
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg space-x-2">
              <Camera size={20} color="#FFFFFF" />
              <Text className="text-white font-semibold text-sm">
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg space-x-2">
              <Upload size={20} color="#FFFFFF" />
              <Text className="text-white font-semibold text-sm">
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <View className="px-6 pb-6">
          {/* Product Name */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-zinc-600 mb-2">
              Product Name
            </Text>
            <TextInput
              className={`h-12 px-4 rounded-lg border ${
                errors.name ? "border-red-500" : "border-zinc-200"
              } bg-zinc-50 text-base text-zinc-900`}
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
          <View className="flex-row space-x-2">
            <View className="flex-1 mb-5">
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Price
              </Text>
              <TextInput
                className={`h-12 px-4 rounded-lg border ${
                  errors.price ? "border-red-500" : "border-zinc-200"
                } bg-zinc-50 text-base text-zinc-900`}
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

            <View className="flex-1 mb-5">
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Quantity
              </Text>
              <TextInput
                className={`h-12 px-4 rounded-lg border ${
                  errors.quantity ? "border-red-500" : "border-zinc-200"
                } bg-zinc-50 text-base text-zinc-900`}
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
              className={`h-12 px-4 rounded-lg border ${
                errors.category ? "border-red-500" : "border-zinc-200"
              } bg-zinc-50 text-base text-zinc-900`}
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
              className="h-32 px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 text-base text-zinc-900"
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

      {/* Footer Buttons */}
      <View className="flex-row p-6 border-t border-zinc-100 space-x-3">
        <TouchableOpacity
          className="flex-1 h-14 bg-zinc-100 rounded-xl justify-center items-center"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-base font-semibold text-zinc-500">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-[2] h-14 bg-blue-500 rounded-xl justify-center items-center"
          onPress={handleSubmit}
        >
          <Text className="text-base font-semibold text-white">
            Save Product
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
