import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import MiniCTABar from '../components/shared/MiniCTABar';
import { articles } from '../data/articles';
import NotFound from '../pages/NotFound';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const progressBarRef = useRef<HTMLDivElement>(null);

  const article = articles.find(a => a.slug === slug);

  // Use document title and meta description
  useDocumentTitle({
    title: article ? `${article.title} | Literarius` : 'Article Not Found | Literarius',
    description: article ? article.excerpt : undefined,
  });

  if (!article) {
    return <NotFound />;
  }

  // Get related articles: same category first, then fall back to latest
  const relatedByCategory = articles.filter(a => a.category === article.category && a.slug !== slug);
  const related = relatedByCategory.length >= 3 
    ? relatedByCategory.slice(0, 3) 
    : [...relatedByCategory, ...articles.filter(a => a.category !== article.slug && a.slug !== slug).slice(0, 3 - relatedByCategory.length)];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="bg-white min-h-screen relative">
      
      {/* Scroll Progress Bar */}
      <div 
        ref={progressBarRef}
        className="fixed top-0 left-0 h-1 bg-emerald-500 z-50 transition-all duration-150 ease-out"
        style={{ width: '0%' }}
      />

      {/* Back to all articles link */}
      <div className="fixed top-6 left-6 z-10">
        <Link to="/blog" className="btn btn-outline-dark flex items-center gap-2">
          ← Back to all articles
        </Link>
      </div>

      {/* Editorial Article Hero */}
      <section className="pt-28 pb-16 lg:pt-[130px] lg:pb-16 px-6 max-w-[1000px] mx-auto text-center opacity-0 animate-fadeUp" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-center gap-3 text-xs font-poppins font-bold uppercase tracking-widest mb-8">
          <span className="text-green-logo bg-emerald-100 px-3 py-1.5 rounded-sm">{article.category}</span>
          <span className="text-muted-aa">{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-bdr" />
          <span className="text-muted-aa">{article.readTime}</span>
        </div>
        
        <h1 className="font-playfair text-[38px] md:text-[52px] lg:text-[64px] leading-[1.05] text-green-logo mb-12 tracking-tight">
          {article.title}
        </h1>
        
        <p className="text-xl md:text-2xl text-charcoal/80 font-playfair italic max-w-[68ch] mx-auto leading-relaxed">
          {article.excerpt}
        </p>
      </section>

      {/* Featured Image */}
      <section className="px-6 max-w-[1200px] mx-auto mb-20 opacity-0 animate-fadeUp" style={{ animationDelay: '300ms' }}>
        <div className="w-full md:w-full md:aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
          <img src={article.img} alt={article.title} loading="lazy" decoding="async" width="1200" height="514" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 max-w-[68ch] mx-auto mb-32 opacity-0 animate-fadeUp" style={{ animationDelay: '500ms' }}>
        <div className="prose prose-lg prose-emerald max-w-none 
          prose-headings:font-playfair prose-headings:text-green-logo prose-headings:font-normal prose-headings:tracking-tight
          prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
          prose-p:font-inter prose-p:text-charcoal/80 prose-p:leading-[1.8] prose-p:mb-8
          prose-blockquote:font-playfair prose-blockquote:italic prose-blockquote:text-emerald-text 
          prose-blockquote:border-l-4 prose-blockquote:border-green-em prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:my-12
          prose-blockquote:bg-emerald-50 prose-blockquote:rounded-r-lg
          a:underline a:hover:text-emerald-text a:focus-visible:outline-none a:focus-visible:ring-2 a:focus-visible:ring-green-em/20
        "
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />
        
        <div className="mt-16 pt-8 border-t border-bdr flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-logo flex items-center justify-center text-white font-playfair italic text-xl">
            L
          </div>
          <div>
            <div className="font-poppins font-bold text-sm text-green-logo uppercase tracking-widest">{article.author}</div>
            <div className="text-xs text-muted-aa">Literarius Education Experts</div>
          </div>
        </div>
      </section>

      {/* In-Article CTA */}
      <section className="px-6 max-w-[1000px] mx-auto mb-32">
        <div className="bg-green-logo rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/bg-pattern.webp')] bg-cover mix-blend-overlay" />
          <div className="relative z-10">
            <h3 className="font-playfair text-3xl md:text-5xl text-white mb-6">Ready to apply?</h3>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
              Our experts can evaluate your profile and map out your personalized journey to Australia's top institutions.
            </p>
            <Link to="/contact" className="btn bg-white text-green-logo hover:bg-gray-100 px-8 py-4 uppercase font-bold tracking-widest text-sm">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-24 bg-cream-soft border-t border-bdr">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
<h2 className="font-playfair text-[40px] lg:text-[52px] text-green-logo mb-8 tracking-tight">Keep Reading</h2>
            <Link to="/blog" className="text-sm font-poppins font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors hidden md:block">
              View All Insights →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {related.map(rel => (
              <Link key={rel.slug} to={`/blog/${rel.slug}`} className="group flex gap-6 items-center bg-white p-4 rounded-xl border border-bdr hover:shadow-md transition-shadow">
                <div className="w-1/3 aspect-square rounded-lg overflow-hidden flex-shrink-0">
                  <img src={rel.img} alt={rel.title} loading="lazy" decoding="async" width="200" height="200" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <div>
                  <div className="text-[12px] font-poppins font-bold uppercase tracking-widest text-muted-aa mb-2">
                    {rel.category}
                  </div>
                  <h4 className="font-playfair text-xl md:text-2xl text-green-logo leading-tight group-hover:text-emerald-text transition-colors tracking-tight">
                    {rel.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/blog" className="btn btn-outline-dark">View All Insights</Link>
          </div>
        </div>
      </section>

      <MiniCTABar />
    </div>
  );
}