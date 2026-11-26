import React from 'react';
import { Link } from 'react-router-dom';
import { site } from '../../data/site';

// Services and Company links use react-router <Link>
// Contact links use anchor <a> for tel:mailto
type ServiceLink = { label: string; to: string };
type ContactLink = { label: string; href: string; target: string; rel: string };

const serviceLinks: ServiceLink[] = [
  { label: 'Study in Australia', to: '/australia' },
  { label: 'University Admissions', to: '/australia' },
  { label: 'Scholarship Guidance', to: '/australia#scholarships' },
];

const companyLinks: { label: string; to: string }[] = [
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

const contactLinks: ContactLink[] = [
  { label: '+61 459 038 427', href: 'tel:+61459038427', target: '_blank', rel: 'noopener noreferrer' },
  { label: 'info@literarius.com.au', href: 'mailto:info@literarius.com.au', target: '_blank', rel: 'noopener noreferrer' },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-bdr">
      <div className="max-w-content mx-auto px-6 pt-12 pb-0">
        {/* 12-col grid on lg, 2-col on md, brand wider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pb-10 border-b border-bdr">
          {/* Brand - spans 4/12 on lg, auto on md */}
          <div className="col-span-4 md:col-span-2 lg:col-span-4">
            <div className="mb-3">
              <img
                src="/images/literarius-logo.webp"
                alt="Literarius International"
                loading="eager"
                width="180"
                height="77"
                className="h-10 w-auto max-w-[180px] object-contain"
              />
            </div>
            <p className="text-sm text-muted-aa leading-relaxed max-w-none">
              Your Gateway to World-Class Australian Education. Expert counselling for university admissions and scholarship applications worldwide.
            </p>
          </div>
          {/* Services column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="font-poppins font-semibold text-sm text-ink mb-4">Services</h4>
            <ul className="flex flex-col gap-1.5">
              {serviceLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-aa hover:text-emerald-text transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Company column */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="font-poppins font-semibold text-sm text-ink mb-4">Company</h4>
            <ul className="flex flex-col gap-1.5">
              {companyLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="text-sm text-muted-aa hover:text-emerald-text transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact column - uses anchor tags for tel:mailto */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="font-poppins font-semibold text-sm text-ink mb-4">Contact</h4>
            <ul className="flex flex-col gap-1.5">
              {contactLinks.map(({ label, href, target, rel }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={target}
                    rel={rel}
                    className="text-sm text-muted-aa hover:text-emerald-text transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4 text-xs text-muted-aa">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span>© 2026 Literarius. All rights reserved.</span>
            <span className="hidden sm:inline text-muted-aa/40">•</span>
            <a
              href="/credits"
              className="text-muted-aa hover:text-emerald-text transition-colors"
              aria-label="Image credits"
            >
              Image credits
            </a>
          </div>
          <div className="flex gap-3">
            {/* Social icons - only render when URL is non-empty */}
            {site.facebook && (
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-green-logo/10 text-green-logo flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Literarius on Facebook (opens in new tab)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            )}
            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-green-logo/10 text-green-logo flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Literarius on Instagram (opens in new tab)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            )}
            {site.linkedin && (
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-green-logo/10 text-green-logo flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Literarius on LinkedIn (opens in new tab)"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            )}
            <a
              href="/privacy"
              className="text-muted-aa hover:text-emerald-text transition-colors"
              aria-label="Privacy Policy (opens in new tab)"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-muted-aa hover:text-emerald-text transition-colors"
              aria-label="Terms (opens in new tab)"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}