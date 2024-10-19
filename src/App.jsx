import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Account from "./pages/Account";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./admin/Dashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderPage from "./pages/OrderPage";
import Orders from "./pages/Order";
import OrderSuccess from "./pages/OrderSucess";
import Payment from "./pages/Payment";

const App = () => {
  const { loading, isAuth, user } = UserData();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Header isAuth={isAuth} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route path="/login" element={isAuth ? <Home /> : <Login />} />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
            <Route path="/products" element={<Product />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/admin/dashboard"
              element={isAuth ? <Dashboard user={user} /> : <Login />}
            />
            <Route path="/cart" element={isAuth ? <Cart /> : <Login />} />
            <Route
              path="/checkout"
              element={isAuth ? <Checkout /> : <Login />}
            />
            <Route
              path="/order/:id"
              element={isAuth ? <OrderPage /> : <Login />}
            />
            <Route path="/orders" element={isAuth ? <Orders /> : <Login />} />
            <Route
              path="/ordersuccess"
              element={isAuth ? <OrderSuccess /> : <Login />}
            />
            <Route
              path="/payment/:id"
              element={isAuth ? <Payment /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
