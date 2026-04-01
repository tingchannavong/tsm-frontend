import { authApi, publicApi } from "../libs/axios";

export async function getLocationById(id) {
    const res = await publicApi.get(`/api/locations/${id}`);
    return res.data;
}

export async function getAllLocations() {
    const res = await authApi.get(`/api/locations`);
    return res.data;
}