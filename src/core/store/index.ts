import { configureStore } from '@reduxjs/toolkit'
import { ChatReducer } from './chat/reducer'

export const store = configureStore({
  reducer: {
    chat: ChatReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: import.meta.env.DEV
})

export type RootState = ReturnType<typeof store.getState>;