import { publicApi } from "../libs/axios";

export async function createSession(body) {
    const res = await publicApi.post(`/api/sessions`, body);
    return res.data;
}

export async function getSessionsByLocation(id) {
    const res = await publicApi.get(`/api/sessions/filter?locationId=${id}`);
    return res.data;
}

export async function getSessionsByLocationGroup(locationId, groupId) {
    const res = await publicApi.get(`/api/sessions/filter?locationId=${locationId}&groupId=${groupId}`);
    return res.data;
}