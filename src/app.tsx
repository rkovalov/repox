import { RouterProvider, queryClient } from '@/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

import './app.css';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider />
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
