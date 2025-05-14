import { queryClient } from '@/router';
import { type AnyRoute, Outlet, createRoute } from '@tanstack/react-router';
import * as DP from '../data-provider';
import { reposSearchParamsSchema } from '../types';

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
    validateSearch: reposSearchParamsSchema,
    beforeLoad: ({ search }) => {
      return { search };
    },
    loader: ({ context }) => {
      queryClient.ensureQueryData(DP.repositoriesQueryOptions(context.search));
    },
    // component: Repos,
  }).lazy(() => import('./repos.lazy').then((d) => d.Route));

  return indexRoute.addChildren([reposRoute]);
};
