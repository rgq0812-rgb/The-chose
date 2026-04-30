import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TacticalProvider } from './context/TacticalContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TacticalProvider>
      <App />
    </TacticalProvider>
  </StrictMode>,
);
