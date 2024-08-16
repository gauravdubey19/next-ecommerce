"use client";

import {
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsCategoryList,
} from "@/app/actions/products.actions";
import React, { useEffect, useState } from "react";
import ProductCarousel from "./ui/ProductCarousel";
import { ProductOrg } from "@/lib/types";
import Loading from "@/app/loading";
import Goback from "./ui/Goback";
import ProductCard from "./ui/ProductCard";

interface ProductCategoryProps {
  page?: boolean;
  carousel?: boolean;
  category?: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  page,
  carousel,
  category,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || ""
  );
  const [categoryList, setCategoryList] = useState<string[] | null>(null);
  const [products, setProducts] = useState<ProductOrg[] | null>(null);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const res = await fetchProductsCategoryList();
        if (res) setCategoryList(res);
      } catch (error) {
        console.log(error);
      }
    };

    const productfetching = async () => {
      try {
        if (carousel) {
          const resProduct = await fetchProducts(160);
          if (resProduct) setProducts(resProduct);
        }
        if (page && selectedCategory) {
          const resProduct = await fetchProductsByCategory(selectedCategory);
          if (resProduct) setProducts(resProduct);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!categoryList) fetchCategoryList();
    productfetching();
  }, [carousel, page, selectedCategory, categoryList]);
  //   console.log(categoryList);

  if (!products && !categoryList) return <Loading />;

  const uniqueCategories = Array.from(
    new Set(products && products.map((product) => product?.category))
  );

  return (
    <>
      {carousel &&
        products &&
        uniqueCategories?.map((category, index) => (
          <ProductCarousel
            key={index}
            category={category}
            products={products}
          />
        ))}
      {page && products && (
        <section className="select-none py-12 md:py-16 lg:py-20">
          <Goback />
          <div className="container">
            {categoryList && (
              <>
                <div className="categoryList w-full flex-center mb-5">
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="scrollDiv w-[90%] md:w-[70%] lg:w-[60%] cursor-pointer px-4 py-3 rounded-md bg-gray-800/25 text-white capitalize border-none active:outline-none"
                  >
                    {categoryList.map((category, index) => (
                      <option
                        key={index || category}
                        value={category}
                        className="bg-black capitalize overflow-hidden"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold capitalize">
                {selectedCategory}
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductCategory;
