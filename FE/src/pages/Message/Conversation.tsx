import { useAppDispatch, useAppSelector } from "@/app/hook";
import ConversationItem from "@/pages/Message/components/ConversationItem";
import UserSelect from "@/pages/Message/components/UserSelect";
import { getConversations } from "@/slices/chatSlice";
import { FunctionComponent, useEffect } from "react";

interface ConversationProps { }

const Conversation: FunctionComponent<ConversationProps> = () => {
  const { conversations } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConversations(user?.employeeId ?? ""));
  }, [])




  return (
    <div id="conversation" className="w-[300px] border  overflow-y-auto h-[95%]">

      <UserSelect />
      {
        conversations.map((conversation) => (
          <ConversationItem
            key={conversation.conversationId}
            lastMessage={conversation.lastMessage}
            receiverId={conversation.members.find((member) => member !== user?.employeeId) || ""}
            conversationId={conversation.conversationId}
          />
        ))
      }


    </div>
  );
};

export default Conversation;
