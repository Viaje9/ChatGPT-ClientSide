import { createReducer } from "@reduxjs/toolkit";
import { State } from "./model";
import { addMessage, removeRecord, setCurrentText } from "./action";


const initialState: State = {
  record: JSON.parse(localStorage.getItem("record") || "[]") || [],
  userCurrentInputText: "",
  chatResponseLoading: false,
  chatResponseError: false,
  showTool: false,
};


export const ChatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addMessage, (state, action) => {
      const { user, content } = action.payload;
      const newRecord = [...state.record, { user, content }];
      localStorage.setItem("record", JSON.stringify(newRecord));
      return {
        ...state,
        record: newRecord,
      };
    })
    .addCase(setCurrentText, (state, action) => {      
      return {
        ...state,
        userCurrentInputText: action.payload,
      };
    })
    .addCase(removeRecord, (state) => {
      localStorage.setItem("record", JSON.stringify([]));
      return { ...state, record: [] };
    })

    .addDefaultCase((state, action) => ({ ...state }))
})