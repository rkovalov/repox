import { type AnyRoute, createRoute, Outlet } from '@tanstack/react-router';
import { queryClient } from '@/router';

import * as Dp from '../data-provider';
import { reposSearchParamsSchema } from '../types';

export const createRoutes = <Route extends AnyRoute>(rootRoute: Route) => {
  const reposRoute = createRoute({
    component: () => {
      return (
        // here could be a layout component
        <Outlet />
      );
    },
    getParentRoute: () => rootRoute,
    path: 'repos',
  });

  const indexRoute = createRoute({
    beforeLoad: ({ search }) => {
      return { search };
    },
    getParentRoute: () => reposRoute,
    loader: ({ context }) => {
      queryClient.ensureQueryData(Dp.repositoriesQueryOptions(context.search));
    },
    path: '/',
    validateSearch: reposSearchParamsSchema,
    // component: Repos,
    // @ts-ignore: issue with matching types with trailing slash,
    // TODO: check later with newest version of tanstack router
  }).lazy(() => import('./repos.lazy').then((d) => d.Route));

  return reposRoute.addChildren([indexRoute]);
};
