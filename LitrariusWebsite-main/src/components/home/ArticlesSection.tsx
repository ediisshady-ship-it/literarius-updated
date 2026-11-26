import React from 'react';
import { Link } from 'react-router-dom';

const articles = [
  {
    slug: 'how-to-apply-australian-university',
    title: 'How to Apply to an Australian University: A Step-by-Step Guide',
    date: 'Aug 28, 2026',
  },
  {
    slug: 'scholarship-strategy-australia',
    title: 'Scholarship Strategy: How to Maximise Your Funding for Australian Study',
    date: 'Aug 15, 2026',
  },
  {
    slug: 'australian-scholarships-guide',
    title: 'The Complete Guide to Australian University Scholarships',
    date: 'Sep 12, 2026',
  },
  {
    slug: 'ielts-vs-pte-australia',
    title: 'IELTS vs PTE: Which Should You Take for Your Australian University Application?',
    date: 'Sep 18, 2026',
  },
];

export default function ArticlesSection() {
  // Featured article for the large card (first matching article)
  const featured = articles[0];
  // Side cards: the 3 most recent other articles
  const sideArticles = articles.slice(1, 4);

  return (
    <section className="py-16 md:py-24 bg-dark-section">
      <div className="max-w-content mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <h2 className="text-white text-[32px] md:text-[44px] font-playfair tracking-tight mb-4 lg:mb-0">
            Study Australia: Resources & Guides
          </h2>
          <Link to="/blog" className="btn btn-outline-white btn-sm">View All Resources</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-5">
          {/* Featured */}
          <div className="rounded-xl overflow-hidden relative min-h-[340px]">
            <img
              src="/images/article-scholarship.webp"
              alt="Scholarship Guide"
              className="w-full h-full object-cover lazy-loading"
              loading="lazy"
              width="1200"
              height="400"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,30,20,0.92)] via-[rgba(0,0,0,0.2)] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block bg-emerald-700 text-white text-[11px] font-semibold px-3 py-1 rounded-full mb-3">
                Scholarship Guide
              </span>
              <div className="font-poppins font-semibold text-[19px] text-white leading-snug mb-2">
                {featured.title}
              </div>
              <div className="text-xs text-white/80">Updated {featured.date}</div>
            </div>
          </div>

          {/* Side cards */}
          <div className="flex flex-col gap-3">
            {sideArticles.map(({ slug, title, date }) => (
              <Link
                key={slug}
                to={`/blog/${slug}`}
                className="bg-white/[0.06] border border-white/10 rounded-lg px-4 py-3.5 hover:bg-white/[0.12] transition-colors group block"
              >
                <div className="text-[12px] text-white/80 mb-1.5">{date}</div>
                <div className="font-poppins font-semibold text-sm text-white/88 leading-snug transition-colors">
                  {title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}