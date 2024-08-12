import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newtask: JSON.parse(localStorage.getItem("newtask")) || [],
  bookmarkedTasks: JSON.parse(localStorage.getItem("bookmarkedTasks")) || [],
  completedTasks: JSON.parse(localStorage.getItem("completedTasks")) || [],
  status: "idle",
  error: null,
};

const newtaskSlice = createSlice({
  name: "newtask",
  initialState,
  reducers: {
    addNewTask: (state, action) => {
      const { date, ...rest } = action.payload;
      const formattedDate = date;

      state.newtask.push({
        ...rest,
        date: formattedDate,
        key: state.newtask.length,
      });

      localStorage.setItem("newtask", JSON.stringify(state.newtask));
    },
    toggleBookmark: (state, action) => {
      const task = action.payload;

      const existingIndex = state.bookmarkedTasks.findIndex(
        (t) => t.key === task.key
      );

      if (existingIndex !== -1) {
        // Task already bookmarked, so remove it
        state.bookmarkedTasks.splice(existingIndex, 1);
      } else {
        // Task not bookmarked, so add it
        state.bookmarkedTasks.push(task);
      }

      localStorage.setItem(
        "bookmarkedTasks",
        JSON.stringify(state.bookmarkedTasks)
      );
    },
    toggleCompleted: (state, action) => {
      const task = action.payload;
      if (state.completedTasks.find((t) => t.key === task.key)) {
        // If the task is already completed, remove it
        state.completedTasks = state.completedTasks.filter((t) => t.key !== task.key);
      } else {
        // Otherwise, add it to completed tasks
        state.completedTasks.push(task);
      }
    },
    editTask: (state, action) => {
      const { key, updatedTask } = action.payload;
      const taskIndex = state.newtask.findIndex((task) => task.key === key);
      if (taskIndex !== -1) {
        state.newtask[taskIndex] = { ...state.newtask[taskIndex], ...updatedTask };
        localStorage.setItem("newtask", JSON.stringify(state.newtask));
      }
    },
    deleteTask: (state, action) => {
      const key = action.payload;
      state.newtask = state.newtask.filter((task) => task.key !== key);
      localStorage.setItem("newtask", JSON.stringify(state.newtask));
    },
  },
});

export const { addNewTask, toggleBookmark, toggleCompleted, editTask, deleteTask } = newtaskSlice.actions;

export default newtaskSlice.reducer;
