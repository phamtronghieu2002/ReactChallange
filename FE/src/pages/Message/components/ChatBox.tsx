import { useAppDispatch, useAppSelector } from "@/app/hook";
import { sendMessage } from "@/slices/chatSlice";
import { socket } from "@/socket";
import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";

interface ChatBoxProps {
 }

const ChatBox: FC<ChatBoxProps> = () => {


  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { conversationSelectId, receiverId } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.user);


  const handleSendMessage = async () => {

    const data = {
      conversationId: conversationSelectId,
      message: message,
      senderId: user?.employeeId,
      receiverId: receiverId,
    }
    const res = await dispatch(sendMessage(data))

    socket.emit("sendMessage", {
      conversationId: conversationSelectId,
      new_message: res.payload,
      senderId: user?.employeeId,
      receiverId: receiverId,
    })

    setMessage("");

  }





  return (
    <div
      style={{ borderTop: "1px solid #94a3b8" }}
      id="chatbox" className="h-[68px] p-2  flex items-center">
      <TextArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message !"
        onPressEnter={handleSendMessage}
        style={{
          resize: "none",
          height: "34px",
        }}
        className="!border-none !outline-none focus:border-none focus:outline-none focus:shadow-none"
      />
      <Button
        onClick={handleSendMessage}
        type="text"
      >
        <IoMdSend size={20} color="blue" />
      </Button>
    </div>
  );
};

export default ChatBox;
