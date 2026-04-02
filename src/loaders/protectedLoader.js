import { redirect } from "react-router-dom";
import { useAuthStore } from "../stores/authStores.js";
import { isTokenExpired } from "../utils/tokenUtils.js";

function guard(user, allowedRole) {
  const accessToken = useAuthStore.getState().accessToken;
  console.log('guard')

  const tokenExpired = isTokenExpired(accessToken);
    console.log('token expired', tokenExpired)

  if (tokenExpired) {
    console.log('we are here')
    useAuthStore.getState().logout();
    return redirect("/tsm/login");
  }

  if (!user) return redirect("/tsm/login");

  if (allowedRole && user.role !== allowedRole) {
    return redirect(user.role === "ADMIN" ? "/tsm/admin" : "/tsm/staff");
  }

  return user;
}

export const roleLoader = (allowedRole) => () => {
    console.log('we are at roleloader')
  const user = useAuthStore.getState().user;

  return guard(user, allowedRole);
};

export const protectedLoader = () => {
  const user = useAuthStore.getState().user;
  return guard(user);
};
