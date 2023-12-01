import { client } from "@/app/lib/sanity";
import { fullProduct } from "@/app/types/productType";
import AddToBag from "@/components/AddToBag";
import CheckoutNow from "@/components/CheckoutNow";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import React from "react";

async function getData(slug: string) {
  const query = `*[_type == 'product' && slug.current == "${slug}"][0] {
   _id,
   "images" : images[].asset->url,
   price,
   name,
   "slug": slug.current,
   "categories": category[]->name,
   description,
   price_id
  }`;
  const data = await client.fetch(query);
  return data;
}

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg_white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="mb-2 md:mb-3">
            <span className="mb-2 inline-block text-gray-500">
              {data.categories.join(" | ")}
            </span>
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl mb-4">
              {data.name}
            </h2>

            <div className="mb-6 gap-3 flex items-center md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex gap-2 items-end">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ₹{data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ₹{data.price + 1030}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Incl. Vat plus Shipping
              </span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                currency="INR"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                price_id={data.price_id}
              />
              <CheckoutNow price_id={data.price_id} />
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
