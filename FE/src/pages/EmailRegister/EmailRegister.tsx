import { sendAccessCodeEmail } from "@/apis/authAPIs";
import AuthForm, { FooterTitleWrapper } from "@/components/AuthForm/AuthForm";
import routes from "@/configs/routes";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
interface LoginEmailProps { }

const EmailRegister: FC<LoginEmailProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendCodeEmail = async (data: {
    email: string;
    department?: string;
    name?: string;
  }) => {
    const { email } = data;

    try {
      setLoading(true);
      const res = await sendAccessCodeEmail({ email });

      if (res.data.success) {
        toast(res.data.message);
      }
    } catch (error) {
      console.log("error >>", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      loading={loading}
      fields={[
        {
          name: "email",
          type: "text",
          rules: [
            {
              required: true,
              pattern: new RegExp(/\S+@\S+\.\S+/g),
              message: "Wrong format email!",
            },
          ],
          placeholder: "Enter your email",
        },
      ]}
      onSubmit={(data: { email: string }) => {

        handleSendCodeEmail(data);
      }}
      headerTitle="Sign in"
      subHeaderTitle="Please enter your email to sign in"
      buttonText="Next"
      labelTitle="passwordless authentication methods"
      footerTitle={
        <FooterTitleWrapper>
          <span>Having account ?</span>
          <Link to={routes.loginPassword}>Login</Link>
        </FooterTitleWrapper>
      }
    />
  );
};

export default EmailRegister;
