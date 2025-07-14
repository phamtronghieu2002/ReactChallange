import { getEmployee } from "@/apis/employeeAPIs";
import DefaultAvatar from "@/components/DefaultAvatar/DefaultAvatar";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { FC, useEffect, useState } from "react";
import { setConversationSelectId, setReceiverId } from "@/slices/chatSlice";

interface ConversationItemProps {
  lastMessage: string;
  conversationId: string;
  receiverId: string;
}

const ConversationItem: FC<ConversationItemProps> = ({
  lastMessage,
  receiverId,
  conversationId
}) => {

  const [friend, setFriend] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { conversationSelectId } = useAppSelector((state) => state.chat);



  const fetchFriend = async () => {

    try {
      const res = await getEmployee(receiverId);
      setFriend(res.data.data);
    } catch (error) {
      console.log("error", error);

    }
  }
  useEffect(() => {
    fetchFriend();
  }, [receiverId])

  useEffect(() => {
      if(conversationId==conversationSelectId){
        dispatch(setReceiverId(receiverId))
      }
  }, [])

  return (
    <div className={`converstation-item h-[80px]  flex gap-3 items-center p-3 hover:bg-gray-200 ${conversationSelectId === conversationId ? "bg-gray-200" : ""}`} onClick={() => {
      dispatch(setConversationSelectId(conversationId));
      dispatch(setReceiverId(receiverId));

    }}>

      <DefaultAvatar />
      <div className="infor flex flex-col">
        <p>{friend?.name || friend?.username}</p>
        <p className="text-gray-500">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ConversationItem;
