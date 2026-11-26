import React, { useEffect, useRef } from 'react';

/**
 * Shared RevealItem component for reveal animations.
 * Props:
 *   children: ReactNode to reveal
 *   delay: number (ms) delay before animation starts, defaults to 0
 *   className: additional CSS classes
 *   type: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right', defaults to 'fade-up'
 *   as: HTML element tag name, defaults to 'div'
 */
function RevealItem({
  children,
  delay = 0,
  className = '',
  type = 'fade-up',
  as: Component = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  type?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // If reduced motion is preferred, show immediately
    if ((window as any).matchMedia && (window as any).matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (ref.current) {
        ref.current.style.transitionDelay = `${delay}ms`;
        ref.current.style.opacity = '1';
        ref.current.style.transform = 'none';
      }
      return;
    }

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('opacity-100', '!translate-y-0', '!translate-x-0', '!scale-100');
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  let baseClass = 'opacity-0 transition-all ease-cinematic ';
  if (type === 'fade-up') baseClass += 'translate-y-12 duration-[800ms]';
  if (type === 'fade-in') baseClass += 'scale-[0.98] duration-[1000ms]';
  if (type === 'slide-left') baseClass += '-translate-x-12 duration-[800ms]';
  if (type === 'slide-right') baseClass += 'translate-x-12 duration-[800ms]';

  return React.createElement(Component, { ref, className: `${baseClass} ${className}` }, children);
}

export default RevealItem;
export { RevealItem };