"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SearchProduct } from "@/app/actions/products.actions";
import {
  ProductOrg,
  ProductDetailsProps,
  ProductImagesProps,
  ProductInformationProps,
  ProductReviewsProps,
  CartItem,
} from "@/lib/types";
import Loading from "@/app/loading";
import Goback from "./ui/Goback";
import ReactCountUp from "./ui/ReactCountUp";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const ProductsDetails = ({ title }: { title: string }) => {
  const [product, setProduct] = useState<ProductOrg[] | null>(null);
  useEffect(() => {
    const search = async () => {
      try {
        if (title) {
          const res = await SearchProduct(title);
          if (res) setProduct(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!product) search();
  }, [title, product]);

  if (!product) return <Loading />;

  return (
    <>
      <div className="animate-slideDownOne relative max-w-screen mx-auto py-8 px-4 md:px-6 text-zinc-300 flex flex-col lg:flex-row gap-8">
        <Goback />
        <ProductImages product={product[0]} />
        <div className="w-full lg:w-1/2 col-span-2 grid gap-6 mt-8">
          <ProductDetails product={product[0]} />
          <ProductReviews reviews={product[0].reviews} />
          <ProductInformation product={product[0]} />
        </div>
      </div>
    </>
  );
};
export default ProductsDetails;

const ProductImages: React.FC<ProductImagesProps> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState<string>(product.thumbnail);

  return (
    <div className="lg:sticky top-20 w-full md:w-1/2 h-[70%] grid gap-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <div className="col-span-1 md:col-span-4">
          <Image
            src={currentImage}
            alt="Product Image"
            width={400}
            height={400}
            className="aspect-square object-cover w-full rounded-lg overflow-hidden"
          />
        </div>
        <div className="flex md:grid md:grid-cols-1 gap-3 overflow-x-auto md:overflow-auto">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`${
                image === currentImage && "drop-shadow-lg"
              } hover:drop-shadow-lg rounded-lg overflow-hidden flex-shrink-0`}
              onClick={() => setCurrentImage(image)}
              aria-label={`View Image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Preview thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="aspect-square object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const navigate = useRouter();

  const { addItemToCart, removeItemFromCart } = useCart();
  const { cartItems } = useAuth();
  const isInCart = cartItems.some((item) => item.id === product.id);
  // console.log(cartItems);

  const itemId: number = product && product.id;
  const handleAddToCart = () => {
    if (!product) return;

    const cartItem: CartItem = {
      id: product.id,
      category: product.category,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail as string,
      quantity: 1,
      price: product?.price,
    };
    addItemToCart(cartItem);
  };
  const buyNow = () => {
    if (!product) return;

    const cartItem: CartItem = {
      id: product.id,
      category: product.category,
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail as string,
      quantity: 1,
      price: product?.price,
    };
    addItemToCart(cartItem);
    navigate.push("/cart");
  };

  const handleRemoveFromCart = () => {
    removeItemFromCart(itemId, false);
  };

  return (
    <div className="w-full grid gap-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">
          {product.title}
        </h1>
        <p className="text-justify">{product.description}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`animate-slideDown w-5 h-5 ${
                i < Math.round(product.rating)
                  ? "fill-muted stroke-muted-foreground"
                  : "fill-primary"
              }`}
            />
          ))}
        </div>
        <ReactCountUp
          className="animate-slideDownOne text-4xl font-bold"
          prefix="₹"
          amt={83 * product.price}
        />
      </div>
      <div className="animate-slideDownTwo">
        <p className="text-sm leading-loose text-justify">
          {product.description}
        </p>
        <p className="text-sm leading-loose text-justify">
          Introducing the {product.title}, Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Aliquam pariatur adipisci quae illum
          voluptatum hic eaque sunt asperiores nulla eveniet velit suscipit
          officiis quo a vitae amet quam excepturi id ipsum eligendi
          exercitationem, voluptas error numquam nisi. Blanditiis, nemo nisi!.
        </p>
      </div>
      <div className="animate-slideDownThree w-full flex flex-col md:flex-row gap-2">
        <Button size="lg" className="w-full " onClick={buyNow}>
          Buy
        </Button>
        {isInCart ? (
          <Button
            size="lg"
            className="w-full text-[red]"
            onClick={handleRemoveFromCart}
          >
            Remove from cart
          </Button>
        ) : (
          <Button size="lg" className="w-full" onClick={handleAddToCart}>
            Add to cart
          </Button>
        )}
      </div>
    </div>
  );
};

const ProductReviews: React.FC<ProductReviewsProps> = ({ reviews }) => {
  return (
    <div className="animate-slideDownFour">
      <h2 className="text-2xl font-bold">Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="mt-4 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "fill-muted stroke-muted-foreground"
                        : "fill-primary"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm">
                {review.reviewerName} -{" "}
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
            <p className="mt-1 text-sm text-zinc-400">{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductInformation: React.FC<ProductInformationProps> = ({ product }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Product Information</h2>
      <table className="mt-4 text-sm w-full">
        <tbody>
          <tr>
            <th className="text-left p-2">Brand:</th>
            <td className="p-2">{product.brand}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Category:</th>
            <td className="p-2">{product.category}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Tags:</th>
            <td className="p-2">{product.tags.join(", ")}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Availability Status:</th>
            <td className="p-2">{product.availabilityStatus}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Stock:</th>
            <td className="p-2">{product.stock}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Warranty Information:</th>
            <td className="p-2">{product.warrantyInformation}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Shipping Information:</th>
            <td className="p-2">{product.shippingInformation}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Return Policy:</th>
            <td className="p-2">{product.returnPolicy}</td>
          </tr>
          <tr>
            <th className="text-left p-2">Minimum Order Quantity:</th>
            <td className="p-2">{product.minimumOrderQuantity}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

interface StarIconProps extends React.SVGProps<SVGSVGElement> {}
const StarIcon: React.FC<StarIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};
