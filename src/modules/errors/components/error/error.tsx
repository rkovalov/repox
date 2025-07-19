// import { useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { ErrorComponentProps } from '@tanstack/react-router';

import { NotFoundError } from '../../types';

export function ErrorComponent({ error }: ErrorComponentProps) {
  const queryErrorResetBoundary = useQueryErrorResetBoundary();
  // const router = useRouter();

  useEffect(() => {
    queryErrorResetBoundary.reset();
  }, [queryErrorResetBoundary]);

  if (error instanceof NotFoundError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <h1>Something went wrong</h1>
      <div>We are working on fixing the problem. Please choose an action below to continue.</div>
    </div>
  );
}
