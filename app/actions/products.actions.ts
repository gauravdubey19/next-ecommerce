"use server";

import { ProductResponse } from "@/lib/types";
import { replaceHyphensWithSpacesInArr } from "@/utils/utils";

// const api = "https://dummyjson.com/products";
const api = process.env.DUMMYJSON_PUBLIC_API;

export const fetchProductsCategoryList = async () => {
  try {
    const res = await fetch(`${api}/category-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const list: [] = await res.json();
    if (list) {
      const categoryList = replaceHyphensWithSpacesInArr(list);
      return categoryList;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductsByCategory = async (category: string) => {
  try {
    const res = await fetch(`${api}/category/${category}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ProductResponse = await res.json();
    if (data && data.products) return data.products;
  } catch (error) {
    console.log(error);
  }
};
export const fetchProducts = async (limit: number) => {
  try {
    const res = await fetch(`${api}?limit=${limit}&skip=10`, {
      method: "GET" /* or POST/PUT/PATCH/DELETE */,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ProductResponse = await res.json();
    if (data && data.products) return data.products;
  } catch (error) {
    console.log(error);
  }
};
export const SearchProduct = async (title: string) => {
  try {
    const res = await fetch(`${api}/search?q=${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data.products[0]);

    if (data && data.products) return data.products;
  } catch (error) {
    console.log(error);
  }
};
