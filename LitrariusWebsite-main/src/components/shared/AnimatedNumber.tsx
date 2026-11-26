import React, { useEffect, useRef, useState } from 'react';

function AnimatedNumber({
  value,
  prefix = '',
  suffix = '',
  className = 'font-poppins font-black text-[56px] text-green-logo leading-none',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is preferred, show the final value immediately
    if ((window as any)?.matchMedia && (window as any)?.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      return;
    }

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.unobserve(el);
        const duration = 2000;
        const startTime = performance.now();
        const animate = (time: number) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          setCurrent(Math.floor(easeOut * value));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <div ref={ref} className={className}>{prefix}{current.toLocaleString()}{suffix}</div>;
}

export default AnimatedNumber;