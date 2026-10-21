import Alpine from 'alpinejs';
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

// Attach Alpine globally
(window as any).Alpine = Alpine;

// If appData is already on window, register it as an Alpine component
if (typeof (window as any).appData === 'function') {
  Alpine.data('appData', (window as any).appData);
}

// Start Alpine on DOM ready
const startAlpine = () => {
  if (!(window as any).__alpine_started) {
    (window as any).__alpine_started = true;
    if (typeof (window as any).appData === 'function') {
      try {
        Alpine.data('appData', (window as any).appData);
      } catch (e) {
        // Already registered
      }
    }
    Alpine.start();
    // Render initial icons
    try {
      (window as any).lucide.createIcons();
    } catch (e) {
      console.warn('Initial Lucide createIcons notice:', e);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startAlpine);
} else {
  startAlpine();
}
