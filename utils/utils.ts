import { db } from "@/firebase/firebaseConfig";
import {
  ref,
  set,
  remove,
  get,
  DataSnapshot,
  update,
  child,
} from "firebase/database";
import { CartItem } from "@/lib/types";

export const getCartItems = async (uid: string) => {
  const cartRef = ref(db, `carts/${uid}`);
  const snapshot: DataSnapshot = await get(cartRef);
  const cartData = snapshot.val();

  if (!cartData || !cartData.items) {
    return {};
  }
  return cartData;
};

export const addToCart = async (
  uid: string,
  email: string,
  itemData: CartItem
) => {
  const timestamp = Date.now();
  const cartRef = ref(db, `carts/${uid}`);
  const cartItemsRef = child(cartRef, "items");

  try {
    // Checking cart exists..
    const cartSnapshot = await get(cartRef);
    const cartExists = cartSnapshot.exists();

    if (cartExists) {
      // Checking items[] exists within the cart..
      const itemsSnapshot = await get(cartItemsRef);
      const itemsExist = itemsSnapshot.exists();

      // If items[] exists -> updating quantity or adding new item..
      if (itemsExist) {
        const currentItems = itemsSnapshot.val() as CartItem[];
        const existingItemIndex = currentItems.findIndex(
          (item) => item.id === itemData.id
        );

        // Updating quantity if item already exists..
        if (existingItemIndex > -1) {
          currentItems[existingItemIndex].quantity += 1;
        } else {
          // Adding new item if it does not exist..
          currentItems.push({ ...itemData, quantity: 1 });
        }

        // Updating the items in the database..
        await update(cartRef, { items: currentItems });
      } else {
        // If items[] doesn't exist -> creating it and add the item..
        await update(cartRef, {
          items: [{ ...itemData, quantity: 1 }],
        });
      }
    } else {
      // If cart doesn't exist -> creating it with the item...
      const newCart = {
        email,
        items: [{ ...itemData, quantity: 1 }],
        createdAt: timestamp,
      };
      await set(cartRef, newCart);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const removeFromCart = async (
  uid: string,
  itemId: number,
  decrementQuantity: boolean
) => {
  const cartRef = ref(db, `carts/${uid}`);

  try {
    const snapshot = await get(cartRef);
    const currentCart = snapshot.val();

    if (currentCart) {
      let updatedItems: CartItem[];

      if (decrementQuantity) {
        updatedItems = currentCart.items
          .map((item: CartItem) => {
            if (item.id === itemId) {
              return {
                ...item,
                quantity: Math.max(item.quantity - 1, 1),
              };
            }
            return item;
          })
          .filter((item: CartItem) => item.quantity > 0);
      } else {
        updatedItems = currentCart.items.filter(
          (item: CartItem) => item.id !== itemId
        );
      }

      await update(cartRef, {
        items: updatedItems,
        createdAt: currentCart.createdAt,
      });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const clearCart = async (uid: string) => {
  if (uid) {
    try {
      const cartRef = ref(db, `carts/${uid}/items`);
      await remove(cartRef);
    } catch (error) {
      console.error("Error clearing cart from database:", error);
    }
  }
};
export const replaceHyphensWithSpacesInArr = (
  categoryList: string[]
): string[] => {
  return categoryList.map((category) => category.replace(/-/g, " "));
};

export const replaceHyphensWithSpaces = (text: string): string => {
  return text.replace(/-/g, " ");
};
