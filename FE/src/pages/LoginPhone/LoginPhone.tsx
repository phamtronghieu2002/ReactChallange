import AuthForm, { FooterTitleWrapper } from "@/components/AuthForm/AuthForm";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthFormProps } from "@/components/AuthForm/AuthForm";
import * as authAPIs from "@/apis/authAPIs";
import { toast } from "react-toastify";
import { getPhoneNumber } from "@/untils/data";
import { useDispatch } from "react-redux";
import { setUserLogin } from "@/slices/userSlice";
import routes from "@/configs/routes";
interface LoginPhoneProps { }

const LoginPhone: FC<LoginPhoneProps> = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");



  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGetAccessCode = async (phoneNumber: string) => {
    try {
      setLoading(true);
      await authAPIs.sendAccessCode(phoneNumber);
      toast.success("AcessCode is send !");
      setPhoneNumber(phoneNumber);
      setStep(1);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAccessCode = async (accessCode: string) => {
    try {
      setLoading(true);
      const res = await authAPIs.verifyAccessCode(phoneNumber, accessCode);
      if (res.data.success) {
        dispatch(setUserLogin(res.data.data));
        toast.success(res.data.message);
        navigate(routes.home);
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Some thing is wrong !");
    } finally {
      setLoading(false);
    }
  };

  const formStep: AuthFormProps[] = [
    {
      onSubmit: (data: any) => {
        handleGetAccessCode(getPhoneNumber(data.phoneNumber));
      },
      fields: [
        {
          name: "phoneNumber",
          type: "phone",
          rules: [
            {
              required: true,
              message: "Please input your phone number",
            },
          ],
          placeholder: "Enter your phone number",
        },
      ],
      headerTitle: "Sign in",
      subHeaderTitle: "Please enter your phone to sign in",
      buttonText: "Next",
      labelTitle: "passwordless authentication methods",
      footerTitle: (
        <></>
      ),
    },
    {
      fields: [
        {
          name: "accessCode",
          type: "otp",
          rules: [{ required: true, message: "Please input your access code" }],
          placeholder: "Enter your access code",
        },
      ],
      onBack: () => setStep(0),
      onSubmit: (data: any) => {
        const accessCode = data.accessCode;
        handleVerifyAccessCode(accessCode);
      },
      headerTitle: "Phone verification",
      subHeaderTitle: "Please enter your code that send \n to your sms",
      footerTitle: (
        <></>
      ),
    },
  ];

  return <AuthForm loading={loading} {...formStep[step]} />;
};

export default LoginPhone;
