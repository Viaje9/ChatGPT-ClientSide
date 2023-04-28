import { ReqCallOpenAiCompletions } from "@/models/api/reqCallOpenAiCompletions";
import { ResCallOpenAiCompletions } from "@/models/api/resCallOpenAiCompletions";
import { ResCallTest } from "@/models/api/resCallTest";
import { Request } from "./base";

export class ApiService {
  static callOpenAiCompletions(
    data: ReqCallOpenAiCompletions
  ): Promise<ResCallOpenAiCompletions> {
    return Request.post(data, "/openapi");
  }

  static callTest(): Promise<ResCallTest> {
    return Request.get({}, "/test");
  }
}
