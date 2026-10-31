
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => String(item._id || item.id) === String(product._id || product.id)
      );

      if (existingItem) {
        return previousItems.map((item) =>
          String(item._id || item.id) === String(product._id || product.id)
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((items) =>
      items.filter(
        (item) => String(item._id || item.id) !== String(productId)
      )
    );
  };

  const increaseQuantity = (productId) => {
    setCartItems((items) =>
      items.map((item) =>
        String(item._id || item.id) === String(productId)
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((items) =>
      items
        .map((item) =>
          String(item._id || item.id) === String(productId)
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart() must be used inside <CartProvider>.");
  }

  return context;
}
