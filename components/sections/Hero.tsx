'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Link } from '../../i18n/routing';
import { Button } from '../ui/button';
import Image from 'next/image';
import { gsap } from '../../lib/gsap';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (!heroRef.current) return;

        const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      // Title animation
      const acronymChars = contentRef.current?.querySelectorAll('.acronym-char');
      const lineRests = contentRef.current?.querySelectorAll('.line-rest');

      if (acronymChars?.length) {
        tl.fromTo(acronymChars, 
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out' }
        );
      }
      
      if (lineRests?.length) {
        tl.fromTo(lineRests,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
          '-=0.4'
        );
      }
      
      const firstParagraph = contentRef.current?.querySelector('p:nth-of-type(1)');
      if (firstParagraph) {
        tl.from(firstParagraph, {
          opacity: 0,
          y: 20,
          duration: 0.6,
        }, '-=0.4');
        const chars = contentRef.current?.querySelectorAll('.tagline-chars > span') || [];
        if (chars && chars.length) {
          tl.to(chars, {
            opacity: 1,
            duration: 0.02,
            stagger: 0.02,
          }, '-=0.3');
        }
      }
      
      // Description animation
      if (contentRef.current?.querySelector('p:nth-of-type(2)')) {
        tl.from(contentRef.current.querySelector('p:nth-of-type(2)'), {
          opacity: 0,
          y: 20,
          duration: 0.6,
        }, '-=0.3');
      }
      
      // Buttons animation
      if (contentRef.current?.querySelector('.flex')) {
        tl.from(contentRef.current.querySelector('.flex')?.children || [], {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
        }, '-=0.2');
      }

      // Animate images with parallax-like effect
      const imageContainers = imagesRef.current?.querySelectorAll('.relative') || [];
      imageContainers.forEach((img, index) => {
        tl.from(img, {
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          ease: 'power2.out',
        }, index === 0 ? '-=0.4' : `-=${0.6 - index * 0.1}`);
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="pt-20 pb-4 md:pt-24 md:pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:pl-0 lg:pr-8 xl:pl-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:ml-5">
          <div ref={contentRef} className="space-y-6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {t('acronymTitle').split('|').map((line, index) => {
                const isStaggered = true;
                const desktopIndent = isStaggered ? `${index * 8}px` : '0px';
                const firstChar = line.charAt(0);
                const restFull = line.slice(1);
                const lastSpace = restFull.lastIndexOf(' ');
                const beforeLast = lastSpace >= 0 ? restFull.slice(0, lastSpace) : '';
                const lastWord = lastSpace >= 0 ? restFull.slice(lastSpace + 1) : restFull;
                const shiftLastWord = locale === 'en' && /business$/i.test(line);
                
                return (
                  <span
                    key={index}
                    className="block mb-2 lg:mb-4 last:mb-0 ps-[var(--indent-mobile)] lg:ps-[var(--indent-desktop)]"
                    style={{ 
                      '--indent-mobile': '0px',
                      '--indent-desktop': desktopIndent 
                    } as React.CSSProperties}
                  >
                    <span className="acronym-char inline-block text-blue-600 text-5xl">{firstChar}</span>
                    <span className="line-rest inline-block">
                      {beforeLast}
                      {beforeLast ? ' ' : ''}
                      <span className={shiftLastWord ? 'inline-block' : ''}>{lastWord}</span>
                    </span>
                  </span>
                );
              })}
            </h1>
            
            {(() => {
              const tagline = t('tagline');
              const parts = tagline.trim().split(/\s+/);
              const firstWord = parts[0] || '';
              const rest = tagline.slice(tagline.indexOf(firstWord) + firstWord.length);
              if (locale === 'ar') {
                const tokens = rest.split(/(\s+)/);
                return (
                  <p className="text-xl font-semibold text-gray-600">
                    <span className="text-blue-600">{firstWord}</span>
                    {rest ? ' ' : ''}
                    <span className="tagline-chars whitespace-pre">
                      {tokens.map((tok, i) =>
                        tok.trim() === '' ? (
                          <span key={i}>{'\u00A0'}</span>
                        ) : (
                          <span key={i} className="inline-block opacity-0">{tok}</span>
                        )
                      )}
                    </span>
                  </p>
                );
              }
              return (
                <p className="text-xl font-semibold text-gray-600">
                  <span className="text-blue-600">{firstWord}</span>
                  {rest ? ' ' : ''}
                  <span className="tagline-chars whitespace-pre">
                    {rest.split('').map((ch, i) => (
                      <span key={i} className="inline-block opacity-0">{ch === ' ' ? '\u00A0' : ch}</span>
                    ))}
                  </span>
                </p>
              );
            })()}
            
            <p className="text-lg text-gray-600 max-w-lg">
              {t('description')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="#contact">{t('ctaPrimary')}</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#services">{t('ctaSecondary')}</Link>
              </Button>
            </div>
          </div>

          <div ref={imagesRef} className="hidden lg:grid grid-cols-2 gap-3 max-w-[85%] ml-auto">
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border-2 w-full" style={{ aspectRatio: '2/3', borderColor: '#00353f' }}>
                <Image
                  src="/images/4e140827-456d-4ff7-9e0d-7981e1b0f875.avif"
                  alt="Employee interacting with software"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="relative rounded-lg overflow-hidden border-2 w-full" style={{ aspectRatio: '4/3', borderColor: '#00353f' }}>
                <Image
                  src="/images/23c333ef-fb7f-4a47-acbc-a50b49fb3fd8.avif"
                  alt="Professional office space"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative rounded-lg overflow-hidden border-2 w-full" style={{ aspectRatio: '4/3', borderColor: '#00353f' }}>
                <Image
                  src="/images/de1af6e6-8353-41e6-a3dc-a830586eb82d.avif"
                  alt="AI innovations"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
