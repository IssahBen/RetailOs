import { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../Context/AuthContext";
import ErrorMessage from "../../messages/ErrorMessage";
import Loader from "../../ui/Loader";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { login } = useAuth();
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      const obj = { user: { email: email, password: password } };
      setIsLoading(true);
      const res = await login(obj);

      if (res === "success") {
        setIsLoading(false);
        navigation.navigate("Salesfloor");
      }
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 px-6 justify-center"
          >
            <ErrorMessage />
            {/* Logo & Welcome Text */}
            <View className="items-center mb-10">
              <Text className="text-3xl font-extrabold text-blue-600 tracking-wider">
                RetailOS
              </Text>
              <Text className="text-lg text-zinc-700 mt-2">
                Welcome back 👋
              </Text>
            </View>

            {/* Email Field */}
            <View className="mb-5">
              <Text className="text-sm font-medium text-zinc-600 mb-1">
                Email
              </Text>
              <TextInput
                className={`h-14 px-4 rounded-xl text-base bg-zinc-50 border ${
                  emailError ? "border-red-500" : "border-zinc-200"
                } text-zinc-900`}
                placeholder="you@example.com"
                placeholderTextColor="#A1A1AA"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              {emailError ? (
                <Text className="text-xs text-red-500 mt-1">{emailError}</Text>
              ) : null}
            </View>

            {/* Password Field */}
            <View className="mb-5">
              <Text className="text-sm font-medium text-zinc-600 mb-1">
                Password
              </Text>
              <View
                className={`h-14 px-4 flex-row items-center rounded-xl bg-zinc-50 border ${
                  passwordError ? "border-red-500" : "border-zinc-200"
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-zinc-900"
                  placeholder="••••••••"
                  placeholderTextColor="#A1A1AA"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#71717A" />
                  ) : (
                    <Eye size={20} color="#71717A" />
                  )}
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text className="text-xs text-red-500 mt-1">
                  {passwordError}
                </Text>
              ) : null}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="self-end mb-6">
              <Text className="text-sm font-medium text-blue-600">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="h-14 bg-blue-600 rounded-xl justify-center items-center shadow-md"
            >
              <Text className="text-base font-semibold text-white">
                Sign In
              </Text>
            </TouchableOpacity>

            {/* Footer - Sign Up */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-sm text-zinc-500">
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text className="text-sm font-semibold text-blue-600 ml-1">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
