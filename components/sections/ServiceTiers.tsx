'use client';

import React from 'react';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Link } from '../../i18n/routing';
import { ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Zap, Crown, ArrowRightLeft, Users, FastForward, Bot, BarChart3 } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

/* ─── Tier visual config ─────────────────────────────────────────────────── */
type TierVariant = 'presence' | 'identity' | 'dominance' | 'migration' | 'aiMarketing' | 'humanMarketing' | 'simpleAuto' | 'advancedAuto';

const tierStyles: Record<TierVariant, {
  card: string;
  badge: string;
  badgeIcon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  dot: string;
  upgrade: string;
  imageFade: string;
}> = {
  presence: {
    card: 'bg-white dark:bg-[#020817] border border-gray-200 dark:border-white/10 shadow-lg',
    badge: 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white/80 border border-gray-200 dark:border-white/20',
    badgeIcon: <Zap className="h-3 w-3" />,
    eyebrow: 'text-gray-400 dark:text-white/40',
    title: 'text-gray-900 dark:text-white',
    description: 'text-gray-500 dark:text-white/60',
    ctaPrimary: 'bg-gray-900 dark:bg-teal-500 text-white dark:text-[#020817] hover:bg-gray-700 dark:hover:bg-teal-400',
    ctaSecondary: 'bg-transparent text-gray-700 dark:text-white/70 border border-gray-300 dark:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5',
    dot: 'text-gray-400 dark:text-teal-500/50',
    upgrade: 'text-gray-400 dark:text-white/40',
    imageFade: 'from-[#020817] to-[#020817]',
  },
  identity: {
    card: 'bg-[#00353F] border border-teal-500/40 shadow-[0_0_60px_-10px_rgba(20,184,166,0.35)]',
    badge: 'bg-teal-500 text-white border border-teal-400',
    badgeIcon: <Sparkles className="h-3 w-3" />,
    eyebrow: 'text-teal-400',
    title: 'text-white',
    description: 'text-white/70',
    ctaPrimary: 'bg-white text-[#00353F] hover:bg-teal-50 font-bold',
    ctaSecondary: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
    dot: 'text-teal-400',
    upgrade: 'text-teal-400/80',
    imageFade: 'from-[#00353F] to-[#00353F]',
  },
  dominance: {
    card: 'bg-[#08090d] border border-white/10 shadow-[0_0_80px_-15px_rgba(251,191,36,0.2)]',
    badge: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black border-0',
    badgeIcon: <Crown className="h-3 w-3" />,
    eyebrow: 'text-amber-400',
    title: 'text-white',
    description: 'text-white/60',
    ctaPrimary: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black hover:brightness-110 font-bold',
    ctaSecondary: 'bg-transparent text-white border border-white/20 hover:bg-white/5',
    dot: 'text-amber-400',
    upgrade: 'text-amber-400/70',
    imageFade: 'from-[#08090d] to-[#08090d]',
  },
  migration: {
    card: 'bg-[#1a1033] border border-purple-500/30 shadow-[0_0_60px_-10px_rgba(168,85,247,0.3)]',
    badge: 'bg-purple-600 text-white border border-purple-400',
    badgeIcon: <ArrowRightLeft className="h-3 w-3" />,
    eyebrow: 'text-purple-400',
    title: 'text-white',
    description: 'text-white/70',
    ctaPrimary: 'bg-purple-500 text-white hover:bg-purple-400 font-bold',
    ctaSecondary: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
    dot: 'text-purple-400',
    upgrade: 'text-purple-300',
    imageFade: 'from-[#1a1033] to-[#1a1033]',
  },
  aiMarketing: {
    card: 'bg-[#002b36] border border-cyan-500/30 shadow-[0_0_60px_-10px_rgba(6,182,212,0.3)]',
    badge: 'bg-cyan-600 text-white border border-cyan-400',
    badgeIcon: <FastForward className="h-3 w-3" />,
    eyebrow: 'text-cyan-400',
    title: 'text-white',
    description: 'text-white/70',
    ctaPrimary: 'bg-cyan-500 text-white hover:bg-cyan-400 font-bold',
    ctaSecondary: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
    dot: 'text-cyan-400',
    upgrade: 'text-cyan-300',
    imageFade: 'from-[#002b36] to-[#002b36]',
  },
  humanMarketing: {
    card: 'bg-[#2d1b10] border border-orange-500/30 shadow-[0_0_60px_-10px_rgba(249,115,22,0.3)]',
    badge: 'bg-orange-600 text-white border border-orange-400',
    badgeIcon: <Users className="h-3 w-3" />,
    eyebrow: 'text-orange-400',
    title: 'text-white',
    description: 'text-white/70',
    ctaPrimary: 'bg-orange-500 text-white hover:bg-orange-400 font-bold',
    ctaSecondary: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
    dot: 'text-orange-400',
    upgrade: 'text-orange-300',
    imageFade: 'from-[#2d1b10] to-[#2d1b10]',
  },
  simpleAuto: {
    card: 'bg-[#062016] border border-emerald-500/30 shadow-[0_0_60px_-10px_rgba(16,185,129,0.3)]',
    badge: 'bg-emerald-600 text-white border border-emerald-400',
    badgeIcon: <BarChart3 className="h-3 w-3" />,
    eyebrow: 'text-emerald-400',
    title: 'text-white',
    description: 'text-white/70',
    ctaPrimary: 'bg-emerald-500 text-white hover:bg-emerald-400 font-bold',
    ctaSecondary: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
    dot: 'text-emerald-400',
    upgrade: 'text-emerald-300',
    imageFade: 'from-[#062016] to-[#062016]',
  },
  advancedAuto: {
    card: 'bg-[#200606] border border-rose-500/30 shadow-[0_0_60px_-10px_rgba(244,63,94,0.3)]',
    badge: 'bg-rose-600 text-white border border-rose-400',
    badgeIcon: <Bot className="h-3 w-3" />,
    eyebrow: 'text-rose-400',
    title: 'text-white',
    description: 'text-white/70',
    ctaPrimary: 'bg-rose-500 text-white hover:bg-rose-400 font-bold',
    ctaSecondary: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
    dot: 'text-rose-400',
    upgrade: 'text-rose-300',
    imageFade: 'from-[#200606] to-[#200606]',
  },
};

export default function ServiceTiers() {
  const t = useTranslations('serviceTiers');
  const tServices = useTranslations('services');

  const sectionRef = useRef<HTMLElement>(null);
  const deckRef    = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Tier data ──────────────────────────────────────────────────────────── */
  const tiers = [
    // ── WEB CREATION TIERS ──────────────────────────────────────────────────
    {
      variant: 'presence' as TierVariant,
      eyebrow: t('static.eyebrow'),
      title: t('static.title'),
      description: t('static.description'),
      cta: t('static.cta'),
      badge: t('static.badge'),
      upgrade: t('static.upgrade'),
      features: [t('static.feature1'), t('static.feature2'), t('static.feature3'), t('static.feature4')],
      image: '/images/83d05d4a-01ac-4167-a5e4-d3dadde6e9df.avif',
      imageAlt: t('static.imageAlt'),
      href: '/services/presence',
    },
    {
      variant: 'identity' as TierVariant,
      eyebrow: t('standard.eyebrow'),
      title: t('standard.title'),
      description: t('standard.description'),
      cta: t('standard.cta'),
      badge: t('standard.badge'),
      upgrade: t('standard.upgrade'),
      features: [t('standard.feature1'), t('standard.feature2'), t('standard.feature3'), t('standard.feature4')],
      image: '/images/2c022d7e-81fe-4a9b-8ad3-ce3f7e0f359b.avif',
      imageAlt: t('standard.imageAlt'),
      href: '/services/identity',
    },
    {
      variant: 'dominance' as TierVariant,
      eyebrow: t('advanced.eyebrow'),
      title: t('advanced.title'),
      description: t('advanced.description'),
      cta: t('advanced.cta'),
      badge: t('advanced.badge'),
      upgrade: t('advanced.upgrade'),
      features: [t('advanced.feature1'), t('advanced.feature2'), t('advanced.feature3'), t('advanced.feature4')],
      image: '/images/57c3338e-f342-4ee9-b661-422e8418189d.avif',
      imageAlt: t('advanced.imageAlt'),
      href: '/services/dominance',
    },
    {
      variant: 'migration' as TierVariant,
      eyebrow: t('migration.eyebrow'),
      title: t('migration.title'),
      description: t('migration.description'),
      cta: t('migration.cta'),
      badge: t('migration.badge'),
      upgrade: t('migration.upgrade'),
      features: [t('migration.feature1'), t('migration.feature2'), t('migration.feature3'), t('migration.feature4')],
      image: '/images/ab2fef35-1c4a-4302-9e38-1dc0794539e8.avif',
      imageAlt: t('migration.imageAlt'),
      href: '/services/migration',
    },
    // ── OTHER SOLUTION TIERS ─────────────────────────────────────────────────
    {
      variant: 'aiMarketing' as TierVariant,
      eyebrow: t('aiMarketing.eyebrow'),
      title: t('aiMarketing.title'),
      description: t('aiMarketing.description'),
      cta: t('aiMarketing.cta'),
      badge: t('aiMarketing.badge'),
      upgrade: t('aiMarketing.upgrade'),
      features: [t('aiMarketing.feature1'), t('aiMarketing.feature2'), t('aiMarketing.feature3'), t('aiMarketing.feature4')],
      image: '/images/23c333ef-fb7f-4a47-acbc-a50b49fb3fd8.avif',
      imageAlt: t('aiMarketing.imageAlt'),
      href: '/services/ai-marketing',
    },
    {
      variant: 'humanMarketing' as TierVariant,
      eyebrow: t('humanMarketing.eyebrow'),
      title: t('humanMarketing.title'),
      description: t('humanMarketing.description'),
      cta: t('humanMarketing.cta'),
      badge: t('humanMarketing.badge'),
      upgrade: t('humanMarketing.upgrade'),
      features: [t('humanMarketing.feature1'), t('humanMarketing.feature2'), t('humanMarketing.feature3'), t('humanMarketing.feature4')],
      image: '/images/8c377ce8-99cc-44ef-9617-c0d570c3a9b4.avif',
      imageAlt: t('humanMarketing.imageAlt'),
      href: '/services/human-marketing',
    },
    {
      variant: 'simpleAuto' as TierVariant,
      eyebrow: t('simpleAutomation.eyebrow'),
      title: t('simpleAutomation.title'),
      description: t('simpleAutomation.description'),
      cta: t('simpleAutomation.cta'),
      badge: t('simpleAutomation.badge'),
      upgrade: t('simpleAutomation.upgrade'),
      features: [t('simpleAutomation.feature1'), t('simpleAutomation.feature2'), t('simpleAutomation.feature3'), t('simpleAutomation.feature4')],
      image: '/images/simple-automation-v2.avif',
      imageAlt: t('simpleAutomation.imageAlt'),
      href: '/services/simple-automation',
    },
    {
      variant: 'advancedAuto' as TierVariant,
      eyebrow: t('aiAgentAutomation.eyebrow'),
      title: t('aiAgentAutomation.title'),
      description: t('aiAgentAutomation.description'),
      cta: t('aiAgentAutomation.cta'),
      badge: t('aiAgentAutomation.badge'),
      upgrade: t('aiAgentAutomation.upgrade'),
      features: [t('aiAgentAutomation.feature1'), t('aiAgentAutomation.feature2'), t('aiAgentAutomation.feature3'), t('aiAgentAutomation.feature4')],
      image: '/images/ai-agent-automation.avif',
      imageAlt: t('aiAgentAutomation.imageAlt'),
      href: '/services/ai-automation',
    },
  ];

  const TOTAL = tiers.length;

  /* ── Mobile helpers ─────────────────────────────────────────────────────── */
  const scrollToIdx = (idx: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActiveIdx(idx);
  };

  /* ── Desktop scroll-driven deck ─────────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const deck    = deckRef.current;
    if (!section || !deck) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const cards = Array.from(deck.querySelectorAll<HTMLElement>('[data-card]'));
      if (!cards.length) return;

      gsap.set(cards, { 
        position: 'absolute', 
        inset: 0, 
        opacity: 0, 
        scale: 0.95, 
        filter: 'blur(10px)',
        zIndex: (i) => TOTAL - i
      });
      gsap.set(cards[0], { opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 100 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${TOTAL * 500}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < TOTAL - 1; i++) {
        const current = cards[i];
        const next    = cards[i + 1];

        tl.to(current, {
          opacity: 0,
          scale: 0.9,
          filter: 'blur(12px)',
          duration: 0.4,
          ease: 'power2.inOut',
          zIndex: 0
        });

        tl.fromTo(
          next,
          { opacity: 0, scale: 1.05, filter: 'blur(8px)', y: 30, zIndex: 10 },
          { 
            opacity: 1, 
            scale: 1, 
            filter: 'blur(0px)', 
            y: 0, 
            duration: 0.5, 
            ease: 'power3.out',
            zIndex: 100
          },
          '<0.1'
        );

        tl.to({}, { duration: 0.3 }); // Pause on each card
      }
    });

    return () => mm.revert();
  }, [TOTAL]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      aria-label="Web creation tiers and digital solutions"
      className="bg-gray-50 dark:bg-[#020817] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">

        {/* ── Section header — SEO h2 ─────────────────────────────────────── */}
        <div className="text-center pb-8 shrink-0">
          <span className="block text-xs md:text-sm font-mono text-teal-500 tracking-[0.5em] mb-2 uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black dark:from-white to-gray-600 dark:to-white/60">
              {t('title')}
            </span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full mt-3 shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* MOBILE — horizontal swipe carousel                                */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="md:hidden flex-1 flex flex-col overflow-hidden">
          <div
            ref={mobileTrackRef}
            className="flex flex-row flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory pb-4 flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardW = el.scrollWidth / TOTAL;
              const idx = Math.round(el.scrollLeft / cardW);
              setActiveIdx(Math.min(TOTAL - 1, Math.max(0, idx)));
            }}
          >
            {tiers.map((tier, i) => {
              const s = tierStyles[tier.variant];
              return (
                <article
                  key={i}
                  className={`snap-center shrink-0 w-[85vw] max-w-[340px] rounded-2xl overflow-hidden flex flex-col relative ${s.card}`}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.badge}`}>
                        {s.badgeIcon}
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={tier.image}
                      alt={tier.imageAlt}
                      fill
                      className={`object-cover ${'objectPosition' in tier ? (tier as any).objectPosition : 'object-center'}`}
                      sizes="340px"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${s.imageFade}/80 to-transparent`} />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <p className={`text-xs uppercase tracking-wider font-mono ${s.eyebrow}`}>{tier.eyebrow}</p>
                    <h3 className={`text-lg font-bold leading-snug ${s.title}`}>{tier.title}</h3>
                    <p className={`text-sm leading-relaxed line-clamp-3 ${s.description}`}>{tier.description}</p>

                    {/* Feature list for web tiers */}
                    {tier.features && (
                      <ul className="space-y-1.5 mt-1">
                        {tier.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2">
                            <CheckCircle2 className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${s.dot}`} />
                            <span className={`text-[11px] leading-snug ${s.description}`}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* CTAs */}
                    <div className="flex gap-2 mt-auto pt-3">
                      <button className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all ${s.ctaPrimary}`}>
                        <Link href={tier.href || "#contact"}>{tier.cta}</Link>
                      </button>
                      <button className={`flex-1 px-3 py-2 rounded-lg text-xs transition-all ${s.ctaSecondary}`}>
                        <Link href="#contact">{tServices('getQuote')}</Link>
                      </button>
                    </div>

                    {/* Upgrade path */}
                    {tier.upgrade && (
                      <p className={`text-[10px] text-center font-mono ${s.upgrade}`}>{tier.upgrade}</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {tiers.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIdx(i)}
                className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'w-5 h-2 bg-teal-500' : 'w-2 h-2 bg-gray-300 dark:bg-white/20'}`}
                aria-label={`Go to solution ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="flex justify-between items-center mt-3 px-1 pb-4">
            <button
              onClick={() => scrollToIdx(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="p-2 rounded-full border border-gray-300 dark:border-white/30 disabled:opacity-30 transition"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-white" />
            </button>
            <span className="text-sm text-gray-500 dark:text-white/50">{activeIdx + 1} / {TOTAL}</span>
            <button
              onClick={() => scrollToIdx(Math.min(TOTAL - 1, activeIdx + 1))}
              disabled={activeIdx === TOTAL - 1}
              className="p-2 rounded-full border border-gray-300 dark:border-white/30 disabled:opacity-30 transition"
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-white" />
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* DESKTOP — single card slot, GSAP swaps cards on scroll            */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div
          ref={deckRef}
          className="hidden md:block relative flex-1 max-w-4xl mx-auto w-full mb-4"
          style={{ minHeight: '440px' }}
        >
          {tiers.map((tier, index) => {
            const s = tierStyles[tier.variant];
            return (
              <article
                key={index}
                data-card
                aria-label={`${tier.eyebrow}: ${tier.title}`}
                className={`rounded-[1.25rem] overflow-hidden border shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] transform-gpu will-change-transform ${s.card}`}
              >
                <div className="grid grid-cols-2 h-full min-h-[440px]">

                  {/* Image side */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={tier.image}
                      alt={tier.imageAlt}
                      fill
                      className={`object-cover ${'objectPosition' in tier ? (tier as any).objectPosition : 'object-center'}`}
                      sizes="40vw"
                      priority={index === 0}
                    />
                    {/* Shimmer overlay for Dominance */}
                    {tier.variant === 'dominance' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent" />
                    )}
                    {/* Teal glow for Identity */}
                    {tier.variant === 'identity' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-transparent" />
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-transparent ${s.imageFade.replace('from-', 'to-')} opacity-90`} />
                  </div>

                  {/* Text side */}
                  <div className="flex flex-col h-full p-5 lg:p-7 relative z-10 overflow-hidden">
                    {/* Content Top - Scrollable if needed, but flex-1 pushes buttons down */}
                    <div className="flex-1 flex flex-col gap-3 min-h-0">
                      {/* Badge */}
                      {tier.badge && (
                        <div className="inline-flex">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${s.badge}`}>
                            {s.badgeIcon}
                            {tier.badge}
                          </span>
                        </div>
                      )}

                      {/* Eyebrow */}
                      <p className={`text-[10px] uppercase tracking-[0.2em] font-mono ${s.eyebrow}`}>
                        {tier.eyebrow}
                      </p>

                      {/* Title */}
                      <h3 className={`text-xl lg:text-2xl font-bold leading-tight ${s.title}`}>
                        {tier.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-xs lg:text-sm leading-relaxed line-clamp-2 ${s.description}`}>
                        {tier.description}
                      </p>

                      {/* Feature list */}
                      {tier.features && (
                        <ul className="space-y-1.5 mt-1">
                          {tier.features.slice(0, 3).map((f, fi) => (
                            <li key={fi} className="flex items-center gap-2">
                              <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${s.dot}`} />
                              <span className={`text-[11px] lg:text-xs ${s.description}`}>{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* CTAs Bottom - Stable Alignment */}
                    <div className="pt-5 mt-auto border-t border-white/5">
                      <div className="flex gap-3 mb-3">
                        <Button
                          size="sm"
                          asChild
                          className={`flex-1 h-10 text-[10px] font-black uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md ${s.ctaPrimary}`}
                        >
                          <Link href={tier.href || "#contact"}>{tier.cta}</Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className={`flex-1 h-10 text-[10px] transition-all hover:bg-white/10 ${s.ctaSecondary}`}
                        >
                          <Link href="#contact">{tServices('getQuote')}</Link>
                        </Button>
                      </div>

                      {/* Upgrade path - Reserved space for alignment */}
                      <div className="h-3 flex items-center justify-center">
                        {tier.upgrade && (
                          <p className={`text-[9px] font-bold uppercase tracking-widest ${s.upgrade}`}>
                            ↑ {tier.upgrade}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
