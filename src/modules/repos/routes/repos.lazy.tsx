import { createLazyRoute } from '@tanstack/react-router';

import { Repos } from '../components/repos';

export const Route = createLazyRoute('/repos/')({
  component: Repos,
});
