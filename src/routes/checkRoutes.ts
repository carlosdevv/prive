import { APP_ROUTES } from "./appRoutes";

export const checkIsPrivateRoute = (route: string) => {
  const privateRoutes = Object.values(APP_ROUTES.private);
  return privateRoutes.includes(route);
}