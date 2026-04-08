import { authApi, publicApi } from "../libs/axios";

export async function getOrderPreviewBySessionIds(body) {
  // console.log('payload', body);
  const res = await publicApi.post(`/api/orders/preview`, body);
  return res.data;
}

export async function createOrder(body) {
  // console.log('payload', body);
  const res = await authApi.post(`/api/orders`, body);
  return res.data;
}
