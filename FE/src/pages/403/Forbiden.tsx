import { FunctionComponent } from "react";

interface ForbidenProps {}

const Forbiden: FunctionComponent<ForbidenProps> = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="font-bold text-3xl">
        403 forbiden ,you can't not access this page
      </p>
    </div>
  );
};

export default Forbiden;
