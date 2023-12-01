"use client";

import { Button } from "./ui/button";
import { useShoppingCart } from "use-shopping-cart";

const CheckoutNow = ({ price_id }: { price_id: string }) => {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow() {
    checkoutSingleItem(price_id);
  }

  return (
    <Button onClick={buyNow} variant={"outline"}>
      Checkout Now
    </Button>
  );
};

export default CheckoutNow;
