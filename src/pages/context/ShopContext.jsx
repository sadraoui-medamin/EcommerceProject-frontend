import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);
import axios from "axios";
import apiBaseUrl from "../../config/api.js";

const ShopContextProvider = ( props ) => { 
  const [cartItems, setCartItems] = useState({}); // Object to store cart items with itemId and size
  const [token, setToken] = useState("");
  const url = apiBaseUrl;
  const [all_products, setAll_products] = useState([]);
  let delivery_charge =10;
  const [search, setSearch] = useState("")
  const currency = "$";
  const [showSearch, setShowSearch] = useState(false)
  //this is for favorite and compare products
  const [countfavorite ,setCountfavorite] = useState(0);
  const [countcompare, setCountcompare] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [compares, setCompares] = useState([]);
  const [webSiteInfo, setWebSiteInfo] = useState({});

  //  fetch website infos 
  const fetchWebsiteInfo = async ()=>{
    try {
      const res = await axios.get(`${url}/api/aboutUs/getInfo`) || {};
      console.log(res)
      setWebSiteInfo({
        siteName: res.data?.data?.siteName || "",
        logo: res.data?.data?.logo || "",
        favicon: res.data?.data?.favicon || "",
        contactEmail: res.data?.data?.contactEmail || "",
        contactPhone: res.data?.data?.contactPhone || "",
        address: res.data?.data?.address || "",
      });
        console.log("fetched info",res.data)
    } catch (error) {
        console.error(error);
    }
  }
  useEffect(()  => {
    fetchWebsiteInfo();
  }, []);

  // If it already exists, the quantity is incremented by 1.
  // Adding items to cart
  const addToCart = async (itemId) => {
    // Create a copy of cartItems to avoid direct state mutation
    let cartData = { ...cartItems };
    // Check if the item already exists in the cart
    if (cartData[itemId]) {
      cartData[itemId] += 1; // Increase quantity
    } else {
      cartData[itemId] = 1; // Add new item with quantity 1
    }
    // Update state
    setCartItems(cartData);
  
    // If user is logged in, update the backend
    if (token) {
      try {
         await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };
  // removeFromCart
  const removeFromCart = async (itemId) => {
    let cartData = { ...cartItems };
  
    if (cartData[itemId]) {
      cartData[itemId] -= 1; // Decrease quantity
  
      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // Remove item if quantity reaches 0
      }
    }
  
    setCartItems(cartData);
  
    if (token) {
      try {
       const response = await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing from cart:", error);
      }
    }
  };
  // get total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = all_products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };
  // Updating the Quantity
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      totalCount += cartItems[itemId];
    }
    return totalCount;
  };
  // Updating the Quantity
  const updateQuantity = async (productId, quantity) => {
    // Update the local state first
    setCartItems((prevCart) => {
      if (quantity === 0) {
        const updatedCart = { ...prevCart };
        delete updatedCart[productId];
        return updatedCart;
      }
      return {
        ...prevCart,
        [productId]: quantity,
      };
    });
  
    // If the user is authenticated, update the backend cart data
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/update`,
          { itemId: productId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };
  
  
  // fetch product list     
  const fetchProductList = async () => {
    try {
      const response = await axios.get(url + "/api/product/list");
      if (response.data && response.data.products) {
        setAll_products(response.data.products); // Update state with fetched data
        console.log(all_products);
      } else {
        console.error('Data is undefined or missing in the response');
      }
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };
  
  // Function to load cart data based on the user's token
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
      setCartItems(response.data.cartData);
      console.log("loadCartData ",response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };


  useEffect(() => {
    async function loadData() {
      try {
        await fetchProductList(); // Fetch product list
        if (localStorage.getItem("token")) {
          setToken(localStorage.getItem("token")); // Set token if it exists in localStorage
          await loadCartData(localStorage.getItem("token")); // Load cart data
        }
      } catch (error) {
        console.error("Error during initial data load:", error);
      }
    }
    loadData();
  }, [token]);

  //My Favorites fromm db
  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`${url}/api/favorites/getAll`, {
        headers: { token },
        signal: AbortSignal.timeout(1000) // Add timeout
      });
      setCountfavorite(res.data?.data?.length || 0); // Set the count of favorites
      setFavorites(res.data?.data || []); // Set the favorites array
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching favorite:", error);
    }
  }
  };
  //get My Compare List fromm db
  const fetchCompares= async () => {
    try {
      const res = await axios.get(`${url}/api/compares/getAll`, {
        headers: {token},
        signal: AbortSignal.timeout(1000) // Add timeout

      });
      setCountcompare(res.data?.data?.length || 0); // Set the count of favorites
      setCompares(res.data?.data || []); // Set the favorites array
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Error fetching favorite:", error);
    } 
    }
  };
  // Create the context value to share with child components
  const contextValue = {
      products: all_products, all_products, cartItems, setCartItems, addToCart,
      removeFromCart, getTotalCartAmount, getCartCount, token, setToken, url, currency,
      delivery_charge, search, setSearch, showSearch, setShowSearch,updateQuantity,countfavorite,
      fetchFavorites,favorites,setFavorites,countcompare,compares,setCompares,fetchCompares,webSiteInfo
  };

  return (
    // Provide the context to the component tree
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
