import { ENV_VARS } from '@/env';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';

console.info(`version ${ENV_VARS.VERSION}`);

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
