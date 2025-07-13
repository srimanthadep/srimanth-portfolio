import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search,
      });
    }

    // Custom analytics tracking
    const trackPageView = () => {
      // You can integrate with Google Analytics, Plausible, or any other analytics service
      console.log('Page view:', location.pathname);
      
      // Example: Send to your analytics endpoint
      // fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     path: location.pathname,
      //     timestamp: new Date().toISOString(),
      //     userAgent: navigator.userAgent,
      //   }),
      // });
    };

    trackPageView();
  }, [location]);

  // Track user interactions
  useEffect(() => {
    const trackInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const button = target.closest('button, a');
      
      if (button) {
        const text = button.textContent?.trim();
        const href = (button as HTMLAnchorElement).href;
        
        console.log('User interaction:', {
          element: button.tagName,
          text,
          href,
          timestamp: new Date().toISOString(),
        });
      }
    };

    document.addEventListener('click', trackInteraction);
    return () => document.removeEventListener('click', trackInteraction);
  }, []);

  return null;
}

// Add gtag to window object for Google Analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 