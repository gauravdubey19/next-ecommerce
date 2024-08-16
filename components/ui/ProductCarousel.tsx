import Link from "next/link";
import { ProductCategoryProps } from "@/lib/types";
import ProductCard from "./ProductCard";
import Carousel from "./Carousel";
import { IoArrowForwardSharp } from "react-icons/io5";
import { replaceHyphensWithSpaces } from "@/utils/utils";

const ProductCarousel: React.FC<ProductCategoryProps> = ({
  category,
  products,
}) => {
  // console.log(products);
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="w-full pt-4 pb-2 px-2 md:px-6 lg:px-8 flex-between">
          <h2 className="capitalize text-lg md:text-xl lg:text-2xl font-bold">
            {replaceHyphensWithSpaces(category)}
          </h2>
          <Link
            href={`/${category}`}
            className="group w-fit flex-center gap-2 p-1 px-3 md:p-2 md:px-4 rounded-3xl cursor-pointer bg-slate-800 md:bg-transparent active:bg-slate-800 lg:hover:bg-slate-800 ease-in-out duration-300"
          >
            <span className="text-sm md:text-md font-medium">View More</span>
            <IoArrowForwardSharp
              size={25}
              className="group-active:translate-x-1.5 ease-in-out duration-300"
            />
          </Link>
        </div>
        <Carousel className="px-2 md:px-6 lg:px-8 py-2 cursor-grab active:cursor-grabbing">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index || product.id} product={product} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProductCarousel;
