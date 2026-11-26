import React from 'react';
import { Link } from 'react-router-dom';
import RevealItem from '../../components/shared/RevealItem';

const subs = [
  {
    h3: 'Get in With the Right University Strategy',
    body: "Our expert counsellors match your academic profile to Australia's best programs, craft a personalised roadmap, and guide you through a flawless application.",
  },
  {
    h3: 'From Application to Admission',
    body: 'We support you from your first enquiry through university selection, course planning, and your final admission offer.',
  },
];

export default function AllInOnePlace() {
  return (
    <section id="collage" className="py-16 md:py-24 bg-white overflow-x-clip">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — sticky */}
          <div className="lg:sticky lg:top-20">
            <RevealItem delay={0} type="slide-left">
              <span className="font-poppins uppercase tracking-widest text-emerald-text text-xs font-bold mb-4 block">Everything You Need.</span>
            </RevealItem>
            <RevealItem delay={150} type="slide-left">
              <h2 className="font-playfair text-[32px] md:text-[44px] text-green-logo mb-6 tracking-tight">All in One Place.</h2>
            </RevealItem>
            <RevealItem delay={300} type="slide-left">
              <p className="text-lg text-muted-aa leading-relaxed mb-10">
                We guide students through every step — from university selection and course planning to application and admission.
                Trusted by students at Australia's top universities.
              </p>
            </RevealItem>
            
            {subs.map(({ h3, body }, i) => (
              <RevealItem key={h3} delay={450 + (i * 150)} type="slide-left" className="mb-8">
                <h3 className="font-poppins font-bold text-xl text-green-logo mb-2">{h3}</h3>
                <p className="text-base text-muted-aa leading-relaxed">{body}</p>
              </RevealItem>
            ))}
            
            <RevealItem delay={900} type="slide-left">
              <Link to="/contact" className="btn btn-coral mt-2 inline-block">Book Free Consultation</Link>
            </RevealItem>
          </div>

          {/* RIGHT — staggered student collage */}
          <div className="grid grid-cols-2 gap-4 md:gap-8 relative lg:mt-8">
            <div className="flex flex-col gap-4 md:gap-8 mt-12 md:mt-20">
              <RevealItem delay={300} type="fade-up">
                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 bg-white group">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src="/images/student-3.webp"
                      alt="Student admitted to University of Melbourne"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-cinematic-slow" loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6 border-t border-bdr">
                    <p className="text-xs uppercase tracking-widest text-muted-aa font-semibold">University of Melbourne</p>
                  </div>
                </div>
              </RevealItem>
              
              <RevealItem delay={600} type="fade-up">
                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 bg-white group">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src="/images/student-5.webp"
                      alt="Student admitted to University of Queensland"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-cinematic-slow" loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6 border-t border-bdr">
                    <p className="text-xs uppercase tracking-widest text-muted-aa font-semibold">University of Queensland</p>
                  </div>
                </div>
              </RevealItem>
            </div>
            
            <div className="flex flex-col gap-4 md:gap-8">
              <RevealItem delay={450} type="fade-up">
                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 bg-white group">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src="/images/student-2.webp"
                      alt="Student admitted to UNSW Sydney"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-cinematic-slow" loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6 border-t border-bdr">
                    <p className="text-xs uppercase tracking-widest text-muted-aa font-semibold">UNSW Sydney</p>
                  </div>
                </div>
              </RevealItem>
              
              <RevealItem delay={750} type="fade-up">
                <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-500 bg-white group relative">
                  <div className="absolute top-4 right-4 bg-emerald-700 text-white px-3 py-1.5 text-[11px] uppercase tracking-widest font-bold z-10 shadow-sm rounded-sm">
                    Scholarship
                  </div>
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <img
                      src="/images/student-1.webp"
                      alt="Student admitted to Monash University"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-cinematic-slow" loading="lazy"
                    />
                  </div>
                  <div className="p-5 md:p-6 border-t border-bdr">
                    <p className="text-xs uppercase tracking-widest text-muted-aa font-semibold">Monash University</p>
                  </div>
                </div>
              </RevealItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}