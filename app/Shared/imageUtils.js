import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

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
