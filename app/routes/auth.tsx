import type { Route } from "./+types/auth";
import { AuthPage } from "../../pages/auth";
import { redirect } from "react-router";
import { isAuthenticated } from "shared/lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Авторизация", desc: "Описание основной страницы" },
  ];
}

export async function clientLoader() {
  if (isAuthenticated()) {
    throw redirect("/");
  }
  return null;
}

export default function Auth() {
  return <AuthPage />;
}
