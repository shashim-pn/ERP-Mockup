import { createIcons, icons } from 'lucide';
import './index.css';

// Attach Lucide globally with safe error boundary
(window as any).lucide = {
  createIcons: (options: any = {}) => {
    try {
      return createIcons({ icons, ...options });
    } catch (err) {
      console.warn('Lucide createIcons warning:', err);
    }
  },
  icons
};

try {
  (window as any).lucide.createIcons();
} catch (e) {
  console.warn('Initial Lucide createIcons notice:', e);
}
