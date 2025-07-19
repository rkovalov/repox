import { Suspense } from 'react';
import { createRootRouteWithContext, createRoute, createRouter, Outlet, redirect } from '@tanstack/react-router';
import { Layout } from '@/components';

import { ErrorComponent, Page404 } from '@/modules/errors';
import { createRoutes as createReposRoutes } from '@/modules/repos';

import { ReactQueryDevtoolsDevtools, TanStackRouterDevtools } from './dev-tools';
import { type QueryClient, queryClient } from './query-client';

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const rootRoute = createRootRouteWithContext<{
  // auth will initially be undefined
  // We'll be passing down the auth state from within a React component in the future
  auth?: Record<string, any>;
  queryClient: QueryClient;
}>()({
  component: () => {
    return (
      <>
        <Layout>
          <Outlet />
        </Layout>
        <Suspense>
          <TanStackRouterDevtools />
          <ReactQueryDevtoolsDevtools />
        </Suspense>
      </>
    );
  },
  errorComponent: ErrorComponent,
  // https://github.com/TanStack/router/issues/3556
  // need specify empty loader method for display fallback pending component
  loader: () => void 0,
  pendingComponent: () => 'Loading...',
});

const indexRoute = createRoute({
  beforeLoad: () => {
    throw redirect({ to: '/repos' });
  },
  getParentRoute: () => rootRoute,
  path: '/',
});

export const router = createRouter({
  context: {
    // auth will initially be undefined
    // We'll be passing down the auth state from within a React component
    auth: undefined,
    queryClient,
  },
  defaultNotFoundComponent: Page404,
  defaultPendingComponent: () => 'Loading...',
  // * If `'intent'`, routes will be preloaded by default when the user hovers over a link or a `touchstart` event is detected on a `<Link>`.
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  routeTree: rootRoute.addChildren([indexRoute, createReposRoutes(rootRoute)]),
});
