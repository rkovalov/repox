import { useNavigate } from '@tanstack/react-router';

export function Page404() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Page Not found!</h1>
      <div>
        Oops! The page you're looking for doesn't exist. It may have been moved,
        deleted, or the URL might be incorrect. Try going back to the homepage
        or checking the URL again
      </div>
      <button onClick={() => navigate('/')} type="button">
        Back To Home
      </button>
    </div>
  );
}
