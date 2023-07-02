import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useAppDispatch } from "redux/hooks";
import { toast } from "react-toastify";
import { ResetUserPassword } from "features/UserSlice";
import { useNavigate } from "react-router-dom";



const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  //handle reset password
  /*   useEffect(() => {
    const resetPassword: () => Promise<void> = async () => {
      if (token) {
        const response = await dispatch(ResetUserPassword(token));
        if (response.payload.success === true) {
          toast(response.payload.message, { type: "success" });
          setInterval(() => {
            window.location.href = "/login";
          }, 3000); // 5 seconds
        } else if (response.payload.status === "error") {
          toast(response.payload.message, { type: "error" });
        }
      }
    };
    resetPassword();

    //cleanup
    return () => {
      //cleanup
    };
  }, [token, dispatch]); */

  const resetPasswordHandler: () => Promise<void> = useCallback(async () => {
    if (token) {
      const response = await dispatch(ResetUserPassword(token));
      if (response.payload.success === true) {
        toast(response.payload.message, { type: "success" });
        navigate("/login");
      } else if (response.payload.status === "error") {
        toast(response.payload.message, { type: "error" });
      }
    }
  }, [token, dispatch, navigate]);



  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Almost there!{" "}
            <strong className="font-extrabold text-red-700 sm:block">
              Reset your password
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              onClick={resetPasswordHandler}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
