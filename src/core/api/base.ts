import axios, { AxiosResponse } from "axios";
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
});

class Request {
  static get<T,A>(
    postData: T,
    prefixPath: string
  ): Promise<A> {
    return request.get<A>(prefixPath, { params: postData }).then(res=>res.data);
  }

  static post<T,A>(
    postData: T,
    prefixPath: string
  ): Promise<A> {
    return request.post<A>(prefixPath, postData).then(res=>res.data);
  }
}

export { Request };
