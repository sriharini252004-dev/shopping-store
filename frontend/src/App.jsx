import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <main className="main-content">
          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />

            {/* Product Details Routes */}
            <Route
              path="/products/:id"
              element={<ProductDetails />}
            />

            <Route
              path="/ProductDetails"
              element={<ProductDetails />}
            />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h2>404 - Page Not Found</h2>
                  <p>
                    Sorry, the page you are looking for does not exist.
                  </p>
                </div>
              }
            />

          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;