"use client";

import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { addToCart, removeFromCart } from "@/utils/utils";
import { CartItem } from "@/lib/types";

interface CartContextType {
  addItemToCart: (itemData: CartItem) => void;
  removeItemFromCart: (itemId: number, decrementQuantity: boolean) => void;
}

const defaultContextValue: CartContextType = {
  addItemToCart: () => {},
  removeItemFromCart: () => {},
};

const CartContext = createContext<CartContextType>(defaultContextValue);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, cartItems, setCartItems } = useAuth();
  const uid = user?.uid;
  const email = user?.email;

  const addItemToCart = async (itemData: CartItem) => {
    if (email && uid) {
      try {
        // Update local state
        setCartItems((prevItems: CartItem[]) => {
          const existingItemIndex = prevItems.findIndex(
            (item) => item.id === itemData.id
          );

          if (existingItemIndex > -1) {
            // Update existing item quantity
            const updatedItems = prevItems.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return updatedItems;
          } else {
            return [...prevItems, { ...itemData, quantity: 1 }];
          }
        });

        // Update database
        await addToCart(uid, email, itemData);
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      console.error("User information is not available.");
    }
  };

  const removeItemFromCart = async (
    itemId: number,
    decrementQuantity: boolean
  ) => {
    if (email && uid) {
      try {
        // Update local state
        setCartItems((prevItems: CartItem[]) => {
          if (decrementQuantity) {
            return prevItems
              .map((item) =>
                item.id === itemId
                  ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
                  : item
              )
              .filter((item) => item.quantity > 0);
          } else {
            return prevItems.filter((item) => item.id !== itemId);
          }
        });

        // Updating in database
        await removeFromCart(uid, itemId, decrementQuantity);
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      console.error("User information is not available.");
    }
  };

  return (
    <CartContext.Provider value={{ addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
