import { default as Cookies } from "js-cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const revalidate = 0;
export const PrivateRouteHOC = (func: () => void) => {
  const token = JSON.parse(
    cookies().get("user")?.value ?? JSON.stringify({ state: {} })
  ).state?.user?.token;

  if (!token) {
    redirect("/");
  }

  return func();
};
