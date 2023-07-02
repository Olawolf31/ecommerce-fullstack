import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiMenu4Fill } from "react-icons/ri";
import { CgShoppingBag } from "react-icons/cg";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { logoutUser } from "features/AuthSlice";

const Header = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { productCount } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
  };

  return (
    <nav className={` bg-white shadow fixed top-0 left-0 right-0 z-10 `}>
      <div className="container px-6 py-6 mx-auto md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <div>
            <NavLink
              to="/"
              className={`mt-6 text-2xl font-bold text-black sm:text-3xl md:text-4xl`}
            >
              Squid 🦑
            </NavLink>
          </div>

          {/* Mobile Hamburger Menu */}

          <div className="flex items-center justify-between px-4 py-2 lg:hidden md:hidden">
            <button
              type="button"
              className={`text-black-500 dark:text-black-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-black-400`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <RiMenu4Fill className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <div className="mr-2">
                <div className="flex justify-center relative">
                  <NavLink to="/cart">
                    <CgShoppingBag className="w-5 h-5 relative ml-3 text-black-700 transition-colors duration-300 transform dark:text-pink-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
                  </NavLink>
                  {productCount > 0 && (
                    <span className="absolute top-0 right-0 -mt-3 -mr-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {productCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`${
            isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
          } absolute inset-x-0 z-20 w-full px-6 pt-4 pb-16 transition-all duration-300 ease-in-out bg-white dark:bg-pink-100 md:mt-0 md:p-0 md:top-0 md:relative md:bg-transparent md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        >
          <div className="flex flex-col md:flex-row md:mx-6">
            <NavLink
              to="/women"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `my-2 ${
                  isActive ? "text-pink-700" : "text-black-200"
                } transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0`
              }
            >
              Women Clothing
            </NavLink>
            <NavLink
              to="/men"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `my-2 ${
                  isActive ? "text-pink-700" : "text-black-200"
                } transition-colors duration-300 transform  hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0`
              }
            >
              Men Clothing
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `my-2 ${
                  isActive ? "text-pink-700" : "text-black-200"
                } transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0`
              }
              to="/accessories"
              onClick={() => setIsOpen(false)}
            >
              Accessories
            </NavLink>

            {isLoggedIn && (
              <>
                <NavLink
                  className={({ isActive }) =>
                    `my-2 ${
                      isActive ? "text-pink-700" : "text-black-200"
                    } transition-colors duration-300 transform hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0`
                  }
                  to="/my-account"
                  onClick={() => setIsOpen(false)}
                >
                  My Account
                </NavLink>

                <NavLink
                  to="/register"
                  className="my-2 rounded-md bg-green-100 px-2 py-1.5 text-sm font-medium text-white-600 md:mx-4 md:my-0"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </>
            )}
          </div>

          {!isLoggedIn && (
            <div className="sm:my-4">
              <NavLink
                to="/login"
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                onClick={() => setIsOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-md bg-red-100 px-5 py-2.5 text-sm font-medium text-white-600 ml-4 mr-4"
                onClick={() => setIsOpen(false)}
              >
                Register
              </NavLink>
            </div>
          )}

          {!isOpen && (
            <div className="flex justify-center relative">
              <NavLink to="/cart">
                <CgShoppingBag className="w-5 h-5 relative text-black-700 transition-colors duration-300 transform dark:text-pink-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer" />
              </NavLink>
              {productCount > 0 && (
                <span className="absolute top-0 right-0 -mt-3 -mr-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {productCount}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
