import RightSideHeader from "@/layouts/components/RightSideHeader";
import CollapseProvider, { CollapseContext } from "@/providers/CollapseProvider";
import { Button } from "antd";
import { FC, useContext } from "react";
import { FaBars } from "react-icons/fa";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

  const { isCollapse, setIsCollapse } = useContext(CollapseContext)



  return (

    <header className="flex min-h-16  items-center justify-between border border-l-0 pl-5">

      <Button
        className=" md:invisible"
        onClick={() => setIsCollapse(true)}
        icon={<FaBars />} />


      <RightSideHeader />
    </header>
  );
};

export default Header;
