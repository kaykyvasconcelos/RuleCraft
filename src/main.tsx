// src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css'; // Certifique-se que o Tailwind ou seu CSS global está aqui

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
