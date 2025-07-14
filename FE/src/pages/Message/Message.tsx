import { useAppSelector } from "@/app/hook";
import Chat from "@/pages/Message/Chat";
import Conversation from "@/pages/Message/Conversation";
import EmptyChat from "@/pages/Message/components/EmptyChat";
import { FC } from "react";

interface MessageProps { }

const Message: FC<MessageProps> = () => {


  const { conversationSelectId } = useAppSelector((state) => state.chat);


  return (
    <div className="flex gap-10  overflow-hidden flex-1">
      <Conversation />
      {
        conversationSelectId ?

          <Chat />
          :
          <EmptyChat />
      }

    </div>
  );
};

export default Message;
