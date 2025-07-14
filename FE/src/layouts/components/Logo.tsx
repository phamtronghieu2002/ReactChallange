import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = () => {
  return (
    <div className="logo w-[150px] h-[60px]  flex items-center justify-center">
      <img
        width={150}
        height={150}
        src="https://wp.logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark.png?dl"
        alt=""
      />
    </div>
  );
};

export default Logo;
