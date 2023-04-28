import { ResponseContent } from "./resContent";

export type ResCallOpenAiCompletions = ResponseContent<{
  record: choice[];
}>;

interface choice {
  finish_reason?: string;
  index?: string;
  logprobs?: null;
  text: string;
}
