export interface IBaseResponse<T> {
  body: T | null;
  message: string;
}
