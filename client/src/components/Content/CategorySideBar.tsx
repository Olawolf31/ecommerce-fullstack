import React from "react";
import { useState } from "react";

type Props = {
  onSortChange: (sortBy: string) => void;
  onPriceFilterChange: (priceFrom: number, priceTo: number) => void;
};

const CategorySideBar = ({ onSortChange, onPriceFilterChange }: Props) => {
  const [sortBy, setSortBy] = useState("");
  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortBy = event.target.value;
    setSortBy(selectedSortBy);
    onSortChange(selectedSortBy);
  };

  const handlePriceFilterChange = () => {
    onPriceFilterChange(priceFrom, priceTo);
  };

  return (
    <section>
      <div className="hidden space-y-4 lg:block">
        <div>
          <label
            htmlFor="SortBy"
            className="block text-xs font-medium text-gray-700"
          >
            Sort By
          </label>

          <select
            id="SortBy"
            className="m-1 p-2 space-y-2 rounded border border-gray-300 text-sm"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option>Sort By</option>
            <option value="Title, DESC">Title, DESC</option>
            <option value="Title, ASC">Title, ASC</option>
            <option value="Price, DESC">Price, DESC</option>
            <option value="Price, ASC">Price, ASC</option>
          </select>
        </div>

        <div>
          <p className="block text-xs font-medium text-gray-700">Filters</p>

          <div className="mt-1 space-y-2">
            <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> Categories </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <span className="text-sm text-gray-700"> 0 Selected </span>

                  <button
                    type="button"
                    className="text-sm text-gray-900 underline underline-offset-4"
                  >
                    Reset
                  </button>
                </header>

                <ul className="space-y-1 border-t border-gray-200 p-4">
                  <li>
                    <label
                      htmlFor="FilterInStock"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterInStock"
                        className="h-5 w-5 rounded border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Women Clothing
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterPreOrder"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterPreOrder"
                        className="h-5 w-5 rounded border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Men Clothing
                      </span>
                    </label>
                  </li>

                  <li>
                    <label
                      htmlFor="FilterOutOfStock"
                      className="inline-flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        id="FilterOutOfStock"
                        className="h-5 w-5 rounded border-gray-300"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        Accessories
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
            </details>

            <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                <span className="text-sm font-medium"> Price </span>

                <span className="transition group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </summary>

              <div className="border-t border-gray-200 bg-white">
                <header className="flex items-center justify-between p-4">
                  <button
                    type="button"
                    onClick={() => setPriceTo(0)}
                    className="text-sm text-gray-900 underline underline-offset-4"
                  >
                    Reset
                  </button>
                </header>

                <div className="border-t border-gray-200 p-4">
                  <div className="flex justify-between gap-4">
                    <label
                      htmlFor="FilterPriceFrom"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">$</span>

                      <input
                        type="number"
                        id="FilterPriceFrom"
                        placeholder="From"
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        value={priceFrom}
                        onChange={(e) => setPriceFrom(parseInt(e.target.value))}
                      />
                    </label>

                    <label
                      htmlFor="FilterPriceTo"
                      className="flex items-center gap-2"
                    >
                      <span className="text-sm text-gray-600">$</span>

                      <input
                        type="number"
                        id="FilterPriceTo"
                        placeholder="To"
                        className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                        value={priceTo}
                        onChange={(e) => setPriceTo(parseInt(e.target.value))}
                      />
                    </label>
                    <button
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handlePriceFilterChange}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySideBar;
