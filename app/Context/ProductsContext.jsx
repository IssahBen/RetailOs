import { createContext } from "react";
import { useState } from "react";
import { useAuth } from "./AuthContext";
const ProductContext = createContext(undefined);
export default function ProductsPovider({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const { token, email } = useAuth();
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  async function addProduct(obj) {
    try {
      const res = await fetch(
        "https://3006-99-230-98-234.ngrok-free.app/api/v1/products",
        {
          method: "POST",
          headers: {
            "X-User-Token": token,
            "X-User-Email": email,
          },
          body: obj,
        }
      );
      const data = await res.json();
      if (res.ok) {
        return "success";
      } else {
        const error = data.error || "Product creation failed";
        setErrorMessage(error);
        setVisible(true);
        return "failed";
      }
    } catch (error) {
      setErrorMessage("Server Offline");
      setVisible(true);
      return "failed";
    }
  }
  async function updateProduct(obj, id) {
    try {
      const res = await fetch(
        `https://3006-99-230-98-234.ngrok-free.app/api/v1/products/${id}`,
        {
          method: "POST",
          headers: {
            "X-User-Token": token,
            "X-User-Email": email,
          },
          body: obj,
        }
      );
      const data = await res.json();
      if (res.ok) {
        return "success";
      } else {
        const error = data.error || "Product creation failed";
        setErrorMessage(error);
        setVisible(true);
        return "failed";
      }
    } catch (error) {
      setErrorMessage("Server Offline");
      setVisible(true);
      return "failed";
    }
  }
  async function GetProducts() {
    try {
      const res = await fetch(
        "https://3006-99-230-98-234.ngrok-free.app/api/v1/products",
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
      Alert.alert("Error", "Failed to fetch data from the server.");
    }
  }
  async function GetProduct(id) {
    try {
      const res = await fetch(
        `https://3006-99-230-98-234.ngrok-free.app/api/v1/products/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      // Set the fetched data to state

      setProduct(data);
      return "success";
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data from the server.");
    }
  }
  return (
    <ProductContext.Provider
      value={{
        addProduct,
        errorMessage,
        setErrorMessage,
        visible,
        setVisible,
        GetProducts,
        products,
        GetProduct,
        product,
        setProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
import { useContext } from "react";
import { Alert } from "react-native";
