import { publicApi } from "../libs/axios";

export async function getLocationById(id) {
    const res = await publicApi.get(`/api/locations/${id}`);
    return res.data;
}