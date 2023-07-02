import React from "react";
import { ProductType } from "../../@types/ProductType";
import { Link } from "react-router-dom";

type Props = {
  product: ProductType;
};

const Products: React.FC<Props> = ({ product }) => {
  return (
    <>
      <li>
        <div className="block overflow-hidden group">
          <Link
            to={{
              pathname: `/product/${product.slug}`,
            }}
          >
            <img
              src={`${process.env.REACT_APP_API_URL}/public/images/products/${product.image}`}
              alt={product.title}
              className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
            />
          </Link>

          <div className="relative pt-3 bg-white">
            <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
              <Link to={`/product/${product.slug}`}>{product.title}</Link>
            </h3>

            <p className="mt-2">
              <span className="sr-only"> Regular Price </span>

              <span className="tracking-wider text-gray-900">
                £ {product.price}
              </span>
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

export default Products;
