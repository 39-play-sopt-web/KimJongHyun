// src/apis/member.js
import apiClient from "./apiClient";

// part: "WEB" | "iOS" | "ANDROID"
export const issueAuthorizationCode = async (part) => {
  const res = await apiClient.post("/members/authorization-code", { part });
  return res.data.data.authorizationCode; // string
};