import { useAppSelector } from "@/app/hook";
import AuthHoc from "@/hocs/AuthHoc";
import Header from "@/layouts/components/Header";
import Sidebar from "@/layouts/components/Sidebar";
import CollapseProvider from "@/providers/CollapseProvider";
import { socket } from "@/socket";
import { FC, ReactNode, useEffect } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {


  const { user } = useAppSelector((state) => state.user);




  useEffect(() => {

    const userId = user?.employeeId

    if (userId) {

      socket.emit("addUser", userId)
    }
    return () => {
      socket.off("addUser")
    }

  }, [user?.employeeId])
  return (
    <AuthHoc>
      <CollapseProvider>
        <div className="main_wrapper h-screen flex">
          <Sidebar />
          <main className="flex-1 flex flex-col gap-10">
            <Header />
            <div className="flex-1 overflow-y-auto p-4 flex flex-col">{children}</div>
          </main>
        </div>
      </CollapseProvider>
    </AuthHoc>

  );
};

export default MainLayout;
