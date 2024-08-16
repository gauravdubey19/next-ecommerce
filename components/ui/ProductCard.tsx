"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { CartItem, ProductInfo } from "@/lib/types";
import ReactCountUp from "./ReactCountUp";
import { MdAddShoppingCart } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface ProductCardProps {
  cart?: boolean;
  product: ProductInfo;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cart }) => {
  const { addItemToCart, removeItemFromCart } = useCart();

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      category: product.category,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      quantity: 1,
      price: product.price,
    };
    addItemToCart(cartItem);
  };

  const itemId = product.id;
  const handleRemoveQuantityFromCart = () => {
    removeItemFromCart(itemId, true);
  };
  const handleRemoveFromCart = () => {
    removeItemFromCart(itemId, false);
  };
  return (
    <>
      <div className="relative group text-white rounded-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
        {cart && (
          <button
            title="Remove from cart"
            onClick={handleRemoveFromCart}
            className="absolute right-2 z-10 w-6 h-6 rounded-full flex-center cursor-pointer hover:text-red-500 hover:scale-105 active:scale-95 ease-in-out duration-200"
          >
            X
          </button>
        )}
        <Image
          src={product?.thumbnail}
          alt={product?.title}
          width={400}
          height={400}
          className="group w-full h- object-cover group-hover:drop-shadow-lg ease-in-out duration-100"
        />
        <div className="p-2 bg-transparent backdrop-blur-md">
          <h3 className="text-md md:text-lg font-medium line-clamp-1 group-hover:text-xl ease-in-out duration-300">
            {product?.title}
          </h3>
          <p className="text-sm text-zinc-300 line-clamp-2">
            {product?.description}
          </p>
          <div className="flex-between mt-2">
            <ReactCountUp
              className="text-lg font-semibold"
              prefix="₹"
              amt={83 * product?.price}
            />
            {cart ? (
              <div className="w-fit flex-between gap-3 select-none">
                <AiOutlinePlus
                  size={20}
                  onClick={handleAddToCart}
                  title="+ Quantity"
                  className="cursor-pointer hover:fill-cyan-400 active:scale-95 ease-in-out duration-200"
                />
                <span className="text-cyan-400">{product?.quantity}</span>
                {(product?.quantity as number) > 1 ? (
                  <AiOutlineMinus
                    onClick={handleRemoveQuantityFromCart}
                    title="- Quantity"
                    size={20}
                    className="cursor-pointer hover:fill-red-700 active:scale-95 ease-in-out duration-200"
                  />
                ) : (
                  <button
                    title="Remove from cart"
                    onClick={handleRemoveFromCart}
                    className="ml-2 mr-1 cursor-pointer hover:text-red-700 active:scale-95 ease-in-out duration-200"
                  >
                    X
                  </button>
                )}
              </div>
            ) : (
              <button
                title="Add to cart"
                onClick={handleAddToCart}
                className="lg:text-black text-2xl font-extrabold rounded-full p-1 group-hover:text-cyan-600 ease-in-out duration-300"
              >
                <MdAddShoppingCart />
              </button>
            )}
          </div>

          <Link
            href={`/${product?.category}/${product?.title}`}
            className="w-full select-none mt-2 flex-center px-3 py-1 rounded-2xl bg-slate-800/85 hover:bg-slate-700/85 active:translate-y-0.5 ease-in-out duration-300"
          >
            View more
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
