import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as conversationAPIs from "@/apis/conversationAPIs";
import * as messageAPIs from "@/apis/messageAPIs";


interface MessageI {
  messageId: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ConversationI {
  conversationId: string,
  members: string[],
  lastMessage: string,
  isRead: boolean,
  createdAt: Date,
  updatedAt: Date,
}

export interface ChatStoreI {
  conversationSelectId: string,
  messages: MessageI[],
  conversations: ConversationI[],
  receiverId: string,


}

// Define the initial state using that type
const initialState: ChatStoreI = {
  conversationSelectId: "",
  messages: [],
  conversations: [],
  receiverId: "",
};

export const createConversation = createAsyncThunk<any, any>(
  "conversation/createConversation",
  async (data: any, thunkApi) => {
    try {
      const res = await conversationAPIs.createConversation(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getConversations = createAsyncThunk(
  "conversation/getConversations",
  async (employeeId: string, thunkApi) => {
    try {
      const res = await conversationAPIs.getConversation(employeeId);
      return res.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "conversation/sendMessage",
  async (data: any, thunkApi) => {
    try {
      const res = await messageAPIs.sendMessage(data);
      return res.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getMessages = createAsyncThunk(
  "conversation/getMessages",
  async (data: any, thunkApi) => {
    try {
      const res = await messageAPIs.getMessages(data);
      return res.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);






export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversationSelectId: (state, action: PayloadAction<string>) => {
      state.conversationSelectId = action.payload;
    },
    setReceiverId: (state, action: PayloadAction<string>) => {
      state.receiverId = action.payload;
    },
    setMessages: (state, action: PayloadAction<MessageI | any>) => {
      const conversationId = action.payload.conversationId;

      state.conversations = state.conversations.map((conversation) => {
        if (conversation.conversationId === conversationId) {
          conversation.lastMessage = action.payload.new_message.message;
        }
        return conversation;
      })
      state.messages.push(action.payload.new_message);
    },
  
  },
  extraReducers(builder) {
    builder

      .addCase(createConversation.fulfilled, (state, action) => {
        const res = action.payload;
        const data = res.data
        console.log("state.conversations >>>", state.conversations);

        const isExist = state.conversations?.find((conversation) => conversation.conversationId === data.conversationId)
        if (!isExist) {
          state.conversations.unshift(data)
        }

        state.conversationSelectId = data.conversationId;

      })
      .addCase(createConversation.rejected, (state, action) => {
        toast.error(action.payload as string);
      })


      .addCase(getConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
      })
      .addCase(getConversations.rejected, (state, action) => {
        toast.error(action.payload as string);
      })


      .addCase(sendMessage.fulfilled, (state, action) => {
        const data = action.payload;
        const conversationId = action.payload.conversationId;

        state.conversations = state.conversations.map((conversation) => {
          if (conversation.conversationId === conversationId) {
            conversation.lastMessage = action.payload.message;
          }
          return conversation;
        })
        state.messages.push(data);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        toast.error(action.payload as string);
      })

      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        toast.error(action.payload as string);
      })


  },
});

export const { setConversationSelectId, setReceiverId, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
