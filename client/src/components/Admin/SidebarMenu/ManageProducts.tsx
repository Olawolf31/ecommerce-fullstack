import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "services/ProductService";
import { categoryService } from "services/CategoryService";
import { useState, useEffect } from "react";
import {
  Products,
  ProductType,
  CategoryType,
} from "../../../@types/ProductType";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const ManageProducts = () => {
  const [products, setProducts] = useState<Products | undefined>();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [openPopup, setOpenPopup] = useState(false);

  //product data state
  const [productData, setProductData] = useState<ProductType>({
    _id: "",
    title: "",
    slug: "",
    description: "",
    price: 0,
    category: {} as CategoryType,
    stock: 0,
    image: "",
    sold: 0,
  });

  //fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await categoryService();
      setCategories(response.payload);
    };
    fetchCategories();
  }, []);

  //fetch all products
  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //controlled input change handler for product
  const handleProductDataChange = (event: any) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      const categoryValue = checked ? value : "";
      setProductData((prev) => ({
        ...prev,
        category: {
          ...prev.category,
          [name]: categoryValue,
        },
      }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  //controlled input for media
  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    setProductData((prev) => ({ ...prev, [name]: files![0] }));
  };

  //open create a product popup
  const openCreatePopup = () => {
    setOpenPopup(true);
  };

  //close popup
  const closeUpdatePopup = () => {
    setOpenPopup(false);
    setSelectedProduct(null);
    setProductData({
      _id: "",
      title: "",
      slug: "",
      description: "",
      price: 0,
      category: {} as CategoryType,
      stock: 0,
      image: "",
      sold: 0,
    });
  };

  //Add product
  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price.toString());
      formData.append("category", productData.category._id);
      formData.append("stock", productData.stock.toString());
      formData.append("image", productData.image);
      formData.append("sold", productData.sold.toString());
  
      const response = await createProduct(formData);

    /*   if (response && response.status === "error") {
        toast(response.message, { type: "error" });
      } else {
        toast.success(response.message);
      } */
      toast(response.message, { type: "success" });
      fetchProducts();
      closeUpdatePopup();
    } catch (error: any) {
      toast(error.message, { type: "error" });
      console.log(error);
    }
  };

  //delete product
  const handleDeleteProduct = async (slug: string) => {
    const response = await deleteProduct(slug);
    toast(response.message, { type: "success" });
    fetchProducts();
  };

  //open update popup
  const openEditPopup = (product: ProductType) => {
    setSelectedProduct(product);
    setOpenPopup(true);
    setProductData({
      _id: product._id,
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      sold: product.sold,
    });
  };

  //edit product
  const handleEditProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("price", productData.price.toString());
    formData.append("category", productData.category._id);
    formData.append("stock", productData.stock.toString());
    formData.append("image", productData.image);
    formData.append("sold", productData.sold.toString());

    const response = await updateProduct(productData.slug, formData);
    toast(response.message, { type: "success" });
    fetchProducts();
    closeUpdatePopup();
  };

  return (
    <div className="flex-grow text-gray-800">
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="sm:mr-6 mb-6 sm:mb-0">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Manage Products</h2>
          </div>
          <div className="flex flex-wrap items-start justify-end">
            <button
              onClick={openCreatePopup}
              className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create New Product
            </button>
          </div>
        </div>
      </main>

      {/* Create Product POPUP starts here */}

      {openPopup && (
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative rounded-xl shadow-lg  bg-white ">
            <div className="p-5 flex-auto justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <h2 className="text-xl font-bold py-4 ">
                Create New Product Category
              </h2>

              <form onSubmit={handleAddProduct}>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Title"
                  type="text"
                  name="title"
                  onChange={handleProductDataChange}
                  value={productData.title}
                />
                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm mt-2"
                  placeholder="Description"
                  name="description"
                  onChange={handleProductDataChange}
                  value={productData.description}
                />

                <div className="mt-4">Price:</div>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleProductDataChange}
                  value={productData.price}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">No of Stock</div>
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  onChange={handleProductDataChange}
                  value={productData.stock}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">No of Sold Items</div>
                <input
                  type="number"
                  placeholder="Sold"
                  name="sold"
                  onChange={handleProductDataChange}
                  value={productData.sold}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">Image</div>
                <input
                  type="file"
                  name="image"
                  onChange={handleMediaChange}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">Categories</div>

                {categories &&
                  categories.map((category) => (
                    <>
                      <span className="mr-2">{category.name}</span>
                      <input
                        type="checkbox"
                        name="_id"
                        value={category._id}
                        onChange={handleProductDataChange}
                        className="mr-2"
                      />
                    </>
                  ))}

                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    onClick={closeUpdatePopup}
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                    Create New
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Create Product POPUP ends here*/}

      {/* Edit Product POPUP starts here */}

      {openPopup && selectedProduct && (
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative rounded-xl shadow-lg  bg-white ">
            <div className="p-5 flex-auto justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>

              <h2 className="text-xl font-bold py-4 ">Edit Product Category</h2>

              <form onSubmit={handleEditProduct}>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Title"
                  type="text"
                  name="title"
                  onChange={handleProductDataChange}
                  value={productData.title}
                />
                <textarea
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm mt-2"
                  placeholder="Description"
                  name="description"
                  onChange={handleProductDataChange}
                  value={productData.description}
                />

                <div className="mt-4">Price:</div>
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleProductDataChange}
                  value={productData.price}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">No of Stock</div>
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  onChange={handleProductDataChange}
                  value={productData.stock}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">No of Sold Items</div>
                <input
                  type="number"
                  placeholder="Sold"
                  name="sold"
                  onChange={handleProductDataChange}
                  value={productData.sold}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">Image</div>
                <input
                  type="file"
                  name="image"
                  onChange={handleMediaChange}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />
                <div className="mt-4">Categories</div>

                {categories &&
                  categories.map((category) => (
                    <>
                      <span className="mr-2">{category.name}</span>
                      <input
                        type="checkbox"
                        name="_id"
                        value={category._id}
                        onChange={handleProductDataChange}
                        className="mr-2"
                      />
                    </>
                  ))}

                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    onClick={closeUpdatePopup}
                    className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Edit Product POPUP ends here*/}

      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div className="bg-white shadow-md rounded my-6">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Title</th>
                      <th className="py-3 px-6 text-left">Description</th>
                      <th className="py-3 px-6 text-center">Category</th>
                      <th className="py-3 px-6 text-center">Stock</th>
                      <th className="py-3 px-6 text-center">Sold</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {products &&
                      products.payload.map((product) => {
                        return (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={product._id}
                          >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {product.title}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span>{product.description.slice(0, 50)}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{product.category.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{product.stock}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{product.sold}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <Link
                                    to={`/product/${product.slug}`}
                                    target="_blank"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      />
                                    </svg>
                                  </Link>
                                </div>
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => {
                                      openEditPopup(product);
                                    }}
                                    cursor={"pointer"}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </div>
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => {
                                      handleDeleteProduct(product.slug);
                                    }}
                                    cursor={"pointer"}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
