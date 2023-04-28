import { ResponseHeader } from "@/models/api/resContent";

/**
 * @description 判斷 api 呼叫是否成功
 * @param res api response
 * @returns 是否成功
 */
export const isSuccess = (res: ResponseHeader): boolean => res.success;
