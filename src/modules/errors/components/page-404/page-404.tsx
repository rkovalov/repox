import { css } from '@/../styled-system/css';
import { flex } from '@/../styled-system/patterns';
import { Button } from '@/components';
import { useNavigate } from '@tanstack/react-router';
import { Heading } from 'react-aria-components';

export function Page404() {
  const navigate = useNavigate();
  return (
    <div
      className={flex({ direction: 'column', alignItems: 'center', gap: 4 })}
    >
      <Heading level={1} className={css({ fontSize: '2rem' })}>
        Page Not found!
      </Heading>
      <div>
        Oops! The page you're looking for doesn't exist. It may have been moved,
        deleted, or the URL might be incorrect. Try going back to the homepage
        or checking the URL again
      </div>
      <Button onPress={() => navigate({ to: '/' })}>Back To Home</Button>
    </div>
  );
}
