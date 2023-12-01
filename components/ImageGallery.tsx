"use client";

import Image from "next/image";
import React, { useState } from "react";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  const handlePreview = (image: string) => {
    setActiveImage(image);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image, index) => (
          <div
            className="overflow-hidden rounded-lg bg-gray-100"
            key={`image/${index}`}
          >
            <Image
              src={image}
              alt={`product_image_${index}`}
              height={200}
              className="h-full w-full object-cover object-center cursor-pointer"
              width={200}
              priority
              onClick={() => handlePreview(image)}
            />
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        <Image
          src={activeImage}
          alt={`product_image_preview`}
          height={500}
          className="h-full w-full object-cover object-center"
          width={500}
          priority
        />
        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
};

export default ImageGallery;
