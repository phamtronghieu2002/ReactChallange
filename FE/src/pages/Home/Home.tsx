import { useAppSelector } from "@/app/hook";
import { Descriptions, DescriptionsProps } from "antd";
import { FC } from "react";

interface HomeProps { }

const Home: FC<HomeProps> = () => {

  const { user } = useAppSelector((state) => state.user);



  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'UserName',
      children: <p>{user?.name || user?.username}</p>,
    },
    {
      key: '2',
      label: 'Role',
      children: <p>{user?.role}</p>,
    }
  ];


  return (
    <div className="text-red-700 pl-4 pr-4">
      <h1 className="text-4xl font-bold mb-10">Welcome to react test</h1>
      <Descriptions title="User Info" items={items} />



    </div>
  );
};

export default Home;
