import { persistEmployeeAuth } from "@/apis/employeeAPIs";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as employeesAPIs from "@/apis/employeeAPIs";
// Define a type for the slice state

interface EmployeeI {
  accessToken: string;
  username: string;
  phoneNumber: string;
  password: string;
  status: boolean;
  role: string;
  accessCode?: number;
  createdAt?: Date;
  updatedAt?: Date;
  department?: string;
  employeeId?: string;
  name: string;
}

export interface EmployeeStoreI {
  loading: boolean;
  error: string;
  pagination?: {
    offset: number;
    limit: number;
    page: number;
  };

  data: EmployeeI[];
}

// Define the initial state using that type
const initialState: EmployeeStoreI = {
  error: "",
  loading: false,
  data: [],
};

export const createEmployee = createAsyncThunk<any, any>(
  "employee/createEmployee",
  async (data: any, thunkApi) => {
    try {
      const res = await employeesAPIs.persistEmployee(data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getEmployees = createAsyncThunk(
  "employee/getEmployee",
  async (_, thunkApi) => {
    try {
      const res = await employeesAPIs.getEmployees();
      return res.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk<any, string>(
  "employee/deleteEmployee",
  async (employeeId, thunkApi) => {
    try {
      await employeesAPIs.deleteEmployee(employeeId);
      return employeeId;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk<any, any>(
  "employee/updateEmployee",
  async ({ employeeId, data }, thunkApi) => {
    try {
      const res = await employeesAPIs.updateEmployee(employeeId, data);
      return res.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        const res = action.payload;
        state.loading = false;
        if (res.success) {
          state.data.unshift(res.data);
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        const employeeId = action.payload;
        state.data = state.data.filter((item) => item.employeeId != employeeId);
        toast.success("Delete employee succses !");
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          toast.success(action.payload.message);
          const newEmployeeId = action.payload.data.employeeId;
          state.data = state.data.map((item) => {
            if (item.employeeId == newEmployeeId) return action.payload.data;
            return item;
          });
        }
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
