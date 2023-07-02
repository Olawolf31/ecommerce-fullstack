import React from "react";
import useFetchUserProfile from "../../../../Hooks/useFetchUserProfile";
import { EditUserProfile, DeleteUser } from "../../../../features/UserSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { RegisterType } from "../../../../@types/UserType";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user, accessToken } = useFetchUserProfile();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [updateProfileData, setUpdateProfileData] = useState<RegisterType>({
    fullname: "",
    email: "",
    password: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  //handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateProfileData({
      ...updateProfileData,
      [e.target.name]: e.target.value,
    });
  };

  //handle change avatar
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedAvatar(e.target.files[0]);
    }
  };

  //handle Update Profile
  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updateUser = new FormData();

      if (updateProfileData.fullname)
        updateUser.append("fullname", updateProfileData.fullname);
      if (updateProfileData.email)
        updateUser.append("email", updateProfileData.email);
      if (updateProfileData.password)
        updateUser.append("password", updateProfileData.password);
      if (selectedAvatar) updateUser.append("avatar", selectedAvatar);
      /* 
      for (const pair of updateUser.entries()) {
        console.log(pair[0], pair[1]);
      } */

      //dispatch
      const response = await dispatch(
        EditUserProfile({
          id: user._id,
          token: accessToken,
          user: updateUser,
        })
      );

      if (response.payload.status === "error") {
        toast.error(response.payload.message);
      } else {
        toast.success(response.payload.message);
      }

      setUpdateProfileData({
        fullname: "",
        email: "",
        password: "",
      });

      setSelectedAvatar(null);
    } catch (error) {
      console.log(error);
    }
  };

  //handle Delete Account
  const handleDeleteAccount = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        DeleteUser({ id: user._id, token: accessToken })
      );
      if (response.payload.status === "error") {
        toast.error(response.payload.message);
      } else {
        toast.success(response.payload.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold text-gray-700">
        Profile Information {user.fullname}
      </h3>

      <div className="mt-8">
        <div className="mt-4">
          <div className="p-6 bg-white rounded-md shadow-xl">
            <h2 className="text-lg font-semibold text-gray-700 capitalize">
              Account settings
            </h2>

            <form onSubmit={handleUpdateProfile}>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-black-700">Full Name</label>
                  <input
                    className="w-full mt-2 py-2 border border-green-800 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="text"
                    placeholder={user.fullname}
                    name="fullname"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-gray-700">Email Address</label>
                  <input
                    className="w-full mt-2 py-2 border border-green-800 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="email"
                    placeholder={user.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-gray-700">Password</label>
                  <input
                    className="w-full mt-2 py-2 border border-green-800 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="password"
                    placeholder="********"
                    name="password"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-gray-700">Avatar</label>
                  <input
                    className="w-full mt-2 py-2 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {user && (
                    <img
                      alt="avatar"
                      src={`${process.env.REACT_APP_API_URL}/public/images/users/${user.avatar}`}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-start mt-4">
                <button className="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                  Save Changes
                </button>
              </div>
            </form>
            <div className="flex justify-end mt-4">
              <button 
              onClick={handleDeleteAccount}
              className="px-4 py-2 text-gray-200 bg-red-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
