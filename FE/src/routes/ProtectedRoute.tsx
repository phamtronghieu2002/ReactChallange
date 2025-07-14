import { useAppSelector } from "@/app/hook";
import routes from "@/configs/routes";
import { FunctionComponent, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  roles: string[];
  component: ReactNode;
}

const ProtectedRoute: FunctionComponent<PrivateRouteProps> = ({
  roles,
  component,
}) => {
  const auth = useAppSelector((state) => state.user);

  if (!roles.includes(auth?.user?.role ?? "")) {
    return <Navigate to={routes.forbiden} replace />;
  }
  return component;
};

export default ProtectedRoute;
