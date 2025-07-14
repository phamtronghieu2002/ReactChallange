import AuthForm, { FooterTitleWrapper } from "@/components/AuthForm/AuthForm";
import routes from "@/configs/routes";
import { FC } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { register } from "@/apis/employeeAPIs";
import { toast } from "react-toastify";
interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const accessCode = searchParams.get("accessCode") || "";

  const handleRegister = async (data: any) => {
    const { username, password } = data;

    
    try {
      const res = await register({
        username,
        password,
        email,
        accessCode,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate(routes.loginPassword);
      } else {
        toast.error(res.data.message);
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };
  return (
    <AuthForm
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
        {
          name: "passwordConfirm",
          type: "password",
          rules: [
            {
              required: true,
              message: "Please input your password confirm",
            },
            ({ getFieldValue }: { getFieldValue: any }) => ({
              validator(_: any, value: any) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ],
          placeholder: "Enter your password confirm",
        },
      ]}
      onSubmit={(data: any) => {
        handleRegister(data);
      }}
      headerTitle="Register"
      subHeaderTitle="Please enter your information to register"
      footerTitle={
        <FooterTitleWrapper>
          <span>You Have exist account ?</span>
          <Link to={routes.loginPassword}>Login</Link>
        </FooterTitleWrapper>
      }
    />
  );
};

export default Register;
