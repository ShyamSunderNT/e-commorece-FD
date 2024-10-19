import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token); // Fetch user if token exists
    } else {
      setLoading(false); // No token, loading is done
    }
  }, []);

  async function registerUser(name, email, password, navigate) {
    try {
      const { data } = await axios.post("https://e-commorce-bd.onrender.com/api/user/register", {
        name,
        email,
        password,
      });
      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("activationToken", data.activationToken);
        navigate("/verify");
      }
    } catch (error) {
      const message = error.response ? error.response.data.message : "An error occurred";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyUser(otp, navigate) {
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post("https://e-commorce-bd.onrender.com/api/user/verify", {
        activationToken,
        otp,
      });
      if (data.message) {
        localStorage.clear();
        navigate("/login");
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function userLogin(email, password, navigate) {
    try {
      const { data } = await axios.post("https://e-commorce-bd.onrender.com/api/user/login", {
        email,
        password,
      });
      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        setIsAuth(true);
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      setIsAuth(false);
      return;
    }

    try {
      const { data } = await axios.get("https://e-commorce-bd.onrender.com/api/user/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure correct header format
        },
      });
      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      toast.error("Failed to fetch user data. Please log in again.");
      logout(); // Now it should correctly reference the logout function
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.clear();
    setIsAuth(false);
    setUser(null);
    toast.success("Successfully logged out.");
  }

  return (
    <UserContext.Provider value={{ isAuth, user, registerUser, loading, verifyUser, userLogin, logout }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
}

export const UserData = () => useContext(UserContext);


