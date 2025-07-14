import MesssageItem from "@/pages/Message/components/MessageItem";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { socket } from "@/socket";
import { forwardRef, FunctionComponent, useEffect } from "react";
import { getMessages, setMessages } from "@/slices/chatSlice";

interface MessageAreaProps {

}

const MessageArea: FunctionComponent<MessageAreaProps> = forwardRef<HTMLDivElement, MessageAreaProps>(({ }, ref) => {
  const dispatch = useAppDispatch();
  const { messages, conversationSelectId } = useAppSelector((state) => state.chat)
  const { user } = useAppSelector((state) => state.user)







  useEffect(() => {
    const getMessageEvent = (data: any) => {
      dispatch(setMessages(data))
    }

    socket?.on("getMessages", getMessageEvent)
    return () => {
      socket.off("getMessages", getMessageEvent)
    }

  }, [conversationSelectId])

  useEffect(() => {

    if (conversationSelectId) {
      dispatch(getMessages(conversationSelectId))
    }
  }, [conversationSelectId])


  return (
    <div id="message_area" ref={ref} className="flex-1 overflow-y-auto p-3 bg-gray-50">
      {
        messages.map((message) => (
          <MesssageItem key={message.messageId} text={message.message} isSender={message.senderId === user?.employeeId} />
        ))
      }

    </div>
  );
})
export default MessageArea;
