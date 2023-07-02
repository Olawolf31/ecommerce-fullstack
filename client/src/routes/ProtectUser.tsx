import { Outlet } from "react-router-dom";
import LoginPage from "pages/user/LoginPage";
import { useAppSelector } from "redux/hooks";

const ProtectUser = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return isLoggedIn ? <Outlet /> : <LoginPage />;
};

export default ProtectUser;
