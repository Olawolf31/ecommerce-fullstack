import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { useEffect } from "react";
import { fetchProducts } from "features/ProductSlice";
import Products from "./Products";
import Spinner from "components/Spinner";

type Props = {};

const ProductList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          <p className="max-w-md mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductList;
