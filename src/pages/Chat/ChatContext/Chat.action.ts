import { ChatActionType } from "./Chat.enum";
import { AddMessageAction, RecordInfo, RemoveRecordAction, SetCurrentTextAction } from "./Chat.model";

export function addMessage(info: RecordInfo): AddMessageAction {
  return {
    type: ChatActionType.ADD_MESSAGE,
    payload: info,
  };
}

export function setCurrentText(text: string): SetCurrentTextAction {
  return {
    type: ChatActionType.SET_CURRENT_TEXT,
    payload: {
      text,
    },
  };
}

export function removeRecord(): RemoveRecordAction {
  return {
    type: ChatActionType.REMOVE_RECORD,
  };
}
