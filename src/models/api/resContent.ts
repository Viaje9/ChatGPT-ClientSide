export type ResponseContent<T> = {
  readonly header: ResponseHeader
  readonly body: T
}

export interface ResponseHeader { success: boolean; errorCode?: string; errorMessage?: string }