import { client } from "@/app/lib/sanity";
import { simplifiedProduct } from "@/app/types/productType";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData() {
  const query = `*[_type == 'product'][] | order(_createdAt desc) {
   _id,
   price,
   name,
   "slug": slug.current,
   "categories": category[]->name,
   "imageUrl": images[0].asset->url
  }`;
  const data = await client.fetch(query);
  return data;
}

const AllProducts = async () => {
  const data: simplifiedProduct[] = await getData();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tighter text-gray-900">
            Our Products
          </h2>
          <Button variant={"outline"} asChild>
            <Link href={"/"}>{"< Back"}</Link>
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <Link href={`product/${product.slug}`} key={product._id}>
              <div className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt={`Product_image_${product._id}`}
                    className="w-full h-full object-cover object-center lg:w-full lg:h-full"
                    height={300}
                    width={300}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.categories[0]}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
