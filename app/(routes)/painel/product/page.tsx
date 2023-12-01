"use client";
import { Button } from "@/components/ui/button";
import { CreateProduct } from "./components/CreateProduct";
import { useProduct } from "./hooks/useProduct";

export default function Home() {
  const { products } = useProduct();

  return (
    <main>
      <CreateProduct />
      {products.map((product) => (
        <div key={product.uuid} className="flex gap-7">
          <p>{product.name}</p>
          <CreateProduct product={product} />
        </div>
      ))}
    </main>
  );
}
