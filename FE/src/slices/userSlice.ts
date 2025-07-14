import storage from "@/untils/_storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state

export interface UserI {
  isAuth: boolean;
  user: {
    name: string;
    employeeId: string;
    accessToken: string;
    username: string;
    phoneNumber: string;
    password: string;
    status: boolean;
    role: string;
    accessCode: number;
    createdAt: Date;
    updatedAt: Date;
    department?: string;
  } | null;
}

// Define the initial state using that type
const initialState: UserI = {
  isAuth: false,
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<UserI["user"]>) => {
      state.isAuth = true;
      state.user = action.payload;
      storage.set("accessToken", state?.user?.accessToken || "");
    },
    logout: (state) => {
      storage.remove("accessToken")
      window.location.reload()
    },
    updateProfile: (state, action: PayloadAction<UserI["user"]>) => {
      state.user = action.payload;
    },
  },
});

export const { setUserLogin, logout, updateProfile } = userSlice.actions;

export default userSlice.reducer;
