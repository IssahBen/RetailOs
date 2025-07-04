import { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import {
  Search,
  Package,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Store,
} from "lucide-react-native";
import PaymentModal from "./PaymentModal";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../../ui/Loader";
import LogoutButton from "../../ui/LogoutScreen";
import { useProduct } from "../../Context/ProductsContext";
import { useRef } from "react";
import SuccessMessage from "../../messages/SuccessMessage";
import ErrorMessage from "../../messages/ErrorMessage";
import InfoMessage from "../../messages/InfoMessage";
export default function POSScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user } = useAuth();
  const Options = [...new Set(products.map((item) => item.category))];
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [info, setInfo] = useState("Check Stock");
  const { buy } = useProduct();
  async function GetProducts() {
    try {
      const res = await fetch(
        "https://deep-boxer-heavily.ngrok-free.app/api/v1/products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      // Set the fetched data to state

      setProducts(data);
      return "success";
    } catch (error) {
      Alert.alert("Payment Unsuccessful Check Item Inventory Stock");
    }
  }

  useEffect(() => {
    setIsLoading(true);
    GetProducts();
    setIsLoading(false);
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const handlePaymentComplete = () => {
    const obj = { transaction: cart };
    buy(obj)
      .then((res) => {
        if (res === "success") {
          setShowPaymentModal(false);
          setCart([]);
          setSuccessMessage("Payment successful!");
          setIsVisible(true);
        }
      })
      .catch((error) => {
        setInfoVisible(true);
      });
    // Additional logic for handling successful payment
  };
  const getSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const getTax = () => getSubtotal() * 0.08;
  const getTotal = () => getSubtotal() + getTax();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <View className="flex-1 flex-row bg-[#F8FAFC]">
      {/* Product Section */}
      <View className="flex-[3] border-r border-zinc-200 relative">
        <View className="absolute top-6 left-4 right-4 z-50">
          <SuccessMessage
            visible={isVisible}
            setVisible={setIsVisible}
            successMessage={successMessage}
          />
          <InfoMessage
            visible={infoVisible}
            setVisible={setInfoVisible}
            message={info}
          />
          <ErrorMessage />
        </View>
        <View className="px-6 pt-16 pb-5 bg-white flex-row justify-between shadow-sm relative">
          <Text className="text-3xl font-extrabold text-rose-600 tracking-tight ">
            {user?.business_name}
          </Text>
          {/* Position LogoutButton at the top-right */}
          <LogoutButton className="absolute top-5 right-6" />
        </View>
        <View className="px-6 py-4 bg-white border-b border-zinc-100">
          <View className="flex-row items-center bg-zinc-100 rounded-xl px-4 h-12">
            <Search size={20} color="#71717A" />
            <TextInput
              className="flex-1 ml-3 text-base text-zinc-900"
              placeholder="Search products..."
              placeholderTextColor="#A1A1AA"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          className="py-3 bg-white"
        >
          {Options.map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-5 py-1 mx-2 h-10 rounded-full transition-all duration-200 ease-in-out shadow-sm ${
                selectedCategory === category ? "bg-blue-600" : "bg-zinc-200"
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === category ? "text-white" : "text-zinc-700"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-1 m-2 py-2 bg-white rounded-2xl items-center shadow-md"
              onPress={() => addToCart(item)}
            >
              <View className="w-16 h-16 rounded-xl bg-slate-200 justify-center items-center mb-3">
                <Store size={24} color="#2563EB" />
              </View>
              <Text className="text-sm font-semibold text-center text-zinc-900 mb-1">
                {item.name}
              </Text>
              <Text className="text-base font-extrabold text-blue-600">
                ${item.price.toFixed(2)}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Cart Section */}
      <View className="flex-[2] bg-white">
        <View className="flex-row justify-between items-center p-6 border-b border-zinc-100">
          <View className="flex-row items-center py-10">
            <ShoppingCart size={20} color="#2563EB" />
            <Text className="ml-2 text-lg font-bold text-zinc-900"></Text>
          </View>
          <Text className="text-sm text-zinc-500">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </Text>
        </View>

        {cart.length === 0 ? (
          <View className="flex-1 justify-center items-center p-6">
            <ShoppingCart size={48} color="#E4E4E7" />
            <Text className="text-lg font-semibold text-zinc-500 mt-4 mb-2">
              Your cart is empty
            </Text>
            <Text className="text-sm text-center text-zinc-400">
              Add items from the product list
            </Text>
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className=" pr-6 py-4 border-b border-zinc-100">
                <View className="flex- justify-between mb-2">
                  <Text className="text-base font-medium text-zinc-900">
                    {item.name}
                  </Text>
                  <Text className="text-base font-medium text-zinc-900">
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center bg-zinc-100 rounded-lg px-2 py-1">
                    <TouchableOpacity
                      className="w-7 h-7 justify-center items-center"
                      onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={16} color="#71717A" />
                    </TouchableOpacity>
                    <Text className="w-8 text-center text-sm font-semibold text-zinc-900">
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      className="w-7 h-7 justify-center items-center"
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} color="#2563EB" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    className="w-9 h-9 bg-zinc-100 rounded-full justify-center items-center"
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <View className="p-6 border-t border-zinc-100">
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-zinc-500">Subtotal</Text>
            <Text className="text-sm font-medium text-zinc-900">
              ${getSubtotal().toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-sm text-zinc-500">Tax (8%)</Text>
            <Text className="text-sm font-medium text-zinc-900">
              ${getTax().toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between my-6">
            <Text className="text-lg font-semibold text-zinc-900">Total</Text>
            <Text className="text-xl font-extrabold text-blue-600">
              ${getTotal().toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            disabled={cart.length === 0}
            className={`h-14 rounded-xl flex-row justify-center items-center transition ${
              cart.length === 0 ? "bg-rose-300" : "bg-rose-600"
            }`}
            onPress={() => setShowPaymentModal(true)}
          >
            <CreditCard size={20} color="#FFFFFF" />
            <Text className="ml-2 text-base font-semibold text-white">
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <PaymentModal
        isVisible={showPaymentModal}
        setIsVisible={setShowPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        total={getTotal()}
        onPaymentComplete={handlePaymentComplete}
      />
    </View>
  );
}
