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

export async function forgotPassword(body) {
     const res = await publicApi.post(`/api/auth/forgot-password`, body);
    return res.data;
}

export async function resetPassword(resetToken, body) {
     const res = await publicApi.post(`/api/auth/reset-password/${resetToken}`, body);
    return res.data;
}

export async function adminRegister(body) {
     const res = await authApi.post(`/api/auth/register`, body);
    return res.data;
}