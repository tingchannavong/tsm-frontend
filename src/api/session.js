import { authApi, publicApi } from "../libs/axios";

export async function createSession(body) {
  const res = await publicApi.post(`/api/sessions`, body);
  return res.data;
}

export async function getSessionsByLocation(id) {
  const res = await publicApi.get(`/api/sessions/filter?locationId=${id}`);
  return res.data;
}

export async function getSessionsByLocationGroup(locationId, groupId) {
  const res = await publicApi.get(
    `/api/sessions/filter?locationId=${locationId}&groupId=${groupId}`,
  );
  return res.data;
}

export async function getAllSessions(filters) {
  let api = "/api/sessions";

  if (filters && Object.keys(filters).length > 0) {
      const params = new URLSearchParams(filters).toString();
      api += `?${params}`;
  }

  const res = await authApi.get(api);
  return res.data;
}

export async function deleteSessionById(id) {
  const res = await authApi.delete(`/api/sessions/${id}`);
  return res.data;
}

export async function getSessionById(id) {
  const res = await authApi.get(`/api/sessions/${id}`);
  return res.data;
}

export async function updateSessionById(id, updatedData) {
  const res = await authApi.patch(`/api/sessions/${id}`, updatedData);
  return res.data;
}
