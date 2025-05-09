import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff, Check } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
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

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      navigation.navigate("/(tabs)");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 px-6 bg-white"
        >
          <View className="my-8">
            <Text className="text-[28px] font-extrabold text-zinc-900 mb-1">
              Create Account
            </Text>
            <Text className="text-base text-zinc-500">
              Sign up to get started with{" "}
              <Text className="font-semibold text-blue-500">RetailOS</Text>
            </Text>
          </View>

          <View className="space-y-5">
            {/* Name */}
            <View>
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Full Name
              </Text>
              <TextInput
                className={`h-14 px-4 rounded-xl text-base bg-zinc-50 text-zinc-900 border ${
                  nameError ? "border-red-500" : "border-zinc-200"
                }`}
                placeholder="Enter your full name"
                placeholderTextColor="#A1A1AA"
                value={name}
                onChangeText={setName}
              />
              {!!nameError && (
                <Text className="text-xs text-red-500 mt-1">{nameError}</Text>
              )}
            </View>

            {/* Email */}
            <View>
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Email
              </Text>
              <TextInput
                className={`h-14 px-4 rounded-xl text-base bg-zinc-50 text-zinc-900 border ${
                  emailError ? "border-red-500" : "border-zinc-200"
                }`}
                placeholder="Enter your email"
                placeholderTextColor="#A1A1AA"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              {!!emailError && (
                <Text className="text-xs text-red-500 mt-1">{emailError}</Text>
              )}
            </View>

            {/* Password */}
            <View>
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Password
              </Text>
              <View
                className={`h-14 px-4 rounded-xl bg-zinc-50 flex-row items-center border ${
                  passwordError ? "border-red-500" : "border-zinc-200"
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-zinc-900"
                  placeholder="Create a password"
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
              {!!passwordError && (
                <Text className="text-xs text-red-500 mt-1">
                  {passwordError}
                </Text>
              )}
            </View>

            {/* Confirm Password */}
            <View>
              <Text className="text-sm font-semibold text-zinc-600 mb-2">
                Confirm Password
              </Text>
              <View
                className={`h-14 px-4 rounded-xl bg-zinc-50 flex-row items-center border ${
                  confirmPasswordError ? "border-red-500" : "border-zinc-200"
                }`}
              >
                <TextInput
                  className="flex-1 text-base text-zinc-900"
                  placeholder="Confirm your password"
                  placeholderTextColor="#A1A1AA"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} color="#71717A" />
                  ) : (
                    <Eye size={20} color="#71717A" />
                  )}
                </TouchableOpacity>
              </View>
              {!!confirmPasswordError && (
                <Text className="text-xs text-red-500 mt-1">
                  {confirmPasswordError}
                </Text>
              )}
            </View>

            {/* Terms and Conditions */}
            <View className="flex-row items-start mb-4">
              <View className="mt-1 mr-2 w-5 h-5 rounded bg-blue-500 justify-center items-center">
                <Check size={12} color="#FFFFFF" />
              </View>
              <Text className="flex-1 text-sm text-zinc-600">
                I agree to the{" "}
                <Text className="font-semibold text-blue-500">
                  Terms of Service
                </Text>{" "}
                and{" "}
                <Text className="font-semibold text-blue-500">
                  Privacy Policy
                </Text>
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="h-14 bg-blue-500 rounded-xl justify-center items-center"
              onPress={handleSignup}
            >
              <Text className="text-base font-semibold text-white">
                Create Account
              </Text>
            </TouchableOpacity>

            {/* Already have an account? */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-sm text-zinc-500">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text className="text-sm font-semibold text-blue-500">
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}
