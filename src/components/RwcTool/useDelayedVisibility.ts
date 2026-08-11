import { useEffect, useState } from 'react';

export function useDelayedVisibility(active: boolean, delayMs: number): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setIsVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [active, delayMs]);

  return isVisible;
}
