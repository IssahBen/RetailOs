import { useEffect } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  ChartBar as BarChart3,
  ShoppingBag,
  Percent,
  TrendingUp,
} from "lucide-react-native";

const { width, height } = Dimensions.get("window");

export default function LandingScreen() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        }}
        style={{ width, height }}
      >
        <View className="flex-1 bg-black/70 justify-center items-center px-6">
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              width: "100%",
              maxWidth: 400,
              alignItems: "center",
            }}
          >
            <Text className="text-[42px] font-extrabold tracking-wider text-white mb-3">
              QuickVend
            </Text>
            <Text className="text-base text-slate-100 text-center mb-10 leading-6 font-normal">
              Streamline your inventory and sales with one powerful app
            </Text>

            <View className="w-full flex-row flex-wrap justify-between mb-10">
              <View className="w-[48%] flex-row items-center bg-white/10 rounded-xl p-3 mb-3">
                <ShoppingBag size={24} color="#F59E0B" />
                <Text className="text-white font-semibold text-sm ml-2">
                  Inventory Tracking
                </Text>
              </View>
              <View className="w-[48%] flex-row items-center bg-white/10 rounded-xl p-3 mb-3">
                <BarChart3 size={24} color="#F59E0B" />
                <Text className="text-white font-semibold text-sm ml-2">
                  Sales Analytics
                </Text>
              </View>
              <View className="w-[48%] flex-row items-center bg-white/10 rounded-xl p-3 mb-3">
                <Percent size={24} color="#F59E0B" />
                <Text className="text-white font-semibold text-sm ml-2">
                  POS
                </Text>
              </View>
              <View className="w-[48%] flex-row items-center bg-white/10 rounded-xl p-3 mb-3">
                <TrendingUp size={24} color="#F59E0B" />
                <Text className="text-white font-semibold text-sm ml-2">
                  Growth Insights
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="w-full bg-blue-500 rounded-xl py-4 items-center mb-3"
            >
              <Text className="text-white font-semibold text-base">
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
              className="w-full border border-white rounded-xl py-4 items-center"
            >
              <Text className="text-white font-semibold text-base">
                Create Account
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}
