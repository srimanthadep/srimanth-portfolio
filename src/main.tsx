import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimization: Add loading="lazy" to all images
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });
});

createRoot(document.getElementById("root")!).render(<App />);
