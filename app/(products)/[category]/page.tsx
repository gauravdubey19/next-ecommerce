import ProductCategory from "@/components/ProductCategory";
import { ProductDetailPageProps } from "@/lib/types";

export default function ProductCategoryPage({
  params,
}: ProductDetailPageProps) {
  return <ProductCategory page={true} category={params.category} />;
}
