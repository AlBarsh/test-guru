import type { Route } from "./+types/404";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 - Страница не найдена", desc: "Страница не найдена" },
  ];
}

export async function clientLoader() {
  throw redirect("/");
}

export default function NotFound() {
  return null;
}

