"use client";

import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { CartItem } from "@/lib/types";
import { ref, set } from "firebase/database";
import { getCartItems } from "@/utils/utils";

interface AuthContextType {
  user: User | null;
  googleSignIn: () => void;
  logOut: () => void;
  cartItems: CartItem[]; // Updated to hold an array of CartItem
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  // setCartItems: (items: CartItem[]) => void;
}

const defaultContextValue: AuthContextType = {
  user: null,
  googleSignIn: async () => {},
  logOut: async () => {},
  cartItems: [],
  setCartItems: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const googleSignIn = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const { uid, displayName, email, photoURL } = result.user;
        const timestamp = Date.now();

        await set(ref(db, `users/${uid}`), {
          name: displayName || "Anonymous",
          email: email || "",
          photoURL: photoURL,
          createdAt: timestamp,
        });
      }
    } catch (error) {
      console.error("Error during Sign-In:", error);
    }
  };

  const logOut = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during Sign-Out:", error);
    }
  };

  useEffect(() => {
    const authState = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });
    const cartFetch = async () => {
      if (user && user.uid) {
        const fetchedCartItems = await getCartItems(user.uid);
        // console.log(fetchedCartItems?.items);
        if (fetchedCartItems?.items) setCartItems(fetchedCartItems?.items);
      } else {
        setCartItems([]);
      }
    };

    cartFetch();
    // console.log(cartItems);

    return () => authState();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, googleSignIn, logOut, cartItems, setCartItems }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
