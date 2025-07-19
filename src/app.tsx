import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, RouterProvider } from '@/router';

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
