import { ChatUser } from "../../../enum/chat-user.enum";

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
