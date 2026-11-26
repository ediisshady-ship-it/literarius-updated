import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/australia', label: 'Study in Australia' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  // Header is translucent white with backdrop-blur when scrolled/closed on home;
  // otherwise solid white with shadow. Kept solid white at all times for reliability.
  const isScrolled = scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  // Close mobile menu on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <nav aria-label="Primary" className="fixed w-full top-0 z-50 transition-all duration-400">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-20">

        {/* LEFT: Logo Container */}
        <div className="flex-1 flex justify-start">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/images/literarius-logo.webp"
              alt="Literarius International"
              loading="eager"
              width="200"
              height="85"
              className="w-[175px] lg:w-[200px] h-auto object-contain transition-all duration-300"
            />
          </Link>
        </div>

        {/* CENTER: Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-7 flex-none">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to;

            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`font-inter font-semibold text-[15px] tracking-wide relative py-2 transition-colors duration-300 ${active ? 'aria-current-page' : ''}`}>
                  {label}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 origin-left transition-transform duration-300 ease-out 
                        ${active ? 'scale-x-100' : 'scale-x-0'} ${active ? 'group-hover:scale-x-100' : ''}`} 
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* RIGHT: CTA Container */}
        <div className="flex-1 flex justify-end items-center">
          <Link 
            to="/contact" 
            className="hidden lg:inline-flex h-[48px] px-[24px] items-center justify-center font-bold tracking-wide uppercase text-[13px] rounded transition-all duration-400 hover:-translate-y-0.5 hover:shadow-md
              bg-white text-green-logo hover:bg-gray-100"
          >
            Book Free Consultation
          </Link>

          {/* Hamburger for Mobile */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-2 cursor-pointer relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-6 h-[2px] transition-all duration-300 origin-center bg-green-logo ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block w-6 h-[2px] transition-all duration-300 bg-green-logo ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] transition-all duration-300 origin-center bg-green-logo ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-400 ease-in-out absolute w-full left-0 ${
          mobileOpen ? 'max-h-[80vh] overflow-y-auto opacity-100 shadow-[0_10px_20px_rgba(0,0,0,0.05)] border-t' : 'max-h-0 opacity-0 border-transparent'}
       `}
        aria-hidden={!mobileOpen}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to;
            const linkClass = `text-[15px] py-3 border-b border-bdr block transition-colors duration-200 ${active ? 'text-green-logo font-bold' : 'text-[#334155] font-medium'}`;
            // When menu is closed, make links non-transparent via inert
            const inertAttr = !mobileOpen ? 'inert' : '';
            return (
              <Link
                key={to}
                to={to}
                className={linkClass}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
          <Link 
            to="/contact" 
            className="bg-coral-aa text-white hover:bg-coral-aa-dk w-full h-[52px] flex items-center justify-center mt-6 font-bold tracking-wide uppercase text-[14px] rounded transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
}