import AccountSidebar from "components/User/MyAccount/AccountSidebar";
import AccountBanner from "components/User/MyAccount/AccountBanner";
import { useAppSelector } from "redux/hooks";
import General from "components/User/MyAccount/SidebarMenu/General";
import EditProfile from "components/User/MyAccount/SidebarMenu/EditProfile";
import Spinner from "components/Spinner";

const ProfilePage = () => {
  const { selectedMenu } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.user);



  return (
    <>
      {isLoading && <Spinner />}
      <AccountBanner />

      <div className="flex">
        <AccountSidebar />
        <div className="flex-grow mt-8 pl-8">
          {selectedMenu === "general" && <General />}
          {selectedMenu === "profile" && <EditProfile />}
        </div>
      </div>
    
    </>
  );
};

export default ProfilePage;
