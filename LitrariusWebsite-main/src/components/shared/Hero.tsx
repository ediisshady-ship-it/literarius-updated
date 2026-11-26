import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Picture from './Picture';

interface HeroProps {
  imageSrc: string;
  videoSrc?: string;
  imageAlt: string;
  italicLine: string;
  heading: React.ReactNode;
  subText?: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  short?: boolean;
  trustedBy?: string[];
  children?: React.ReactNode;
}

export default function Hero({
  imageSrc, videoSrc, imageAlt, italicLine, heading, subText,
  ctaLabel = 'Book Free Consultation', ctaTo = '/contact',
  secondaryLabel, secondaryTo,
  short = false,
  trustedBy,
  children,
}: HeroProps) {
  // Detect prefers-reduced-motion once on mount
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  // Extract base path from imageSrc for Picture component
  // e.g., "/images/hero_home_bright.webp" -> base = "/images/hero_home_bright"
  const imageBase = imageSrc.replace(/\.[^.]+$/, '');

  function scrollToHash(hash: string) {
    const target = document.querySelector(hash);
    if (!target) return;
    if (reducedMotion) {
      target.scrollIntoView({ behavior: 'instant' });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className={`relative flex flex-col overflow-hidden ${short ? 'min-h-[60svh]' : 'min-h-[100svh]'}`}>
      {/* Background image or video */}
      <div className="absolute inset-0 z-0">
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={imageSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Picture
            src={imageBase}
            alt={imageAlt}
            width={1920}
            height={1080}
            priority={true}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,30,20,0.95)] via-[rgba(6,30,20,0.6)] to-transparent" />
        <div className="absolute top-0 left-0 w-full h-[160px] bg-gradient-to-b from-white/90 via-white/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end">
        <div className={`pt-32 pb-6 lg:pb-10 px-6 md:px-20 max-w-[800px] ${short ? 'pb-4' : ''}`}>
          {/* Don't render italic line when empty */}
          {italicLine && (
            <p className="font-playfair italic text-xl md:text-2xl text-white/90 mb-4">{italicLine}</p>
          )}
          <h1 className="font-playfair text-[32px] md:text-[42px] lg:text-[52px] xl:text-[54px] text-white leading-[1.1] mb-6 tracking-tight drop-shadow-sm">{heading}</h1>
          {subText && (
            <p className="text-[17px] md:text-[19px] text-white/90 max-w-[620px] mb-10 leading-relaxed">{subText}</p>
          )}
          {ctaLabel && ctaTo && (
            <div className="flex items-center gap-6 flex-wrap">
              <Link to={ctaTo} className="btn bg-coral-aa text-white hover:bg-coral-aa-dk px-8 py-4 font-bold tracking-wide uppercase text-sm">{ctaLabel}</Link>
              {secondaryLabel && secondaryTo && (
                <span className="relative">
                  {/* Hash targets use plain <a>; normal routes use <Link> */}
                  {secondaryTo.startsWith('#') ? (
                    <a
                      href={secondaryTo}
                      className="text-white text-[15px] font-medium underline underline-offset-4 opacity-90 hover:opacity-100 transition-opacity"
                      onClick={e => {
                        e.preventDefault();
                        scrollToHash(secondaryTo);
                      }}
                      aria-label={secondaryLabel}
                    >
                      {secondaryLabel} ↓
                      <span aria-hidden="true">↓</span>
                    </a>
                  ) : (
                    <Link to={secondaryTo} className="text-white text-[15px] font-medium underline underline-offset-4 opacity-90 hover:opacity-100 transition-opacity">
                      {secondaryLabel} ↓
                    </Link>
                  )}
                </span>
              )}
            </div>
          )}
        </div>
        {children}
      </div>

      {/* Trusted-by strip */}
      {trustedBy && (
        <div className="relative z-10 bg-black/50 backdrop-blur-sm px-8 md:px-20 py-3.5 flex items-center gap-6 flex-wrap">
          <span className="text-[11px] text-white/80 tracking-widest uppercase whitespace-nowrap">
            Students admitted to
          </span>
          <div className="flex gap-6 flex-wrap">
            {trustedBy.map((t) => (
              <span key={t} className="text-xs text-white/85 font-medium tracking-wide">{t}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}