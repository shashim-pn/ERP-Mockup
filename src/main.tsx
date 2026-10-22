import { createRoot } from 'react-dom/client';
import { injectSpeedInsights } from '@vercel/speed-insights';
import App from './App.tsx';
import './index.css';

injectSpeedInsights({
    route: window.location.pathname,
    debug: false,
});

createRoot(document.getElementById('root')!).render(<App />);
