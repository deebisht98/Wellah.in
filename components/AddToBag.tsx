"use client";

import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";

export type ProductCart = {
  name: string;
  price: number;
  description: string;
  currency: string;
  image: string;
  price_id: string;
};

const AddToBag = ({
  name,
  price,
  description,
  currency,
  image,
  price_id,
}: ProductCart) => {
  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name,
    description,
    price,
    currency,
    image,
    price_id,
  };

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
    >
      Add To Cart
    </Button>
  );
};

export default AddToBag;
