import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ItodolistState {
  data: {
    id: number;
    name: string;
    status: boolean;
  }[];
}

const initialState: ItodolistState = {
  data: [
    {
      id: 1,
      name: "Abduloh",
      status: false,
    },
    {
      id: 2,
      name: "Abubakr",
      status: true,
    },
  ],
};

export const todolistSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    check: (state, action) => {
      state.data = state.data.map((todo) =>
        todo.id === action.payload.id ? { ...todo, status: !todo.status } : todo
      );
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
    },
    editUser: (state, action) =>{
        state.data = state.data.map((todo)=>todo.id===action.payload.id?{...todo,name:action.payload.name,status:action.payload.status}:todo) 
    },
    addUser: (state, action)=> {
       state.data.push({id:Date.now(),name:action.payload.name, status:action.payload.status})
    }
  },
});

export const {addUser}= todolistSlice.actions
export const {editUser}= todolistSlice.actions
export const {deleteUser} = todolistSlice.actions
export const { check } = todolistSlice.actions;
export const selectTodolist = (state: RootState) => state.todolist.data;
export default todolistSlice.reducer;
