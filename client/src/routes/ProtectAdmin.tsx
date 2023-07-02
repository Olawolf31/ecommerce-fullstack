import React, { useEffect, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { Outlet } from "react-router-dom";
import Error from "pages/Error";
import useFetchUserProfile from "Hooks/useFetchUserProfile";
import Spinner from "components/Spinner";

type Props = {};

const ProtectAdmin = (props: Props) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user, isLoading } = useFetchUserProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isLoading) {
      // Add a 500ms delay before setting the loading state to false
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading]);

  if (loading) {
    return <Spinner />;
  }

  return isLoggedIn && user.isAdmin ? <Outlet /> : <Error />;
};

export default ProtectAdmin;
