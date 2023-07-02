import React from "react";
import { useState } from "react";
import { LoginType } from "../../@types/UserType";
import { ForgotUserPassword } from "features/UserSlice";
import { useAppDispatch } from "../../redux/hooks";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [resetData, setResetData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetData({
      ...resetData,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const action = await dispatch(ForgotUserPassword(resetData));
    const response = action.payload;
    if (response && response.status === "error") {
      toast.error(response.message);
    } else {
      toast.success(response.message);
    }

    setResetData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 mt-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Reset your password</p>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                name="email"
                value={resetData.email}
                onChange={handleChange}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              New Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter New password"
                name="password"
                value={resetData.password}
                onChange={handleChange}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
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
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Reset Password
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <a className="underline" href="/register">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
