import DefaultAvatar from "@/components/DefaultAvatar/DefaultAvatar";
import { FC } from "react";

interface MesssageItemProps {
  senderId?: string;
  recieveId?: string;
  text: string;
  isSender: boolean;
}

const MesssageItem: FC<MesssageItemProps> = ({ text, isSender }) => {
  return (
    <div
      className={`message_item_wp flex mb-2 ${isSender ? "flex-row-reverse" : ""}`}
    >
      <div className={`message_item flex gap-3 bg-white}`}>
        {!isSender && <DefaultAvatar />}
        <div className={`infor max-w-48 min-w-0 border p-2  rounded-xl ${isSender ? "bg-blue-100 text-black" : ""}`}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default MesssageItem;
