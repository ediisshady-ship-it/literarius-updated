import React from 'react';
import type { Testimonial } from '../../data/testimonials';
import { testimonials } from '../../data/testimonials';
import RevealItem from '../shared/RevealItem';

const isPlaceholderQuote = (q: string): boolean =>
  q.trim().startsWith('[Add a real student quote here]');

export default function Testimonials() {
  const [reducedMotion] = React.useState(
    typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  const realTestimonials = testimonials.filter(
    (t: Testimonial) => !isPlaceholderQuote(t.quote)
  );
  const hasOnlyPlaceholders =
    realTestimonials.length === 0 &&
    testimonials.length > 0;

  // If no real entries exist and we're not in dev with placeholder display,
  // don't render the section
  if (realTestimonials.length === 0 && !import.meta.env.DEV) {
    return null;
  }

  // Determine which testimonials to render
  const devPlaceholders = testimonials.slice(0, 3);
  const toRender = realTestimonials.length
    ? realTestimonials
    : devPlaceholders;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="eyebrow-italic">Student success.</span>
          <h2 className="font-playfair text-[44px] md:text-[56px] text-green-logo mb-6 tracking-tight">They Said.</h2>
        </div>

        {import.meta.env.DEV && hasOnlyPlaceholders && (
          <p className="text-center text-muted-aa mb-8">
            <strong>Add real student testimonials</strong> to {testimonials as any}.{''}.{''}
            {''}
            <em>Set quote, name, university, course, and year in src/data/testimonials.ts.</em>
          </p>
        )}

        <div className="relative overflow-hidden">
          {/* Featured large quote */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            {/* Featured quote takes first column in md, full width below */}
            <div className="md:col-span-1">
              {toRender.length > 0 && (
                <blockquote className="rounded-xl border border-bdr p-8 bg-cream-soft">
                  <p className="font-playfair italic text-lg leading-relaxed mb-6">
                    {toRender[0].quote}
                  </p>
                  <figcaption className="text-right">
                    <cite className="font-poppins font-semibold text-emerald-text">
                      {toRender[0].name}
                    </cite>
                    <div className="text-sm text-muted-aa mt-1">
                      {toRender[0].university} — {toRender[0].course} {toRender[0].year}
                    </div>
                  </figcaption>
                </blockquote>
              )}
            </div>

            {/* Two smaller cards */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {toRender.slice(1).map((t: Testimonial, i) => (
                <RevealItem key={t.name} delay={i * 200} type="fade-up">
                  <figure className="rounded-xl border border-bdr p-6 bg-white hover:shadow-lg transition-shadow duration-500 hover:-translate-y-1">
                    <img
                      src={t.photo || '/images/student-3.webp'}
                      alt={`
                        ${t.name} at ${t.university} — ${t.course}
                      `}
                      className="w-full h-40 object-cover rounded-t-xl mb-4"
                      width={400}
                      height={267}
                      loading="lazy"
                    />
                    <figcaption className="text-center text-xs text-muted-aa uppercase tracking-widest">
                      {t.name}
                    </figcaption>
                    <blockquote className="font-poppins font-medium text-emerald-text">
                      "{t.quote}"
                    </blockquote>
                    <p className="text-center text-muted-aa mt-2 text-sm">
                      {t.university} — {t.course} {t.year}
                    </p>
                  </figure>
                </RevealItem>
              ))}
              {toRender.length < 3 && (
                <p className="text-center text-muted-aa mt-8">
                  <em>Add real student testimonials to see them here.</em>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}