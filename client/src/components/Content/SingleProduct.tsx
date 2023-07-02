import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchProductBySlug } from "features/ProductSlice";
import { useEffect } from "react";
import { addToCart } from "features/CartSlice";
import { useState } from "react";
import Spinner from "components/Spinner";

type Props = {};

const SingleProduct = (props: Props) => {
  const { slug } = useParams<{ slug: string | undefined }>();

  const dispatch = useAppDispatch();

  const { singleProduct, isLoading } = useAppSelector((state) => state.product);

  const [quantity, setQuantity] = useState<number>(1);

  //handle quantity change
  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  //fetch single product
  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }

    //scroll to top
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);

    return () => clearTimeout(timeout);
  }, [slug, dispatch]);

  //if single product is not found
  if (!singleProduct) {
    return null;
  }

  //if loading is pending show spinner
  if (isLoading) {
    return <Spinner />;
  }

  // Dispatching the addToCart action
  const addToCartHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem = {
      singleProduct,
      qty: quantity,
    };
    dispatch(addToCart(newItem));
  };

  return (
    <section>
      <div className="relative mx-auto max-w-screen-xl px-4 py-44">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <img
              alt={singleProduct.title}
              src={`${process.env.REACT_APP_API_URL}/public/images/products/${singleProduct.image}`}
              className="aspect-square w-full rounded-xl object-contain"
            />
          </div>

          <div className="sticky top-0">
            <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
              Pre Order
            </strong>

            <div className="mt-8 flex justify-between">
              <div className="max-w-[35ch] space-y-2">
                <h1 className="text-xl font-bold sm:text-2xl">
                  {singleProduct.title}
                </h1>
              </div>

              <p className="text-lg font-bold">£ {singleProduct.price}</p>
            </div>

            <div className="mt-4">
              <div className="prose max-w-none">
                <p>{singleProduct.description}</p>
              </div>
            </div>

            <form className="mt-8" onSubmit={addToCartHandler}>
              <div className="mt-8 flex gap-4">
                <div>
                  <label htmlFor="quantity" className="sr-only">
                    Qty
                  </label>

                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantity}
                    className="w-12 rounded border border-green-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>

                <button
                  type="submit"
                  className="block rounded bg-teal-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
