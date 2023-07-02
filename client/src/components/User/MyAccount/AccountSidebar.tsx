import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setSelectedMenu } from "features/AuthSlice";
import { logoutUser } from "features/AuthSlice";
import useFetchUserProfile from "Hooks/useFetchUserProfile";
import { Link } from "react-router-dom";

const AccountSidebar = () => {
  const { selectedMenu } = useAppSelector((state) => state.auth);
  const { user } = useFetchUserProfile();

  const dispatch = useAppDispatch();

  const handleComponentClick = (title: string) => {
    dispatch(setSelectedMenu(title));
  };

  //handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <button
            onClick={() => handleComponentClick("general")}
            className={`flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 ${
              selectedMenu === "general" ? "font-medium" : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <span className="text-sm font-medium"> General </span>
          </button>

          <a
            href="/"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>

            <span className="text-sm font-medium"> Billing </span>
          </a>

          {user.isAdmin && (
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>

              <span className="text-sm font-medium"> Admin Dashboard </span>
            </Link>
          )}

          <nav aria-label="Account Nav" className="mt-2 flex flex-col">
            <button
              onClick={() => handleComponentClick("profile")}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
                selectedMenu === "profile" ? "font-medium" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 opacity-75"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                />
              </svg>

              <span className="text-sm font-medium"> Profile </span>
            </button>
          </nav>

          <button
            onClick={handleLogout}
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>

            <span className="text-sm font-medium"> Logout </span>
          </button>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-2 bg-white p-4 hover:bg-gray-50">
          {user && (
            <img
              alt="avatar"
              src={`${process.env.REACT_APP_API_URL}/public/images/users/${user.avatar}`}
              className="h-10 w-10 rounded-full object-cover"
            />
          )}

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{user.fullname}</strong>

              <span> {user.email} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
