import routes from "@/configs/routes";
import storage from "@/untils/_storage";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const navigation = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const tokenParams = params.get("token");
  if (tokenParams) {
    storage.set("accessToken", tokenParams);
    window.location.reload
  }
  const accessToken = storage.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      navigation(routes.home);
    }
  }, []);

  return accessToken ? (
    <> </>
  ) : (
    <div id="auth-layout" className="h-screen flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
