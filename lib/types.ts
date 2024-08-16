export interface CartItem {
  id: number;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity: number;
}
export interface ProductInfo {
  id: number;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity?: number;
}

export interface ProductDetailPageProps {
  params: {
    category: string;
    title: string;
  };
}

export interface ProductCategoryProps {
  category: string;
  products: ProductOrg[];
}

export interface CardProps {
  id: number;
  img: string;
  head: string;
  description: string;
  href: string;
}

export interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  infinite?: boolean;
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  arrows?: boolean;
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductOrg {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
}

export interface ProductResponse {
  products: ProductOrg[];
}

// product detail page props
export interface ProductDetailsProps {
  product: {
    id: number;
    title: string;
    description: string;
    thumbnail?: string;
    rating: number;
    price: number;
    category: string;
    minimumOrderQuantity: number;
  };
}
export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}
export interface ProductReviewsProps {
  reviews: ProductReview[];
}
export interface ProductInformationProps {
  product: {
    brand: string;
    category: string;
    tags: string[];
    availabilityStatus: string;
    stock: number;
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    minimumOrderQuantity: number;
  };
}
export interface ProductImagesProps {
  product: {
    thumbnail: string;
    images: string[];
  };
}
