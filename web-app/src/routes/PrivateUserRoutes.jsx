import { Navigate, Outlet } from "react-router-dom";
import Storage from "../utils/storage";

const PrivateUserRoute = () => {
  const token = Storage.getData("token");
  const stage = Storage.getData("stage");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  if (stage === "Stage_AddUserDetails") {
    return <Navigate to="/register" />;
  }

  return <Outlet />;
};

export default PrivateUserRoute;
