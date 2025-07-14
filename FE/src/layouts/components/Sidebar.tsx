import { useAppSelector } from "@/app/hook";
import routes from "@/configs/routes";
import { ROLES } from "@/contants/Role";
import Logo from "@/layouts/components/Logo";
import MenuItem from "@/layouts/components/MenuItem";
import { CollapseContext } from "@/providers/CollapseProvider";
import { Button } from "antd";
import { FC, useContext } from "react";
import { FaUserFriends, FaTasks } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
interface SidebarProps { }

interface MenuI {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
}

const menus: MenuI[] = [
  {
    path: routes.manageEmployee,
    label: "Manage Employee",
    icon: <FaUserFriends />,
    roles: [ROLES.Admin],
  },
  {
    path: routes.manageTask,
    label: "Manage Task",
    icon: <FaTasks />,
    roles: [ROLES.Admin, ROLES.Employee],
  },
  {
    path: routes.message,
    label: "Message",
    icon: <FaRegMessage />,
    roles: [ROLES.Admin, ROLES.Employee],
  },
];

const getMenuByRole = (role: string) => {
  return menus.filter((menu: MenuI) => menu.roles.includes(role));
};

const Sidebar: FC<SidebarProps> = () => {
  const { user } = useAppSelector((state) => state.user);
  const { isCollapse, setIsCollapse } = useContext(CollapseContext)


  return (
    <aside className={`sidebar_wrapper  w-[280px]  p-4 flex flex-col gap-10 border  md:block ${isCollapse ? "collapsed" : ""}`}>
      <div className="closeButton flex justify-end md:hidden">
        <Button
          type="text"
          onClick={() => {
            console.log("clicked");
            setIsCollapse(false)

          }}
          icon={<IoMdClose size={25} />}
        />
      </div>
      <Logo />
      <div className="menus mt-10">
        {getMenuByRole(user?.role || ROLES.Admin).map((menu: MenuI, index: number) => (
          <MenuItem key={index} {...menu} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
