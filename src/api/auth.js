import { publicApi, authApi } from "../libs/axios.js";

export async function login(username, password) {
    const res = await publicApi.post("/api/auth/login", {
        username,
        password
    });
    return res.data;
}

export async function fetchMe() {
    const res = await authApi.get("/api/auth/me");
    return res.data;
}