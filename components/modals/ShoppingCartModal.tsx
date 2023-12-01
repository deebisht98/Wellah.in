"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import { Button } from "../ui/button";

const ShoppingCartModal = () => {
  const {
    cartCount,
    handleCartClick,
    shouldDisplayCart,
    cartDetails,
    totalPrice,
    removeItem,
    decrementItem,
    incrementItem,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event?.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.error(result.error);
      }
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Sheet
      open={shouldDisplayCart}
      onOpenChange={() => handleCartClick()}
      defaultOpen
    >
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">
                  Hey, your cart doesn't look good empty. Add some products to
                  it.
                </h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={`${entry?.id}-item`} className="flex py-6">
                      <div className="flex-shrink-0 h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={entry.image as string}
                          alt={`image_${entry.id}`}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex text-base justify-between font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">₹{entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex gap-x-3 justify-center items-center mt-3">
                            <p className="text-gray-500">QTY:</p>
                            <button
                              className="bg-gray-100 w-6 h-6 rounded items-center"
                              onClick={() => decrementItem(entry.id)}
                            >
                              -
                            </button>
                            {entry.quantity}
                            <button
                              className="bg-gray-100 w-6 h-6 rounded items-center"
                              onClick={() => incrementItem(entry.id)}
                            >
                              +
                            </button>
                          </div>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-primary hover:text-primary/80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>₹{totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>
            <div className="mt-6">
              <Button className="w-full" onClick={handleCheckoutClick}>
                Checkout
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={handleCartClick}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
