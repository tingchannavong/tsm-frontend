import { redirect } from "react-router-dom";
import { useUserStore } from "../stores/userStores.js";

export async function getUser() {
  const { user, syncUser } = useUserStore.getState();
  return user ?? (await syncUser());
}

function guard(user, allowedRole) {

  if (!user) return redirect("/tsm/login");

  if (allowedRole && user.role !== allowedRole) {
    return redirect(user.role === "ADMIN" ? "/tsm/admin" : "/tsm/staff");
  }

  return user;
}

export const roleLoader = (allowedRole) => async () => {
  const user = useUserStore.getState().user;
  return guard(user, allowedRole);
};

export const protectedLoader = async () => {
  const user = useUserStore.getState().user;
  return guard(user);
};
