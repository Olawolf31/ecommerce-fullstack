import React from "react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { useEffect } from "react";
import Products from "./../../components/Content/Products";
import Spinner from "components/Spinner";
import { fetchProducts } from "../../features/ProductSlice";
import CategorySideBar from "components/Content/CategorySideBar";
import { ProductType } from "../../@types/ProductType";
import { useState } from "react";

type Props = {};

const Women = (props: Props) => {
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //sort products
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);

  //get products by category
  const womenProducts: ProductType[] = products.filter(
    (product) => product.category.slug === "women"
  );

  const handleSortChange = (sortBy: string) => {
    let sortedArray = [...womenProducts];

    if (sortBy === "Title, ASC") {
      sortedArray.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Title, DESC") {
      sortedArray.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "Price, ASC") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price, DESC") {
      sortedArray.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sortedArray);
  };

  //price range
  const [priceFrom, setPriceFrom] = useState<number>(0);
  const [priceTo, setPriceTo] = useState<number>(0);

  const handlePriceFilterChange = (from: number, to: number) => {
    // Filter products based on price range
    const filteredProducts = womenProducts.filter(
      (product) => product.price >= from && product.price <= to
    );

    setSortedProducts(filteredProducts);
    setPriceFrom(from);
    setPriceTo(to);
  };

  if (!womenProducts) {
    return <Spinner />;
  }

  return (
    <section className="py-40">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center justify-center gap-1 text-sm text-gray-600">
          <li>
            <button className="block transition hover:text-gray-700">
              <span className="sr-only"> Home </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </li>

          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>

          <li>
            <button className="block transition hover:text-gray-700">
              Women Clothing
            </button>
          </li>
        </ol>
      </nav>

      <div className="px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Women Collection
          </h2>

          <p className="max-w-md mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
            <CategorySideBar
              onSortChange={handleSortChange}
              onPriceFilterChange={handlePriceFilterChange}
            />

            <div className="lg:col-span-3">
              {priceFrom > 0 && priceTo > 0 && (
                <div className="mb-4">
                  <p className="text-gray-600">
                    Price Range: ${priceFrom} - ${priceTo}
                  </p>
                </div>
              )}
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedProducts.length > 0
                  ? sortedProducts.map((product) => (
                      <Products key={product._id} product={product} />
                    ))
                  : womenProducts.map((product) => (
                      <Products key={product._id} product={product} />
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Women;
