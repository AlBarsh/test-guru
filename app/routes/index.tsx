import type { Route } from "./+types/index";
import { ProductsPage } from "pages/products";
import { redirect } from "react-router";
import { isAuthenticated } from "shared/lib/auth";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Товары", desc: "Список товаров" },
  ];
}

export async function clientLoader() {
  if (!isAuthenticated()) {
    throw redirect("/auth");
  }
  return null;
}

export default function Index() {
  return <ProductsPage />;
}

