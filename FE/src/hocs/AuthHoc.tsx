import { useAppDispatch, useAppSelector } from "@/app/hook";
import Loading from "@/components/Loading/Loading";
import { FC, useEffect } from "react";
import { getProfile } from "@/apis/authAPIs";
import { setUserLogin } from "@/slices/userSlice";
import { socket } from "@/socket";
interface AuthHocProps {
  children: React.ReactNode;
}

const AuthHoc: FC<AuthHocProps> = ({ children }) => {

  const auth = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const _initApp = async () => {
    try {
      const res = await getProfile();
      const user = res.data.data;

      dispatch(setUserLogin(user));
    } catch (error) {
      console.log(error);

    }
  };

  useEffect(() => {
    _initApp();
     socket.connect();
    return () => {
      socket.disconnect();
    }
  }, []);

  if (!auth.isAuth) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthHoc;
