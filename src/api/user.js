import { publicApi, authApi } from "../libs/axios.js";

export async function fetchMe() {
    const res = await authApi.get("/api/users/me");
    return res.data;
}

export async function fetchAllUsers() {
    const res = await authApi.get("/api/users");
    return res.data;
}

export async function updateUserById(id, updatedData) {
  const res = await authApi.patch(`/api/sessions/${id}`, updatedData);
  return res.data;
}

export async function deleteUserById(id) {
  const res = await authApi.delete(`/api/sessions/${id}`);
  return res.data;
}