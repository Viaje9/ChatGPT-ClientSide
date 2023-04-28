import { ChatUser } from "../../../enum/chat-user.enum";
import { ChatActionType } from "./Chat.enum";

export type ActionMap<M extends { [index: string]: ChatPayloadContent }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ChatPayload = {
  [ChatActionType.ADD_MESSAGE]: RecordInfo;
  [ChatActionType.SET_CURRENT_TEXT]: CurrentText;
  [ChatActionType.REMOVE_RECORD]: never
};

export type ChatPayloadContent = RecordInfo | CurrentText

export type ChatActions = ActionMap<ChatPayload>[keyof ActionMap<ChatPayload>];

export type AddMessageAction = ActionMap<ChatPayload>[ChatActionType.ADD_MESSAGE]
export type SetCurrentTextAction = ActionMap<ChatPayload>[ChatActionType.SET_CURRENT_TEXT]
export type RemoveRecordAction = ActionMap<ChatPayload>[ChatActionType.REMOVE_RECORD]

export interface State {
  record: RecordInfo[];
  userCurrentInputText: string;
  chatResponseLoading: boolean;
  chatResponseError: boolean;
  showTool: boolean;
}

export interface RecordInfo {
  user: ChatUser;
  content: string;
}

export interface CurrentText {
  text: string;
}
