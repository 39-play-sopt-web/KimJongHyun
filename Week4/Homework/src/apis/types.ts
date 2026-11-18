export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
}