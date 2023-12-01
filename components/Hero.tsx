import { client } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getData() {
  const query1 = "*[_type == 'heroImages'][0].image1.asset->url";
  const query2 = "*[_type == 'heroImages'][0].image2.asset->url";
  const data = await Promise.all([client.fetch(query1), client.fetch(query2)]);
  return data;
}

const Hero = async () => {
  const data = await getData();
  const image1Url = data ? data[0] : "";
  const image2Url = data ? data[1] : "";

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 md:mb-16 flex flex-wrap justify-between">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most and high quality products for you. We are the
            best so come and shop with us.
          </p>
        </div>
        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src={image1Url}
              alt="image1"
              height={500}
              width={500}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
          <div className="relative bg-gray-100 shadow-lg">
            <Image
              src={image2Url}
              alt="image2"
              height={500}
              width={500}
              className="h-full w-full object-cover object-center rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link
            href="/Men"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Men
          </Link>
          <Link
            href="/Women"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Women
          </Link>
          <Link
            href="/Teens"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Teens
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
