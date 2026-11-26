import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const cards = [
  {
    uni: 'University of Melbourne',
    label: 'Masters in Business Administration',
    img: '/images/campus-unimelb.webp',
    alt: 'Old Arts Building, University of Melbourne'
  },
  {
    uni: 'UNSW Sydney',
    label: 'Computer Science',
    img: '/images/campus-unsw.webp',
    alt: 'John Niland Scientia Building, UNSW Sydney'
  },
  {
    uni: 'Monash University',
    label: 'Business Management',
    img: '/images/campus-monash.webp',
    alt: 'Robert Menzies Building, Monash University Clayton Campus'
  },
  {
    uni: 'University of Queensland',
    label: 'Engineering',
    img: '/images/campus-uq.webp',
    alt: 'Forgan Smith Building and Great Court, University of Queensland'
  },
  {
    uni: 'Australian National University',
    label: 'International Relations',
    img: '/images/campus-anu.webp',
    alt: 'Kambri Cultural Precinct, Australian National University Acton Campus'
  },
];

export default function TheyGotIn() {
  const [reducedMotion, setReducedMotion] = React.useState(
    typeof window !== 'undefined' && (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  );

  return (
    <section id="universities" className="py-16 md:py-24 bg-white">
      <div className="max-w-content mx-auto px-6">
        <div className="text-center mb-16">
          <span className="eyebrow-italic">They Got In.</span>
          <h2 className="font-playfair text-[44px] md:text-[56px] text-green-logo mb-6 tracking-tight">You Can Too.</h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-16"
        >
          {cards.map(({ uni, label, img, alt }) => (
            <SwiperSlide key={uni}>
              <a
                href="/australia#universities"
                className="relative rounded-2xl overflow-hidden h-[450px] group cursor-default"
                style={{ textDecoration: 'none' }}
              >
                <img
                  src={img}
                  alt={alt || uni}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] ease-cinematic-slow group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,30,20,0.95)] via-[rgba(6,30,20,0.4)] to-transparent opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="bg-emerald-700 text-white text-[11px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm w-fit mb-4 shadow-sm">
                    Admitted
                  </div>
                  <h3 className="font-playfair text-2xl lg:text-3xl text-white mb-2">{uni}</h3>
                  <div className="font-poppins font-semibold text-[14px] text-emerald-300 mb-4">{label}</div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}