import { apiClient } from "./apiClient";
import type { ApiResponse } from "./types";

export type Part = "WEB" | "iOS" | "ANDROID";

interface AuthorizationCodeData {
  authorizationCode: string;
}

export const postAuthorizationCode = async (part: Part) => {
  const response = await apiClient.post<ApiResponse<AuthorizationCodeData>>(
    "/members/authorization-code",
    { part },
  );
  return response.data.data;
};
