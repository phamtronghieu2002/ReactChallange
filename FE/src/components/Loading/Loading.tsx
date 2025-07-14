import { Spin } from "antd";
import { FC } from "react";

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
 
     <div className="h-screen flex justify-center items-center">
       <Spin />;
     </div>
  
  );
};

export default Loading;
