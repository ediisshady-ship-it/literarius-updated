import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // If reduced motion is preferred, show immediately
    if ((window as any)?.matchMedia && (window as any)?.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (ref.current && !hasShown) {
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'none';
        setHasShown(true);
      }
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', '!translate-y-0');
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -32px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, hasShown]);

  return ref;
}
