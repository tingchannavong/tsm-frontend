import { publicApi, authApi } from "../libs/axios.js";

export async function login(username, password) {
    const res = await publicApi.post("/api/auth/login", {
        username,
        password
    });
    return res.data;
}

export async function logout() {
    const res = await authApi.post("/api/auth/logout");
    return res.data;
}

export async function changePassword(id, updatedData) {
     const res = await authApi.post(`/api/auth/change-password/users/${id}`, updatedData);
    return res.data;
}