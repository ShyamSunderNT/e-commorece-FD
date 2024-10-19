import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [cart, setCart] = useState([]);


  async function fetchCart() {
    setLoading(true); // Optional: If you want to show loading state
  
    const token = localStorage.getItem("token"); // Retrieve the token
  
    if (!token) {
      toast.error("Please log in to view your cart.");
      setLoading(false);
      return;
    }
  
    try {
      const { data } = await axios.get(`${"https://e-commorce-bd.onrender.com"}/api/cart/all`, {
        headers: { Authorization: `Bearer ${token}` }, // Use Authorization header
      });
      setCart(data.cart);
      setTotalItem(data.sumofQuantities);
      setSubTotal(data.subTotal);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch cart data");
      console.log(error);
    } finally {
      setLoading(false); // Optional: Reset loading state
    }
  }

 
  async function addToCart(product) {
    setLoading(true);
    const token = localStorage.getItem("token"); // Retrieve the token
  
    if (!token) {
      toast.error("Please log in to add items to the cart.");
      setLoading(false);
      return;
    }
  
    try {
      const { data } = await axios.post(
        `${"https://e-commorce-bd.onrender.com"}/api/cart/new`,
        { product },
        { headers: { Authorization: `Bearer ${token}` } } // Use Authorization header
      );
  
      if (data.message) {
        toast.success(data.message);
        fetchCart();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setLoading(false);
    }
  }

  async function updateCart(action, id) {
    setLoading(true);
    const token = localStorage.getItem("token"); // Retrieve the token
  
    if (!token) {
      toast.error("Please log in to update your cart.");
      setLoading(false);
      return;
    }
  
    try {
      await axios.put(
        `${"https://e-commorce-bd.onrender.com"}/api/cart?action=${action}`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } } // Use Authorization header
      );
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update cart");
    } finally {
      setLoading(false);
    }
  }
  

  

  async function removeFromCart(id) {
    setLoading(true);
    const token = localStorage.getItem("token"); // Retrieve the token
  
    if (!token) {
      toast.error("Please log in to remove items from the cart.");
      setLoading(false);
      return;
    }
  
    try {
      const { data } = await axios.delete(`${"https://e-commorce-bd.onrender.com"}/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Use Authorization header
      });
      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from cart");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItem,
        subTotal,
        loading,
        addToCart,
        updateCart,
        removeFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartData = () => useContext(CartContext);
