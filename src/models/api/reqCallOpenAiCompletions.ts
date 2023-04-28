import { ChatUser } from "@/enum/chat-user.enum";

export interface ReqCallOpenAiCompletions {
  record: RecordInfo[],
}

export interface RecordInfo {
  user: ChatUser;
  content: string;
}