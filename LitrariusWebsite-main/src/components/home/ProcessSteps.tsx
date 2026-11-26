import React from 'react';
import RevealItem from '../shared/RevealItem';

const steps = [
  {
    number: '1',
    title: 'Free consultation',
    description: 'Discuss your academic background, goals, and preferences with our expert counsellors.',
    icon: 'M8 12h.8l1 1 6-6 6 6 1-1H8z',
  },
  {
    number: '2',
    title: 'University & course shortlist',
    description: 'We match your profile to Australia\'s best programs and craft a personalised roadmap.',
    icon: 'M12 22s8-5 8-14V4h-8v6-4V4h-8v6-4V4H4v16h8l8-8z',
  },
  {
    number: '3',
    title: 'Application & scholarship support',
    description: 'We prepare and submit your applications and scholarship requests with precision and care.',
    icon: 'M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 7v5h2v-5H18',
  },
  {
    number: '4',
    title: 'Offer & next steps',
    description: 'Receive your offer and we guide you through visa, housing, and enrollment.',
    icon: 'M12 2l-6 6h6l-5 5h2l5-5h6l-6 6V2z',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export default function ProcessSteps() {
  const [reducedMotion] = React.useState(
    typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  return (
    <section id="process" className="py-16 md:py-24 bg-cream-soft">
      <div className="max-w-content mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="eyebrow-italic">How It Works.</span>
          <h2 className="font-playfair text-[32px] md:text-[44px] text-green-logo mb-6 tracking-tight">Our Process.</h2>
        </div>

        <ol className="relative flex flex-col md:flex-row items-start gap-4 md:w-full md:items-start">
          {steps.map((step, i) => (
            <li
              key={step.number}
              className={`relative w-full md:w-[25%] flex flex-col items-center gap-2 transition-all duration-700 ease-cinematic ${reducedMotion ? 'opacity-100' : 'opacity-0 translate-y-12'} reveal-stagger`}
            >
              <RevealItem delay={i * 150} type="fade-up">
                <div className="relative flex-1 flex justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-green-logo rounded-full border-2 border-bdr ring-2 ring-green-logo/20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {step.icon}
                  </svg>
                  <span className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-logo text-xs font-bold">{step.number}</span>
                </div>
                <h3 className="font-poppins font-bold text-lg text-green-logo mb-2">{step.title}</h3>
                <p className="text-sm text-muted-aa leading-relaxed">{step.description}</p>
              </RevealItem>
            </li>
          ))}
        </ol>

        {/* Desktop connecting line */}
        <div className="absolute inset-0 md:inset-0 pointer-events-none md:w-full md:h-1 md:bg-bdr md:opacity-50 md:translate-x-1/2 md:translate-y-1/2 transform md:rotate-45 md:origin-center"></div>
      </div>
    </section>
  );
}