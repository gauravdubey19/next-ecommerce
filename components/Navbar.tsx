"use client";

import React, { useState, FC } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { BsCart4 } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import ReactCountUp from "./ui/ReactCountUp";

const Navbar: FC<{ appName: string }> = ({ appName }) => {
  const { user, googleSignIn, logOut, cartItems } = useAuth();
  // console.log(cartItems || "null");
  const [show, setShow] = useState<boolean>(false);
  const handleProfile = () => setShow(!show);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="sticky top-0 z-50 h-16 select-none w-full p-2 lg:px-20 flex-between gap-2 text-white bg-transparent backdrop-blur-lg shadow-[0_0_20px_rgba(0,0,0)]">
      <Link
        href="/"
        className="flex-center text-3xl font-black hover:text-cyan-200 ease-in-out duration-300"
      >
        {appName}
      </Link>

      <div className="flex-center gap-2 text-sm font-semibold">
        {!user ? (
          <Button
            onClick={handleSignIn}
            className="capitalize hover:text-cyan-200 active:translate-y-1 ease-in-out duration-300"
          >
            login
          </Button>
        ) : (
          <div className="flex-center gap-3">
            <Link href="/cart" title="Cart" className="relative mr-2 group">
              <BsCart4
                size={25}
                className="group-hover:fill-cyan-200 ease-in-out duration-200"
              />
              {cartItems?.length > 0 && (
                <ReactCountUp
                  className="absolute -top-4 -right-1.5 rounded-full text-cyan-400 text-lg"
                  prefix=""
                  amt={cartItems?.length}
                />
              )}
            </Link>
            <div className="relative">
              <div
                onClick={handleProfile}
                title="Profile"
                className="group w-8 h-8 rounded-full cursor-pointer hover:drop-shadow-lg ease-in-out duration-200 overflow-hidden"
              >
                <Image
                  src={user?.photoURL + ""}
                  alt={user.displayName + ""}
                  width={50}
                  height={50}
                  className="w-full h-full"
                />
              </div>
              {show && (
                <div className="z-20 absolute -right-2 top-10 flex flex-col gap-2 bg-black/90 backdrop-blur-lg p-2 rounded-lg shadow-[0_0_20px_rgba(0,0,0)]">
                  <span>{user?.displayName}</span>
                  <span className="text-xs font-light">{user?.email}</span>
                  <Button
                    className="capitalize hover:text-red-500 active:translate-y-1 ease-in-out duration-300"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
