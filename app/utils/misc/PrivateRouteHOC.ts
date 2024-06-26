import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const PrivateRouteHOC = (func: () => void) => {
  const token = JSON.parse(
    cookies().get("user")?.value ?? JSON.stringify({ state: {} })
  ).state?.user?.token;

  if (!token) {
    redirect("/");
  }

  return func();
};
