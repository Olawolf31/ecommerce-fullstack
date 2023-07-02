import { Routes, Route } from "react-router-dom";
import Header from "layouts/header/Header";
import Footer from "layouts/footer/Footer";
import Home from "../pages/Home";
import Login from "../pages/user/LoginPage";
import Register from "../pages/user/RegisterPage";
import ProfilePage from "pages/user/ProfilePage";
import ActivateUser from "pages/user/ActivateUser";
import ForgotPassword from "components/User/ForgotPassword";
import ResetPassword from "components/User/ResetPassword";
import ProtectUser from "./ProtectUser";
import ProtectAdmin from "./ProtectAdmin";
import SingleProductPage from "pages/products/SingleProductPage";
import CartPage from "pages/cart/CartPage";
import Dashboard from "pages/admin/Dashboard";
import Error from "pages/Error";
import Women from "pages/Category/Women";
import Men from "pages/Category/Men";
import Accessories from "pages/Category/Accessories";

const Index = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:token" element={<ActivateUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/product/:slug" element={<SingleProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Error />} />
        <Route element={<ProtectUser />}>
          <Route path="/my-account" element={<ProfilePage />} />
        </Route>

        <Route element={<ProtectAdmin />}>
          <Route path="/admin-dashboard" element={<Dashboard />} />
        </Route>

        {/* categories*/}
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/accessories" element={<Accessories />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Index;
