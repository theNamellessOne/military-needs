export type ApiResponse<T> = {
  data: T | null | undefined;
  status: number;
  error: string | null | undefined;
};
