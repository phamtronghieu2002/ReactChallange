import userSlice from "@/slices/userSlice";
import employeeSlice from "@/slices/employeeSlice"
import chatSlice from "@/slices/chatSlice";
import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "@/slices/taskSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    employee: employeeSlice,
    chat: chatSlice,
    task: taskSlice
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
