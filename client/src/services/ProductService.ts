import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/products`
  );
  return response.data;
};

export const getProductBySlug = async (slug: string | undefined) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/products/${slug}`
  );
  return response.data;
};

export const deleteProduct = async (slug: string | undefined) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BASE_URL}/products/${slug}`
  );
  return response.data;
};

export const createProduct = async (product: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/products`,
    product,
    config
  );
  return response.data;
};

export const updateProduct = async (
  slug: string | undefined,
  product: FormData
) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.put(
    `${process.env.REACT_APP_BASE_URL}/products/${slug}`,
    product,
    config
  );
  return response.data;
};
