'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from '../../i18n/routing';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function ServiceTiers() {
  const t = useTranslations('serviceTiers');
  const tServices = useTranslations('services');
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const tiers = [
    {
      eyebrow: t('static.eyebrow'),
      title: t('static.title'),
      description: t('static.description'),
      cta: t('static.cta'),
      image: '/images/83d05d4a-01ac-4167-a5e4-d3dadde6e9df.avif',
      imageAlt: t('static.imageAlt'),
      aspectRatio: 'aspect-[3/2]',
    },
    {
      eyebrow: t('standard.eyebrow'),
      title: t('standard.title'),
      description: t('standard.description'),
      cta: t('standard.cta'),
      image: '/images/2c022d7e-81fe-4a9b-8ad3-ce3f7e0f359b.avif',
      imageAlt: t('standard.imageAlt'),
      aspectRatio: 'aspect-[3/2]',
    },
    {
      eyebrow: t('advanced.eyebrow'),
      title: t('advanced.title'),
      description: t('advanced.description'),
      cta: t('advanced.cta'),
      image: '/images/57c3338e-f342-4ee9-b661-422e8418189d.avif',
      imageAlt: t('advanced.imageAlt'),
      aspectRatio: 'aspect-[3/2]',
    },
    {
      eyebrow: t('aiMarketing.eyebrow'),
      title: t('aiMarketing.title'),
      description: t('aiMarketing.description'),
      cta: t('aiMarketing.cta'),
      image: '/images/23c333ef-fb7f-4a47-acbc-a50b49fb3fd8.avif',
      imageAlt: t('aiMarketing.imageAlt'),
      aspectRatio: 'aspect-[3/2]',
    },
    {
      eyebrow: t('humanMarketing.eyebrow'),
      title: t('humanMarketing.title'),
      description: t('humanMarketing.description'),
      cta: t('humanMarketing.cta'),
      image: '/images/8c377ce8-99cc-44ef-9617-c0d570c3a9b4.avif',
      imageAlt: t('humanMarketing.imageAlt'),
      aspectRatio: 'aspect-[3/2]',
    },
    {
      eyebrow: t('simpleAutomation.eyebrow'),
      title: t('simpleAutomation.title'),
      description: t('simpleAutomation.description'),
      cta: t('simpleAutomation.cta'),
      image: '/images/simple-automation-v2.avif',
      imageAlt: t('simpleAutomation.imageAlt'),
      objectPosition: 'object-left',
      aspectRatio: 'aspect-[156/74]',
    },
    {
      eyebrow: t('aiAgentAutomation.eyebrow'),
      title: t('aiAgentAutomation.title'),
      description: t('aiAgentAutomation.description'),
      cta: t('aiAgentAutomation.cta'),
      image: '/images/ai-agent-automation.avif',
      imageAlt: t('aiAgentAutomation.imageAlt'),
      objectPosition: 'object-left',
      aspectRatio: 'aspect-video',
    },
  ];

  const TOTAL = tiers.length;

  /* ── mobile navigation helpers ── */
  const scrollToIdx = (idx: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActiveIdx(idx);
  };

  /* ── GSAP sticky stack — desktop only ── */
  useEffect(() => {
    if (!containerRef.current) return;

    // Only run on desktop — matchMedia prevents mobile execution
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      // Double-check element is visible before pinning
      if (!containerRef.current || getComputedStyle(containerRef.current).display === 'none') return;

      const ctx = gsap.context(() => {
        const cards = containerRef.current?.querySelectorAll('[data-sticky-card]') || [];
        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 120px',
            end: () => `+=${card.clientHeight * 0.8}`,
            pin: true,
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: gsap.timeline()
              .to(card, { 
                opacity: 0, 
                scale: 0.92, 
                filter: 'blur(25px)', 
                y: -60, 
                duration: 1, 
                ease: 'power2.in' 
              }),
          });
        });
      }, containerRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="solutions" className="py-12 md:py-24 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
            <span className="block text-xs md:text-sm font-mono text-teal-500 tracking-[0.5em] mb-3">
              {t('eyebrow')}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black dark:from-white to-gray-600 dark:to-white/60">
              {t('title')}
            </span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
        </div>

        {/* ── MOBILE: horizontal swipe carousel ── */}
        <div className="md:hidden">
          {/* swipe track */}
          <div
            ref={mobileTrackRef}
            className="flex flex-row flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardW = el.scrollWidth / TOTAL;
              const idx = Math.round(el.scrollLeft / cardW);
              setActiveIdx(Math.min(TOTAL - 1, Math.max(0, idx)));
            }}
          >
            {tiers.map((tier, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[85vw] max-w-[340px] bg-[#00353F]/90 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col"
              >
                {/* image */}
                <div className={`relative w-full ${tier.aspectRatio || 'aspect-video'} overflow-hidden`}>
                  <Image
                    src={tier.image}
                    alt={tier.imageAlt}
                    fill
                    className={`object-cover ${tier.objectPosition || 'object-center'}`}
                    sizes="340px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00353F]/80 to-transparent" />
                </div>
                {/* text */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <p className="text-xs uppercase tracking-wider text-white/60">{tier.eyebrow}</p>
                  <h3 className="text-lg font-bold text-white leading-snug">{tier.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed line-clamp-3">{tier.description}</p>
                  <div className="flex gap-2 mt-auto pt-2">
                    <Button
                      size="sm"
                      asChild
                      className="flex-1 bg-white text-[#00353F] hover:bg-white/90 text-xs font-semibold"
                    >
                      <Link href="#contact">{tier.cta}</Link>
                    </Button>
                    <Button
                      size="sm"
                      asChild
                      variant="outline"
                      className="flex-1 bg-white/10 text-white hover:bg-white/20 border-white/20 text-xs"
                    >
                      <Link href="#contact">{tServices('getQuote')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="flex justify-center gap-2 mt-4">
            {tiers.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-5 h-2 bg-[#00353F]' : 'w-2 h-2 bg-[#00353F]/30'
                }`}
                aria-label={`Go to tier ${i + 1}`}
              />
            ))}
          </div>

          {/* prev / next */}
          <div className="flex justify-between items-center mt-4 px-1">
            <button
              onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="p-2 rounded-full border border-gray-300 dark:border-white/30 disabled:opacity-30 transition"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-white" />
            </button>
            <span className="text-sm text-gray-500 dark:text-white/50">
              {activeIdx + 1} / {TOTAL}
            </span>
            <button
              onClick={() => scrollToIdx(Math.min(TOTAL - 1, activeIdx + 1))}
              disabled={activeIdx === TOTAL - 1}
              className="p-2 rounded-full border border-gray-300 dark:border-white/30 disabled:opacity-30 transition"
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-white" />
            </button>
          </div>
        </div>

        {/* ── DESKTOP: original sticky stack ── */}
        <div ref={containerRef} className="hidden md:block max-w-5xl mx-auto px-4 relative">
          {tiers.map((tier, index) => (
            <div
              key={index}
              data-sticky-card
              className={`bg-[#00353F]/85 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 transform-gpu will-change-transform brightness-110 ${index !== 0 ? '-mt-32' : ''}`}
              style={{
                transformOrigin: 'center center',
                zIndex: index + 1,
                backfaceVisibility: 'hidden',
              }}
            >
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={`relative ${tier.aspectRatio || 'aspect-video'} rounded-lg overflow-hidden`}>
                      <Image
                        src={tier.image}
                        alt={tier.imageAlt}
                        fill
                        className={`object-cover ${tier.objectPosition || 'object-center'}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm uppercase tracking-wider text-white/70">{tier.eyebrow}</p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{tier.title}</h3>
                      <p className="text-lg text-white/80">{tier.description}</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          size="lg"
                          asChild
                          className="flex-1 bg-[#00353F] text-white hover:bg-[#00353F]/90 dark:bg-white dark:text-[#00353F] dark:hover:bg-white/90 border border-white/10 shadow-lg"
                        >
                          <Link href="#contact">{tier.cta}</Link>
                        </Button>
                        <Button
                          size="lg"
                          asChild
                          variant="outline"
                          className="flex-1 bg-white/10 text-white hover:bg-white/20 border-white/20 shadow-lg"
                        >
                          <Link href="#contact">{tServices('getQuote')}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
