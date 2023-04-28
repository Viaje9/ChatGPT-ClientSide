import { createContext, useCallback, useContext, useEffect, useReducer, useState } from "react";
import { ChatActions, State } from "./Chat.model";
import PropTypes from "prop-types";
import { ChatActionType } from "./Chat.enum";

const initialState: State = {
  record: JSON.parse(localStorage.getItem("record") || "[]") || [],
  userCurrentInputText: "",
  chatResponseLoading: false,
  chatResponseError: false,
  showTool: false,
};

function ChatReducer(state: State, action: ChatActions): State {
  if (action.type === ChatActionType.ADD_MESSAGE) {
    const record = [...state.record, action.payload];
    localStorage.setItem("record", JSON.stringify(record));
    return { ...state, record };
  }

  if (action.type === ChatActionType.SET_CURRENT_TEXT) {
    return { ...state, userCurrentInputText: action.payload.text };
  }

  if (action.type === ChatActionType.REMOVE_RECORD) {
    localStorage.setItem("record", JSON.stringify([]));
    return { ...state, record: [] };
  }

  return state;
}

const ChatContext = createContext<{
  state: State
  getState: () => State;
  dispatch: React.Dispatch<ChatActions>;
}>({
  state: initialState,
  getState: () => initialState,
  dispatch: () => initialState,
});

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(ChatReducer, initialState);
  const [scopeState, setScopeState] = useState(() => initialState)
  useEffect(() => {
    setScopeState(state)
  }, [state])
  // console.log(state);
  
  const getState = () => scopeState

  return (
    <ChatContext.Provider value={{ state: scopeState, getState, dispatch }}>{children}</ChatContext.Provider>
  );
};

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const useSelector = (callback: (state: State) => void) => {
  const state = { ...useChatContext().state };
  return callback ? callback(state) : state;
};

interface ChatProviderProps {
  children: React.ReactNode;
}
