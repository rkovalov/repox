import { RouterProvider as BaseRouterProvider } from '@tanstack/react-router';

import { router } from './router';

export const RouterProvider = () => {
  // const auth = useAuth();
  // we can use a custom auth provider or any other context provider here
  // <BaseRouterProvider router={router} context={{ auth }} />;
  return <BaseRouterProvider router={router} />;
};
