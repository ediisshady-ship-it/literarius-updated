import React from 'react';

interface PictureProps {
  src: string; // base path without extension (e.g., '/images/hero-home')
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Renders a <picture> element with AVIF + WebP sources,
 * falling back to the WebP/img for browsers that don't support AVIF.
 *
 * - If priority=true: loading eager + fetchpriority="high" (for LCP)
 * - If priority=false: loading lazy + decoding="async" (for below-the-fold)
 *
 * Image source priority:
 * 1. hero-{name}-768.webp (768px responsive variant, if exists)
 * 2. {src}.avif (if AVIF variant exists)
 * 3. {src}.webp (WebP fallback)
 * 4. {src}.{originalExt} (original format fallback)
 */
export default function Picture({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
}: PictureProps) {
  const isHeroOrCampus = src.includes('hero') || src.includes('campus');
  const hasAvif = priority || isHeroOrCampus; // AVIF for hero/campus or when priority is set
  const loading = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : undefined;

  // Determine the original file extension from src
  const originalExt = src.substring(src.lastIndexOf('.')).toLowerCase();
  const baseWithoutExt = src.replace(originalExt, '');

  return (
    <picture>
      {/* 768px responsive variant for hero and campus images */}
      {hasAvif && (src.includes('hero') || src.includes('campus')) && (
        <source
          srcSet={`${baseWithoutExt}-768.webp 768w, ${baseWithoutExt}-1024.webp 1024w`}
          sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 1000px, 1200px'}
          type='image/webp'
        />
      )}

      {/* AVIF source for hero and campus images */}
      {hasAvif && (
        <source
          srcSet={`${src}.avif`}
          type='image/avif'
        />
      )}

      {/* WebP source */}
      <source
        srcSet={`${src}.webp`}
        type='image/webp'
      />

      {/* Fallback to the original format (WebP/img if already converted, or the original file) */}
      {/* Use the original image with explicit width/height and loading attributes */}
      <img
        src={src + originalExt}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className || 'w-full h-full object-cover'}
        sizes={sizes}
      />
    </picture>
  );
}