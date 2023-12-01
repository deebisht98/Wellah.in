import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const StripeErrorPage = () => {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <XCircle className="text-red-600 w-16 h-16 mx-auto my-6 animate-bounce" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {"Something went wrong...!"}
          </h3>
          <p className="my-2 text-gray-600">
            {
              "We're sorry for the inconvenience. Please try again after sometime."
            }
          </p>
          <Button asChild className="mt-5">
            <Link href="/">{"GO Back"}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StripeErrorPage;
