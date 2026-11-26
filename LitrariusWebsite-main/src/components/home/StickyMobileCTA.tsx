import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../../data/site';

/**
 * Sticky mobile CTA that appears after scrolling past the hero,
 * hides near the footer and on /contact.
 * 
 * Adds bottom padding to the page when visible.
 * Safe-area-inset-bottom aware.
 * Respects prefers-reduced-motion (no animated transitions).
 */
export default function StickyMobileCTA() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [hasAddedPadding, setHasAddedPadding] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Check reduced motion preference
  const reducedMotion =
    typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    // Hide on /contact page
    if (location.pathname === '/contact') {
      setIsVisible(false);
      if (hasAddedPadding) {
        document.body.classList.remove('literarius-cta-padding');
        setHasAddedPadding(false);
      }
      return;
    }

    const handleScroll = () => {
      if (!heroRef.current || !footerRef.current) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );

      // Check if user has scrolled past the hero
      const heroBottom = heroRef.current.getBoundingClientRect().bottom + scrollY;
      const scrollPastHero = scrollY > heroBottom - viewHeight * 0.5;

      // Check if near footer
      const footerTop = footerRef.current.getBoundingClientRect().top + scrollY;
      const nearFooter = (docHeight - (scrollY + viewHeight)) < (footerTop + 100);

      // Show after scrolling past hero, hide near footer
      if (scrollPastHero && !nearFooter) {
        setIsVisible(true);
        if (!hasAddedPadding) {
          document.body.classList.add('literarius-cta-padding');
          setHasAddedPadding(true);
        }
      } else {
        setIsVisible(false);
        if (hasAddedPadding) {
          document.body.classList.remove('literarius-cta-padding');
          setHasAddedPadding(false);
        }
      }
    };

    // Initial check
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, hasAddedPadding]);

  // Ensure padding state is consistent
  useEffect(() => {
    if (isVisible && !hasAddedPadding) {
      document.body.classList.add('literarius-cta-padding');
      setHasAddedPadding(true);
    } else if (!isVisible && hasAddedPadding) {
      document.body.classList.remove('literarius-cta-padding');
      setHasAddedPadding(false);
    }
  }, [isVisible, hasAddedPadding]);

  // Reduced motion: instant show/hide, no transitions.
  // Outside reduced motion: normal scroll-based visibility with fade.
  const opacityClass = reducedMotion
    ? isVisible ? 'opacity-100' : 'opacity-0'
    : isVisible ? 'opacity-100' : 'opacity-0';

  const transitionClass = reducedMotion ? '' : 'transition-opacity duration-300';

  return (
    <aside
      className={`fixed bottom-0 left-0 right-0 z-50 max-w-[400px] mx-auto ${transitionClass}`}>
      <div
        className={`bg-white border-t border-bdr shadow-lg p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 ${opacityClass}`}>
        <div className="flex items-center gap-3">
          <span className="text-green-em font-medium">Book Free Consultation</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone.replace(/\s/g, '')}`}
            className="btn btn-coral btn-sm px-4 py-2 text-sm font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <span className="text-muted-aa text-xs uppercase tracking-wider">
            +61 459 038 427
          </span>
        </div>
      </div>
    </aside>
  );
}