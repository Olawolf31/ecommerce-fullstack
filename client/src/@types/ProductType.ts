export type Products = {
  success: boolean;
  message: string;
  payload: ProductType[];
};

export type ProductType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: CategoryType;
  stock: number;
  image: string;
  sold: number;
};

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
