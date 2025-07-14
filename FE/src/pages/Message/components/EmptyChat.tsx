import { FC } from "react"

interface EmptyChatProps {



}


const EmptyChat: FC<EmptyChatProps> = () => {
    return (
        <div className="flex-1 flex items-center justify-center">
            <h1 className="text-2xl font-bold">Select a conversation to start chatting</h1>
        </div>
    )
}

export default EmptyChat;