import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create the context
export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  // Basic app data
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL?.trim();

  // State variables
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // ---------------- CART LOGIC ----------------
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a product size!");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to add items to the cart!");
      return;
    }

    try {
      await axios.post(
        `${backendUrl}/api/cart/add`,
        { itemId, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log("Error adding to cart:", error);
      toast.error(error.response?.data?.message || error.message);
      return;
    }

    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
      return cartData;
    });
    
    toast.success("Added to cart!");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev);
      if (cartData[itemId]?.[size] !== undefined) {
        cartData[itemId][size] = quantity;
      }
      return cartData;
    });

    if (token) {
      try {
        await axios.post(backendUrl + "/api/cart/update", { itemId, size, quantity }, { headers: { Authorization: `Bearer ${token}` } })
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    } 
    return totalAmount;
  };

  // ---------------- PRODUCTS FETCH ----------------
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`Failed to load products: ${error.message}`);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } })
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (backendUrl) getProductsData();
    else toast.error("Backend URL missing in environment variables!");
  }, [backendUrl]);

  // Handling The Login User When Refresh
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
      getUserCart(localToken);
    }
  }, []);


  // ---------------- CONTEXT VALUE ----------------
  const value = {
    currency,
    delivery_fee,
    products,
    setProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
