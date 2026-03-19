import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("auth", "routes/auth.tsx"),
  route("*", "routes/404.tsx"),
] satisfies RouteConfig;
