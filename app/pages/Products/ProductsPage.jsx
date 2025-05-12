import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useProduct } from "../../Context/ProductsContext";
import cart from "../../../assets/default.jpg";
import Loader from "../../ui/Loader";

import { useNavigation } from "@react-navigation/native";
export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { products, GetProducts } = useProduct();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const Options = [...new Set(products.map((item) => item.category))];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  useEffect(() => {
    setIsLoading(true);
    GetProducts().then(() => {
      setIsLoading(false);
    });
  }, []);

  const renderProduct = ({ item }) => (
    <View className="bg-white rounded-2xl mb-4 shadow-sm overflow-hidden">
      <View className="relative">
        <Image
          source={cart}
          className="w-full h-52 bg-zinc-100"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 flex-row space-x-2">
          <TouchableOpacity
            className="w-9 h-9 bg-white/90 rounded-full items-center justify-center shadow"
            onPress={() => navigation.navigate("edit-product", { id: item.id })}
          >
            <Ionicons name="pencil" size={18} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity className="w-9 h-9 bg-white/90 rounded-full items-center justify-center shadow">
            <Ionicons name="trash" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-between items-start mb-3">
          <Text className="text-lg font-semibold text-zinc-900 flex-1 pr-2">
            {item.name}
          </Text>
          <Text className="text-lg font-bold text-blue-600">
            ${item.price.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between pt-3 border-t border-zinc-100">
          <View>
            <Text className="text-xs text-zinc-400 mb-1">Category</Text>
            <Text className="text-sm font-medium text-zinc-800">
              {item.category}
            </Text>
          </View>
          <View>
            <Text className="text-xs text-zinc-400 mb-1">Quantity</Text>
            <Text
              className={`text-sm font-semibold ${
                item.quantity < 20 ? "text-red-500" : "text-zinc-800"
              }`}
            >
              {item.quantity} in stock
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <View className="flex-1 bg-zinc-50">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-16 pb-5 bg-white shadow-sm">
        <Text className="text-2xl font-extrabold text-zinc-900">Inventory</Text>
        <TouchableOpacity
          className="w-11 h-11 bg-blue-500 rounded-full items-center justify-center shadow-md"
          onPress={() => navigation.navigate("add-product")}
        >
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View className="flex-row items-center px-6 py-4 bg-white border-b border-zinc-100">
        <View className="flex-1 h-12 bg-zinc-100 rounded-xl flex-row items-center px-4 mr-3">
          <Ionicons name="search" size={20} color="#71717A" className="mr-3" />
          <TextInput
            className="flex-1 text-base text-zinc-900 font-['Inter-Regular']"
            placeholder="Search products..."
            placeholderTextColor="#A1A1AA"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity className="w-12 h-12 bg-zinc-100 rounded-xl items-center justify-center">
          <Ionicons name="filter" size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white px-5 py-4"
      >
        {Options.map((category) => (
          <TouchableOpacity
            key={category}
            className={`px-5 py-2.5  h-12 rounded-full mx-1 ${
              selectedCategory === category ? "bg-blue-600" : "bg-zinc-100"
            }`}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedCategory === category ? "text-white" : "text-zinc-500"
              }`}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
