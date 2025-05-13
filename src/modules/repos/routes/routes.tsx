import { type AnyRoute, Outlet, createRoute } from '@tanstack/react-router';
import { Repos } from '../components/repos';
import { reposParamsSchema } from './validators';

export const createRoutes = <Route extends AnyRoute>(rootRoute: Route) => {
  const indexRoute = createRoute({
    path: 'repos',
    getParentRoute: () => rootRoute,
    component: () => {
      return (
        // here could be a layout component
        <Outlet />
      );
    },
  });

  const reposRoute = createRoute({
    path: '/',
    getParentRoute: () => indexRoute,
    validateSearch: reposParamsSchema,
    component: Repos,
  });

  return indexRoute.addChildren([reposRoute]);
};
