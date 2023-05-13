import { createAction } from "@reduxjs/toolkit";

export const addMessage = createAction('chat/addMessage', (info) => {
  return {
    payload: info
  }
})

export const setCurrentText = createAction('chat/setCurrentText', (text) => {
  return {
    payload: text
  }
})

export const removeRecord = createAction('chat/removeRecord')


