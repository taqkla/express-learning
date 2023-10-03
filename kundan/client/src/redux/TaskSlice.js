import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    task: {}
}

const taskSlice = createSlice({
    name: 'taskslice',
    initialState,
    reducers: {
        setTasks: (state , action) => {
            state.tasks = [...action.payload]
        },
        setTask: (state , action) => {
            state.task = action.payload
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter((task) => task._id !== taskId);
          },
    }
})

export const {setTasks , setTask, deleteTask} = taskSlice.actions

export default taskSlice.reducer