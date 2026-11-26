import React from 'react';

export default function NotFound() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-content mx-auto px-6 text-center">
        <h1 className="font-playfair text-[48px] mb-6">
          Page Not Found
        </h1>
        <p className="text-[18px] text-[#334155] mb-8">
          The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/"
            className="btn bg-coral-aa text-white hover:bg-coral-aa-dk px-8 py-4 font-bold tracking-wide uppercase text-sm"
          >
            Go Home
          </a>
          <a
            href="/contact"
            className="btn bg-transparent text-green-logo border-green-logo hover:bg-green-logo hover:text-white px-8 py-4 font-bold tracking-wide uppercase text-sm"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}