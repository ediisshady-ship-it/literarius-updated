import React from 'react';

const items = [
  { num: '700,000+', lbl: 'Intl Students in AU' },
  { num: '9',          lbl: 'Universities in Global Top 100' },
  { num: '200+',       lbl: 'Scholarship Recipients' },
  { num: 'AUD 20–45k', lbl: 'Annual Tuition Range' },
  { num: 'Free first consultation', lbl: '' },
  { num: 'Offers from 42+ partner universities', lbl: '' },
];

export default function Ticker() {
  const [reducedMotion] = React.useState(
    typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  return (
    <div
      role="region"
      aria-label="Key facts"
      className="bg-white border-t border-bdr border-b border-bdr py-5 overflow-hidden ticker-wrap"
    >
      <div className={`flex ${reducedMotion ? 'flex-wrap justify-center items-center gap-8 whitespace-normal' : 'whitespace-nowrap animate-marquee ticker-track'}`}>
        {items.map(({ num, lbl }, i) => (
          <span key={i} className="inline-flex items-baseline gap-1.5 px-10">
            <span className="font-poppins font-bold text-[18px] text-green-em">{num}</span>
            {lbl && <span className="text-sm text-charcoal">{lbl}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}