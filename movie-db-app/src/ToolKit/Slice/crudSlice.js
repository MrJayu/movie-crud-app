import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      title: "title 1",
    },
  ],
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    add: (state, action) => {
      state.list = [...state.list, action.payload];
    },
    updateById: (state, action) => {
      let data = state.list;
      data.forEach((element) => {
        if (element.id === action.payload.id) {
          element.title = action.payload.title;
        }
      });
      state.list = data;
    },
    deleteById: (state, action) => {
      const updatedData = state.list.filter(
        (item) => item.id !== action.payload
      );
      state.list = updatedData;
    },
  },
});
export const { add, deleteById, updateById } = crudSlice.actions;

export default crudSlice.reducer;
