import AuthForm, { FooterTitleWrapper } from "@/components/AuthForm/AuthForm";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as authAPIs from "@/apis/authAPIs";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/slices/userSlice";
import routes from "@/configs/routes";

interface LoginPasswordProps { }

const LoginPassword: FC<LoginPasswordProps> = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      setLoading(true);
      const fb = await authAPIs.loginPassword(data);
      const message = fb.data.message;
      if (fb.data.success) {
        toast.success(message);
        dispatch(setUserLogin(fb.data.data));
        navigate(routes.home);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log("====================================");
      console.log("error >>", error);
      console.log("====================================");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      loading={loading}
      fields={[
        {
          name: "username",
          type: "text",
          rules: [
            {
              required: true,
              message: "Please input your username",
            },
          ],
          placeholder: "Enter your username",
        },
        {
          name: "password",
          type: "password",
          rules: [
            {
              required: true,
              message: "Please input your password",
            },
          ],
          placeholder: "Enter your password",
        },
      ]}
      onSubmit={(data: any) => {
        handleLogin(data);
      }}
      headerTitle="Sign in"
      subHeaderTitle="Please enter your information to sign in"
      labelTitle="password authentication methods"
      footerTitle={
        <FooterTitleWrapper>
          <span>Don't having account ?</span>
          <Link to={routes.emailRegister}>Register</Link>
        </FooterTitleWrapper>
      }
    />
  );
};

export default LoginPassword;
