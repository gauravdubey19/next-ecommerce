"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { CartItem } from "@/lib/types";
import ProductCard from "./ui/ProductCard";
import ReactCountUp from "./ui/ReactCountUp";
import Goback from "./ui/Goback";
import { clearCart } from "@/utils/utils";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const { cartItems, setCartItems, user } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    await clearCart(user?.uid as string);
    setCartItems([]);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.replace("/"); // /order
    }, 3000);
  };

  return (
    <section className="relative w-full h-full min-h-[80vh] px-4 lg:px-6">
      <Goback />
      {showSuccess && (
        <div className="fixed top-5 -left-1 z-20 w-full h-full  backdrop-blur-sm flex-center">
          <p className="w-fit h-fit px-16 py-10 rounded-lg bg-black/90 flex-center text-3xl shadow-md shadow-green-500/40 text-green-500">
            Order placed successfully!
          </p>
        </div>
      )}
      <h2 className="text-2xl font-extrabold mt-10 mb-6">Cart</h2>
      {cartItems.length > 0 ? (
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-[80%] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {cartItems.map((item: CartItem) => (
              <ProductCard key={item.id} cart={true} product={item} />
            ))}
          </div>
          <div className="w-full md:w-[20%] h-full md:fixed top-16 right-0 mt-4 md:mt-0 border-t md:border-t-0 md:border-l md:border-gray-200/15 px-4 py-6">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total Amount:</span>
              <ReactCountUp
                className="text-lg font-semibold"
                prefix="₹"
                amt={83 * totalAmount}
              />
            </div>
            <Button onClick={handleCheckout} className="w-full">
              Checkout
            </Button>
          </div>
        </section>
      ) : (
        <p className="text-center text-3xl font-medium">Your cart is empty.</p>
      )}
    </section>
  );
};

export default Cart;
