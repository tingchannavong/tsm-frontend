import { publicApi, authApi } from "../libs/axios.js";

export async function fetchMe() {
    const res = await authApi.get("/api/users/me");
    return res.data;
}