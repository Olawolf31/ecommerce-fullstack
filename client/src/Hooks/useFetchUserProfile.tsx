import { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { GetUserProfile } from "features/UserSlice";
import { logoutUser } from "features/AuthSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useFetchUserProfile = () => {
  const dispatch = useAppDispatch();
  const { accessToken, isLoading} = useAppSelector((state) => state.auth);
  const { singleUser} = useAppSelector((state) => state.user);


  const user = singleUser || "";

  const navigate = useNavigate() // for navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (accessToken) {
          const response = await dispatch(GetUserProfile(accessToken));
          if (response.payload.status === "error") {
            dispatch(logoutUser());
            navigate("/login")
            toast("Timeout Please Login again", { type: "error" });
          }
        }
      } catch (error) {
        // Handle error if necessary
      }
    };
    fetchUserProfile();
  }, [accessToken, dispatch, navigate]);

  return { user, isLoading, accessToken};
};




export default useFetchUserProfile;
