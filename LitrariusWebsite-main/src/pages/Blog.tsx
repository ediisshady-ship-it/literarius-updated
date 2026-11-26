import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MiniCTABar from '../components/shared/MiniCTABar';
import RevealItem from '../components/shared/RevealItem';
import Picture from '../components/shared/Picture';
import { articles } from '../data/articles';

const categories = ['All', 'Study in Australia', 'Universities', 'IELTS & PTE', 'Scholarships', 'Courses', 'Student Life', 'Admissions'];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = articles.find(a => a.featured);
  
  const filteredArticles = articles.filter(a => {
    if (a.featured && activeCategory === 'All' && !searchQuery) return false; // Hide featured from grid if no filters applied
    const matchCategory = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-cream-soft min-h-screen">
      {/* Blog Editorial Hero */}
      <section className="pt-28 pb-16 lg:pt-[130px] lg:pb-20 px-6 border-b border-bdr bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/images/bg-pattern.webp')] opacity-5 mix-blend-multiply pointer-events-none" />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <RevealItem delay={0} type="fade-up">
            <div className="max-w-3xl">
              <span className="font-poppins uppercase tracking-widest emerald-text text-xs font-bold mb-6 block">The Literarius Journal</span>
              <h1 className="font-playfair text-[38px] md:text-[52px] lg:text-[68px] leading-[1.05] text-green-logo mb-8 tracking-tight">
                Study Australia.<br />
                <span className="italic text-charcoal/80">Insights that move you forward.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-aa leading-relaxed">
                Expert advice, strategic guidance, and insights on university admissions, scholarships, and building your academic future in Australia.
              </p>
            </div>
          </RevealItem>
        </div>
      </section>

      {/* Featured Article (only shows when 'All' is selected and no search query) */}
      {activeCategory === 'All' && !searchQuery && featuredArticle && (
        <RevealItem delay={0} type="fade-up">
          <section className="py-24 px-6 max-w-[1200px] mx-auto border-b border-bdr">
            <span className="font-poppins uppercase tracking-widest text-charcoal/50 text-xs font-bold mb-8 block">Featured Story</span>
            <Link to={`/blog/${featuredArticle.slug}`} className="group block" aria-label={featuredArticle.title}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div className="rounded-2xl overflow-hidden shadow-md aspect-video lg:aspect-[4/3] relative">
                  <Picture
                    src={featuredArticle.img.replace('/images/', '/images/').replace('.webp', '')}
                    alt={featuredArticle.title}
                    width={640}
                    height={480}
                    priority={false}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-cinematic-slow group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-poppins font-bold uppercase tracking-widest text-green-logo">
                    {featuredArticle.category}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-xs font-semibold text-muted-aa uppercase tracking-widest mb-6">
                    <span>{featuredArticle.date}</span>
                    <span className="w-1 h-1 rounded-full bg-green-em" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <h2 className="font-playfair text-[40px] lg:text-[52px] leading-[1.1] text-green-logo line-clamp-2 mb-2 group-hover:text-emerald-text transition-colors tracking-tight">
                    {featuredArticle.title}
                  </h2>
                  <p className="line-clamp-3 text-lg text-charcoal/80 leading-relaxed mb-8">
                    {featuredArticle.excerpt}
                  </p>
                  <span className="font-poppins font-bold text-sm tracking-widest uppercase emerald-text group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                    Read Article <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        </RevealItem>
      )}

      {/* Blog Grid & Filters */}
      <section className="py-24 px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          
          {/* Categories */}
          <div role="group" aria-label="Filter articles by category" className="flex gap-2 overflow-x-auto snap-x py-2 lg:py-3 flex-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`px-3 py-2 rounded-full text-[12px] font-semibold transition-all duration-300 
                  snap-start 
                  ${activeCategory === cat 
                    ? 'bg-green-logo text-white' 
                    : 'bg-white border border-bdr text-charcoal hover:border-green-logo hover:text-green-logo'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-[320px] flex items-center">
            <span className="sr-only">Search insights</span>
            <input 
              type="text" 
              id="blog-search-input"
              name="search"
              placeholder="Search insights..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-bdr rounded-full px-6 py-3.5 text-sm text-charcoal focus:outline-none focus:border-green-logo transition-colors"
              aria-label="Search insights"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-charcoal/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-3 text-charcoal/30 p-1 rounded hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-green-em/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>
          
        </div>

        {/* The Grid (Asymmetrical / Editorial) */}
        {filteredArticles.length > 0 ? (
          <>
            <div className="sr-only" aria-live="polite" aria-atomic="true">
              {filteredArticles.length} articles found
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
              {filteredArticles.map((article, i) => (
                <Link 
                  key={article.slug} 
                  to={`/blog/${article.slug}`} 
                  className="block"
                  aria-label={article.title}
                >
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-8 shadow-sm relative">
                    <Picture
                      src={article.img.replace('/images/', '/images/').replace('.webp', '')}
                      alt={article.title}
                      width={640}
                      height={480}
                      priority={false}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-cinematic-slow group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[12px] font-poppins font-bold uppercase tracking-widest text-green-logo rounded-sm shadow-sm">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair text-[28px] md:text-[32px] leading-[1.2] text-green-logo line-clamp-2 mb-2 group-hover:text-emerald-text transition-colors tracking-tight">
                      {article.title}
                    </h3>
                    <p className="line-clamp-3 text-charcoal/80 leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-[12px] font-semibold text-muted-aa uppercase tracking-widest mb-4">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-green-em" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          activeCategory !== 'All' || searchQuery !== '' ? (
            <div className="text-center py-24 bg-white border border-bdr rounded-2xl">
              <h3 className="font-playfair text-2xl text-green-logo mb-2">No articles found</h3>
              <p className="text-muted-aa">Try adjusting your search or category filters.</p>
              <button onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
}} className="mt-4 btn btn-outline-dark">Clear filters</button>
            </div>
          ) : null
        )}
      </section>

      <MiniCTABar />
    </div>
  );
}
