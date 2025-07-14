import { FC } from "react";
import { NavLink } from "react-router-dom";
interface MenuItemProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const MenuItem: FC<MenuItemProps> = ({ label, path, icon }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `menu_item min-h-[53px] flex items-center pl-4 gap-3 rounded-md hover:bg-gray-100 ${
          isActive ? "active" : ""
        }`
      }
      to={path}
    >
      {icon}
      <span> {label}</span>
    </NavLink>
  );
};

export default MenuItem;
