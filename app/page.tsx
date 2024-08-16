import Hero from "@/components/Hero";
import ProductCategory from "@/components/ProductCategory";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <ProductCategory carousel={true} />
    </main>
  );
}
