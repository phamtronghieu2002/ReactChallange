import ChatBox from "@/pages/Message/components/ChatBox";
import MessageArea from "@/pages/Message/components/MessageArea";
import { FC, useRef } from "react";

interface ChatProps {}

const Chat: FC<ChatProps> = () => {

  const ref = useRef<HTMLDivElement>(null)



  return (
    <div id="chat" className="h-[95%] border flex-1 flex flex-col">
      <MessageArea   />
      <ChatBox  />
    </div>
  );
};

export default Chat;
