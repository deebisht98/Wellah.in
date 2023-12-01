export type simplifiedProduct = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  categories: string[];
  slug: string;
};

export type fullProduct = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  categories: string[];
  slug: string;
  description: string;
  price_id: string;
};
