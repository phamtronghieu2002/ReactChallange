import { FC } from "react";

interface DefaultAvatarProps {
  width?: number;
  height?: number;
}

const DefaultAvatar: FC<DefaultAvatarProps> = ({ width = 40, height = 40 }) => {
  return (
    <img
      className="rounded-full"
      width={width}
      height={height}
      src="https://cdn.vectorstock.com/i/500p/44/01/default-avatar-photo-placeholder-icon-grey-vector-38594401.jpg"
      alt=""
    />
  );
};

export default DefaultAvatar;
