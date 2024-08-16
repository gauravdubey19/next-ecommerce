"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchProduct } from "@/app/actions/products.actions";
import { ProductOrg } from "@/lib/types";
import Carousel from "./ui/Carousel";

const Hero = () => {
  const [productsCarousel, setProductsCarousel] = useState<ProductOrg[] | null>(
    null
  );
  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await SearchProduct("laptop");

        if (res) setProductsCarousel(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (!productsCarousel) fetching();
  }, [productsCarousel]);
  // console.log(productsCarousel);

  return (
    <>
      <section className="group h-[50vh] w-full overflow-hidden">
        <Carousel
          infinite={false}
          autoplay={true}
          slidesToScroll={1}
          slidesToShow={1}
          className="w-full h-full md:px-2 overflow-hidden"
        >
          {productsCarousel?.slice(0, 8).map((product, index) => (
            <div
              key={index}
              className="relative h-[50vh] w-full cursor-grab active:cursor-grabbing overflow-hidden"
            >
              <Image
                src={product?.thumbnail}
                alt={product?.title}
                loading="eager"
                width={1200}
                height={600}
                className="h-full w-full object-cover group-hover:scale-105 ease-in-out duration-300"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/50 flex-center flex-col text-white p-6 text-center ease-in-out duration-300">
                <h2 className="text-3xl font-bold">{product?.title}</h2>
                <p className="text-md text-zinc-300 line-clamp-2 text-balance w-[20rem] md:w-[30rem] overflow-hidden">
                  {product?.description}
                </p>
                <Link
                  href={`/${product?.category}/${product?.title}`}
                  className="mt-4 w-fit bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-lg group-hover:scale-105 hover:text-cyan-200 hover:bg-slate-800/70 active:translate-y-0.5 ease-in-out duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
    </>
  );
};

export default Hero;
