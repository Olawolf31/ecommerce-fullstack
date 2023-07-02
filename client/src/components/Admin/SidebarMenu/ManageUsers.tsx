import useFetchUserProfile from "Hooks/useFetchUserProfile";
import { useEffect, useState, useCallback } from "react";
import {
  fetchAllUsersService,
  deleteUserByIdService,
  updateUserByIdService,
} from "../../../services/AdminService";
import { UserType } from "../../../@types/UserType";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const { accessToken } = useFetchUserProfile();

  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType | any>({
    fullname: "",
    email: "",
    password: "",
    avatar: "",
    isBanned: false,
    isAdmin: false,
  });

  const fetchAllUsers = useCallback(async () => {
    const response = await fetchAllUsersService(accessToken);
    console.log(response.payload);
    setAllUsers(response.payload);
  }, [accessToken]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  //delete user
  const handleDeleteUser = async (id: string) => {
    const response = await deleteUserByIdService(accessToken, id);
    if (response.success === true) {
      toast("User Deleted Successfully", { type: "success" });
      fetchAllUsers();
    }
  };

  //handle edit user change
  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const userValue = checked ? value : false;
      setUserData({ ...userData, [name]: userValue });
    } else {
      setUserData({ ...userData, [name]: value });
    }

    //setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  //handle edit user avatar change
  const handleEditUserAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserData({ ...userData, avatar: e.target.files![0] });
  };

  //open pop up
  const handleOpenPopup = (user: UserType) => {
    setSelectedUser(user);
    setOpenPopup(true);
    setUserData(user);
  };

  //close pop up
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  //update user
  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("fullname", userData.fullname);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", userData.avatar);
    formData.append("isBanned", userData.isBanned);
    formData.append("isAdmin", userData.isAdmin);

    const response = await updateUserByIdService(selectedUser?._id, accessToken, formData);

    if (response.success === true) {
      toast("User Updated Successfully", { type: "success" });
      fetchAllUsers();
      handleClosePopup()
    }
  };

  return (
    <div className="flex-grow text-gray-800">
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="sm:mr-6 mb-6 sm:mb-0">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Manage Users</h2>
          </div>
        </div>
      </main>

      {/* Edit User POPUP starts here */}

      {openPopup && selectedUser && (
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

              <h2 className="text-xl font-bold py-4 ">Edit User</h2>

              <form onSubmit={handleUpdateUser}>
                <input
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                  placeholder="Full Name"
                  type="text"
                  name="fullname"
                  onChange={handleEditUserChange}
                  value={userData.fullname}
                />
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm mt-2"
                  placeholder="Email"
                  name="description"
                  onChange={handleEditUserChange}
                  value={userData.email}
                />

                <input
                  type="text"
                  placeholder="*********"
                  name="password"
                  onChange={handleEditUserChange}
                  value={userData.password}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    onChange={handleEditUserChange}
                    checked={userData.isAdmin}
                    className="mr-2 rounded-lg border-gray-400 focus:ring-blue-500 h-4 w-4 text-blue-500"
                  />
                  <span className="text-sm">Make User Administrator</span>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isBanned"
                    onChange={handleEditUserChange}
                    checked={userData.isBanned}
                    className="mr-2 rounded-lg border-gray-400 focus:ring-blue-500 h-4 w-4 text-blue-500"
                  />
                  <span className="text-sm">Ban User</span>
                </div>

                <div className="mt-4">Image</div>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleEditUserAvatarChange}
                  className="w-full rounded-lg border border-gray-200 p-3"
                />

                <div className="p-3  mt-2 text-center space-x-4 md:block">
                  <button
                    onClick={handleClosePopup}
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
                      <th className="py-3 px-6 text-left">Full Name</th>
                      <th className="py-3 px-6 text-center">Email</th>
                      <th className="py-3 px-6 text-center">Avatar</th>
                      <th className="py-3 px-6 text-center">Admin</th>
                      <th className="py-3 px-6 text-center">isBanned</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {allUsers &&
                      allUsers.map((user) => {
                        return (
                          <tr
                            className="border-b border-gray-200 hover:bg-gray-100"
                            key={user._id}
                          >
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center">
                                <span>{user.fullname}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{user.email}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-left">
                              <div className="flex items-center justify-center">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={`${process.env.REACT_APP_API_URL}/public/images/users/${user.avatar}`}
                                  alt="avatar"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{user.isAdmin ? "Yes" : "No"}</span>
                              </div>
                            </td>
                            <td className="py-3 px-6 text-center">
                              <div className="flex items-center justify-center">
                                <span>{user.isBanned ? "Yes" : "No"}</span>
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
                                    onClick={() => {
                                      handleOpenPopup(user);
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
                                      handleDeleteUser(user._id);
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

export default ManageUsers;
