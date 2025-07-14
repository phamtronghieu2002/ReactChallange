import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import * as taskAPIs from "@/apis/taskAPIs";


interface TaskI {
    taskId: string,
    title: string,
    description: string,
    status: boolean,
    employeeId: string,
    createdAt: Date,
    updatedAt: Date,
}


export interface TaskStoreI {
    tasks: TaskI[],
    loading: boolean,
    error: string,
    statusLoading:boolean


}

// Define the initial state using that type
const initialState: TaskStoreI = {
    tasks: [],
    loading: false,
    error: "",
    statusLoading: false
};

export const createTask = createAsyncThunk<any, any>(
    "task/createTask",
    async (data: any, thunkApi) => {
        try {
            const res = await taskAPIs.createTask(data);
            return res.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const getAllTasks = createAsyncThunk(
    "task/getAllTasks",
    async (_, thunkApi) => {
        try {
            const res = await taskAPIs.getAllTasks();
            return res.data.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const getTaskByEmployeeId = createAsyncThunk(
    "task/getTaskByEmployeeId",
    async (employeeId: string, thunkApi) => {
        try {
            const res = await taskAPIs.getTaskByEmployeeId(employeeId);
            return res.data.data;
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message);
        }
    }
);

export const updateStatusTask = createAsyncThunk(
    "task/updateStatusTask",
    async (data: any, thunkApi) => {
        try {
            const res = await taskAPIs.updateStatusTask(data);
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

    },
    extraReducers(builder) {
        builder
            .addCase(createTask.pending, (state, action) => {
                state.loading = true

            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false
                const res = action.payload;
                const data = res.data

                state.tasks.unshift(data)



            })
            .addCase(createTask.rejected, (state, action) => {
                toast.error(action.payload as string);
            })

            .addCase(getAllTasks.pending, (state, action) => {
                state.loading = true

            })

            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                toast.error(action.payload as string);
            })

            .addCase(getTaskByEmployeeId.pending, (state, action) => {
                state.loading = true

            })
            .addCase(getTaskByEmployeeId.fulfilled, (state, action) => {
                state.loading = false
                state.tasks = action.payload;
            })
            .addCase(getTaskByEmployeeId.rejected, (state, action) => {
                toast.error(action.payload as string);
            })

            .addCase(updateStatusTask.pending, (state, action) => {
                state.statusLoading = true

            })
            .addCase(updateStatusTask.fulfilled, (state, action) => {
                state.statusLoading = false
                const data = action.payload;

                state.tasks =state.tasks.map((task)=>{

                        if(task.taskId === data.taskId){
                            return {
                                ...task,
                                status:data.status
                            }
                        }
                        return task

                })


            })
            .addCase(updateStatusTask.rejected, (state, action) => {
                toast.error(action.payload as string);
            })



    },
});


export default chatSlice.reducer;
