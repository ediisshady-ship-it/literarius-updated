import React from 'react';
import Hero from '../components/shared/Hero';
import ProofSection from '../components/home/ProofSection';
import ProcessSteps from '../components/home/ProcessSteps';
import Ticker from '../components/shared/Ticker';
import ImageBreak from '../components/home/ImageBreak';
import AllInOnePlace from '../components/home/AllInOnePlace';
import TheyGotIn from '../components/home/TheyGotIn';
import Testimonials from '../components/home/Testimonials';
import ArticlesSection from '../components/home/ArticlesSection';
import FinalCTA from '../components/shared/FinalCTA';
import LeadCapture from '../components/home/LeadCapture';
import StickyMobileCTA from '../components/home/StickyMobileCTA';

export default function Home() {
  return (
    <>
      <Hero
        imageSrc="/images/hero_home_bright.webp"
        imageAlt="Beautiful Australian university campus"
        italicLine=""
        heading={<>Connecting Ambitious<br />Students with World-Class<br />Education Opportunities.</>}
        subText="Your trusted admissions partner — guiding students worldwide to Australia's best universities through expert counselling, personalised support, and real results."
        ctaLabel="Book Free Consultation"
        ctaTo="/contact"
        secondaryLabel="View Our Results"
        secondaryTo="#proof"
        trustedBy={['University of Melbourne', 'UNSW Sydney', 'Monash University', 'ANU', 'University of Queensland', 'University of Sydney']}
      />
      <LeadCapture />
      <ProofSection />
      <ProcessSteps />
      <Ticker />
      <ImageBreak />
      <AllInOnePlace />
      <TheyGotIn />
      <Testimonials />
      <ArticlesSection />
      <FinalCTA
        heading={<>Your Australian University Journey<br />Starts Here.</>}
        italic="Let's Make It Happen."
        btnLabel="Book Free Consultation"
        btnTo="/contact"
      />
      <StickyMobileCTA />
    </>
  );
}