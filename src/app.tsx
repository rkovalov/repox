import { RouterProvider, queryClient } from '@/router';
import { QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';

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
