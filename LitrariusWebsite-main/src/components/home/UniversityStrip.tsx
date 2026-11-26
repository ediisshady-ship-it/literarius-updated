import React from 'react';
import { site } from '../../data/site';

/**
 * University strip - text-based partner universities row.
 * Uses the university names already referenced on the site.
 * Static on reduced motion.
 */
const partnerUniversities = [
  'University of Melbourne',
  'UNSW Sydney',
  'Monash University',
  'Australian National University',
  'University of Queensland',
  'University of Sydney',
];

interface UniversityStripProps {
  reducedMotion?: boolean;
}

export default function UniversityStrip({ reducedMotion }: UniversityStripProps = {}) {
  return (
    <section id="partner-universities" className="py-8 md:py-12 bg-white">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="eyebrow-italic">Partner institutions.</span>
          <h2 className="font-playfair text-[32px] md:text-[44px] text-green-logo mb-6 tracking-tight">
            Universities we partner with.
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {partnerUniversities.map((uni, i) => (
            <div
              key={uni}
              className={`text-center ${
                reducedMotion ? 'animate-none' : 'opacity-0 translate-y-12 transition-all duration-700 ease-cinematic'
              } reveal`}
            >
              <span className="font-playfair text-[24px] md:text-[32px] text-green-logo mb-2 block">{uni}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}