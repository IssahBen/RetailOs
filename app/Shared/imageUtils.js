import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
const SAMPLE_PRODUCTS1 = [
  { id: "1", name: "Blue T-Shirt", category: "Apparel", price: 24.99 },
  {
    id: "2",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
  },
  { id: "3", name: "Coffee Mug", category: "Home Goods", price: 14.5 },
  { id: "4", name: "Leather Wallet", category: "Accessories", price: 49.99 },
  { id: "5", name: "Smartphone Case", category: "Electronics", price: 19.99 },
  { id: "6", name: "Water Bottle", category: "Home Goods", price: 22.5 },
];

const CATEGORIES1 = [
  "All",
  "Apparel",
  "Electronics",
  "Home Goods",
  "Accessories",
  "Office",
];

const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "Blue T-Shirt",
    category: "Apparel",
    quantity: 45,
    price: 24.99,
    image:
      "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    category: "Electronics",
    quantity: 12,
    price: 129.99,
    image:
      "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3",
    name: "Coffee Mug",
    category: "Home Goods",
    quantity: 32,
    price: 14.5,
    image:
      "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4",
    name: "Leather Wallet",
    category: "Accessories",
    quantity: 18,
    price: 49.99,
    image:
      "https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const CATEGORIES = [
  "All",
  "Apparel",
  "Electronics",
  "Home Goods",
  "Accessories",
];

export async function pickImageFromLibrary() {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert("Permission required", "We need access to your media library.");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const asset = result.assets[0];
    return {
      uri: asset.uri,
      name: asset.fileName || asset.uri.split("/").pop(),
      type: asset.type || "image/jpeg", // default to jpeg
    };
  }

  return null;
}

export async function takePhotoWithCamera() {
  const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (!permissionResult.granted) {
    Alert.alert("Permission required", "We need access to your camera.");
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const asset = result.assets[0];
    return {
      uri: asset.uri,
      name: asset.fileName || asset.uri.split("/").pop(),
      type: asset.type || "image/jpeg", // default to jpeg
    };
  }

  return null;
}

//  const saveImageToFileSystem = async (uri) => {
//     const fileName = new Date().getTime() + ".jpg"; // Extract the file name from the URI
//     const dest = imgDir + fileName; // Create a new path in the document directory
//     try {
//       await FileSystem.copyAsync({
//         from: uri,
//         to: dest,
//       });
//       setImageUri(dest); // Return the new path of the saved image
//       setFormData({ ...formData, image: dest });
//     } catch (error) {
//       console.error("Error saving image:", error);
//       return null;
//     }
//   };
