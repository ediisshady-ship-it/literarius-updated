import React, { useState, useId, useRef, useEffect } from 'react';

interface FAQ { q: string; a: string; }

interface FAQAccordionProps {
  faqs: FAQ[];
  schema?: boolean;
}

export default function FAQAccordion({ faqs, schema = false }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLElement | null)>(null);
  const ids = useId();

  // Measure scrollHeight of the currently open answer for smooth height transition
  useEffect(() => {
    if (open !== null && answerRefs.current) {
      const el = answerRefs.current;
      // Force remeasure on open
      requestAnimationFrame(() => {
        if (el) {
          el.style.transition = 'max-height 0.4s ease-out';
          el.style.maxHeight = `${el.scrollHeight}px`;
        }
      });
    }
  }, [open]);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-2.5">
      {faqs.map(({ q, a }, i) => {
        const answerId = `${ids}-answer-${i}`;
        const buttonId = `${ids}-button-${i}`;
        const isOpen = open === i;

        return (
          <div
            key={i}
            className={`border-[1.5px] rounded-xl transition-colors ${isOpen ? 'border-green-em' : 'border-bdr'}`}
          >
            <button
              id={buttonId}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-white rounded-xl hover:bg-gray-50"
              aria-expanded={isOpen}
              aria-controls={isOpen ? answerId : undefined}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-inter font-semibold text-[14.5px] text-ink pr-4">{q}</span>
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-[17px] flex-shrink-0 transition-all duration-300
                  ${isOpen ? 'bg-coral-aa text-white rotate-45' : 'bg-coral-aa text-muted-aa'}`}
                aria-hidden="true"
              >
                {isOpen ? '-' : '+'}
              </span>
            </button>
            <div
              ref={(el) => {
                if (el) answerRefs.current = el;
              }}
              className="faq-answer"
              style={{
                maxHeight: isOpen ? '1000px' : '0',
                transition: 'max-height 0.4s ease-out',
              }}
              role="region"
              aria-labelledby={buttonId}
            >
              <p className="px-5 pb-4 text-muted-aa text-[14px] leading-relaxed">{a}</p>
            </div>
          </div>
        );
      })}

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((f, i) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.a,
                },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}