import React from "react";
import { useState, useEffect } from "react";
import {
  categoryService,
  deleteCategoryService,
  updateCategoryService,
  createCategoryService,
} from "services/CategoryService";

import { toast } from "react-toastify";

type Category = {
  success: boolean;
  message: string;
  payload: Payload[];
};

type Payload = {
  _id: string;
  name: string;
  slug: string;
};

const ManageCategories = () => {
  const [categories, setCategories] = useState<Category | undefined>();
  const [openPopup, setOpenPopup] = useState<Boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Payload | null>(
    null
  );
  const [categoryName, setCategoryName] = useState<string>("");

  const fetchCategories = async () => {
    const response = await categoryService();
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //open update popup
  const openUpdatePopup = (category: Payload) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setOpenPopup(true);
  };

  //close update popup
  const closeUpdatePopup = () => {
    setOpenPopup(false);
    setSelectedCategory(null);
    setCategoryName("");
  };

  //update category name Change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  //update category button handler
  const updateCategory = async () => {
    if (!selectedCategory) return;

    try {
      const response = await updateCategoryService(
        selectedCategory.slug,
        categoryName
      );
      toast.success(response.message);
      fetchCategories();

      closeUpdatePopup();
    } catch (error) {
      toast.error("Failed to update category.");
    }
  };

  //open create category popup
  const openCreatePopup = () => {
    setOpenPopup(true);
  };

  //Handle Create Category
  const handleCreateCategory = async () => {
    try {
      const response = await createCategoryService(categoryName);
      toast.success(response.message);
      fetchCategories();

      closeUpdatePopup();
    } catch (error) {
      toast.error("Failed to create category.");
    }
  };

  //delete category
  const deleteCategory = async (id: string) => {
    try {
      const response = await deleteCategoryService(id);
      toast.success(response.message);
      fetchCategories();

      /* setCategories((prevCategories) => {
        if (prevCategories && prevCategories.payload) {
          const updatedCategories = prevCategories.payload.filter(
            (category) => category._id !== id
          );

          return {
            ...prevCategories,
            payload: updatedCategories,
          };
        }
        return prevCategories;
      }); */
    } catch (error) {
      // Handle error if the deletion fails
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="flex-grow text-gray-800">
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="sm:mr-6 mb-6 sm:mb-0">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Manage Categories</h2>
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
              Create new Category
            </button>
          </div>
        </div>
      </main>

      {/* Create category POPUP starts here */}

      {openPopup && (
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
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

                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={handleNameChange}
                  value={categoryName}
                />
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={closeUpdatePopup}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCategory}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Create New
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create category POPUP ends here*/}

      {/* Edit category POPUP starts here */}

      {openPopup && selectedCategory && (
        <div
          className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
          id="modal-id"
        >
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
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
                  Update Product Category
                </h2>

                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={handleNameChange}
                  value={categoryName}
                />
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  onClick={closeUpdatePopup}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={updateCategory}
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit category POPUP ends here*/}

      <div className="overflow-x-auto">
        <div className="min-w-screen min-h-screen overflow-hidden">
          <div className="w-full overflow-x-auto">
            <div className="bg-white shadow-md rounded my-6">
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Name</th>
                      <th className="py-3 px-6 text-left">Slug</th>
                      <th className="py-3 px-6 text-center">ID</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {categories &&
                      categories.payload.map((category) => {
                        return (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={category._id}
                          >
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-medium">
                                  {category.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span>{category.slug}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{category._id}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex item-center justify-center">
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
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
                                </div>
                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => {
                                      openUpdatePopup(category);
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
                                    onClick={() =>
                                      deleteCategory(category.slug)
                                    }
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

export default ManageCategories;
