import { type AnyRoute, createRoute, Outlet } from '@tanstack/react-router';
import { queryClient } from '@/router';

import * as Dp from '../data-provider';
import { reposSearchParamsSchema } from '../types';

export const createRoutes = <Route extends AnyRoute>(rootRoute: Route) => {
  const indexRoute = createRoute({
    component: () => {
      return (
        // here could be a layout component
        <Outlet />
      );
    },
    getParentRoute: () => rootRoute,
    path: 'repos',
  });

  const reposRoute = createRoute({
    beforeLoad: ({ search }) => {
      return { search };
    },
    getParentRoute: () => indexRoute,
    loader: ({ context }) => {
      queryClient.ensureQueryData(Dp.repositoriesQueryOptions(context.search));
    },
    path: '/',
    validateSearch: reposSearchParamsSchema,
    // component: Repos,
  }).lazy(() => import('./repos.lazy').then((d) => d.Route));

  return indexRoute.addChildren([reposRoute]);
};
