import { Navigate, Outlet } from "react-router-dom";
import Storage from "../utils/storage";

const PrivateRegisterRoute = () => {
  const token = Storage.getData("token");
  const stage = Storage.getData("stage");

  if (
    !token ||
    stage === "Stage_AddUserDetails" ||
    stage === null ||
    stage === undefined
  ) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRegisterRoute;
