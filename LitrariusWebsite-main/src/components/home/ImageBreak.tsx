import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const words = ['Melbourne', 'Sydney', 'UNSW', 'Monash', 'ANU'];

export default function ImageBreak() {
  const [idx, setIdx] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      setReducedMotion(mq.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (!reducedMotion) {
      const start = () => {
        setIdx((i) => (i + 1) % words.length);
      };

      const timer = setInterval(start, 2500);

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        if (timer) clearInterval(timer);
      };
    }

    // When reduced motion is preferred, keep idx at 0
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [reducedMotion]);

  // Screen-reader-only full list of all rotating words
  const srList = (
    <div className="sr-only">
      {words.map((w, i) => (
        <span key={i}>{w}{' '}</span>
      ))}
    </div>
  );

  return (
    <section className="relative h-[380px] overflow-hidden">
      <img
        src="/images/student-group.webp"
        alt="Group of international students standing on campus steps"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[rgba(6,30,20,0.65)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="font-poppins text-lg text-white/80 mb-3 uppercase tracking-widest text-xs font-bold">
          Meet the admissions experts getting students into
        </p>
        <div
          className="font-playfair italic text-white text-[clamp(44px,6vw,72px)] min-h-[1.2em]"
          aria-live="off"
        >
          {reducedMotion ? <span>{words[0]}</span> : <span>{words[idx]}</span>}
        </div>
        <div className="mt-5">
          <Link to="/about" className="btn btn-outline-white">Meet Our Team</Link>
        </div>
      </div>
      {srList}
    </section>
  );
}