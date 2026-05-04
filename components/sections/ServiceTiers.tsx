'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Link } from '../../i18n/routing';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServiceTiers() {
  const t = useTranslations('serviceTiers');
  const tServices = useTranslations('services');

  // ── refs ────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);   // outer section — gets pinned
  const deckRef    = useRef<HTMLDivElement>(null); // single "card slot"
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
    },
    {
      eyebrow: t('standard.eyebrow'),
      title: t('standard.title'),
      description: t('standard.description'),
      cta: t('standard.cta'),
      image: '/images/2c022d7e-81fe-4a9b-8ad3-ce3f7e0f359b.avif',
      imageAlt: t('standard.imageAlt'),
    },
    {
      eyebrow: t('advanced.eyebrow'),
      title: t('advanced.title'),
      description: t('advanced.description'),
      cta: t('advanced.cta'),
      image: '/images/57c3338e-f342-4ee9-b661-422e8418189d.avif',
      imageAlt: t('advanced.imageAlt'),
    },
    {
      eyebrow: t('aiMarketing.eyebrow'),
      title: t('aiMarketing.title'),
      description: t('aiMarketing.description'),
      cta: t('aiMarketing.cta'),
      image: '/images/23c333ef-fb7f-4a47-acbc-a50b49fb3fd8.avif',
      imageAlt: t('aiMarketing.imageAlt'),
    },
    {
      eyebrow: t('humanMarketing.eyebrow'),
      title: t('humanMarketing.title'),
      description: t('humanMarketing.description'),
      cta: t('humanMarketing.cta'),
      image: '/images/8c377ce8-99cc-44ef-9617-c0d570c3a9b4.avif',
      imageAlt: t('humanMarketing.imageAlt'),
    },
    {
      eyebrow: t('simpleAutomation.eyebrow'),
      title: t('simpleAutomation.title'),
      description: t('simpleAutomation.description'),
      cta: t('simpleAutomation.cta'),
      image: '/images/simple-automation-v2.avif',
      imageAlt: t('simpleAutomation.imageAlt'),
      objectPosition: 'object-left',
    },
    {
      eyebrow: t('aiAgentAutomation.eyebrow'),
      title: t('aiAgentAutomation.title'),
      description: t('aiAgentAutomation.description'),
      cta: t('aiAgentAutomation.cta'),
      image: '/images/ai-agent-automation.avif',
      imageAlt: t('aiAgentAutomation.imageAlt'),
      objectPosition: 'object-left',
    },
  ];

  const TOTAL = tiers.length;

  /* ── mobile helpers ── */
  const scrollToIdx = (idx: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const card = track.children[idx] as HTMLElement;
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setActiveIdx(idx);
  };

  /* ── DESKTOP scroll-driven deck ── */
  useEffect(() => {
    const section = sectionRef.current;
    const deck    = deckRef.current;
    if (!section || !deck) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const cards = Array.from(deck.querySelectorAll<HTMLElement>('[data-card]'));
      if (!cards.length) return;

      // Set all cards to absolute stack — first one fully visible, rest hidden below
      gsap.set(cards, { position: 'absolute', inset: 0, opacity: 0, scale: 1, filter: 'blur(0px)' });
      gsap.set(cards[0], { opacity: 1 }); // show first card immediately

      // Build the master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',              // pin starts when section hits top of viewport
          end: () => `+=${TOTAL * 700}`, // 700px of scroll per card
          pin: true,                     // section is pinned — title stays fixed
          scrub: 0.8,                    // smooth scrub
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      for (let i = 0; i < TOTAL - 1; i++) {
        const current = cards[i];
        const next    = cards[i + 1];

        // Step 1 — blur current card out FAST (0.3 of a timeline unit)
        tl.to(current, {
          opacity: 0,
          scale: 0.88,
          filter: 'blur(14px) brightness(0.25)',
          duration: 0.3,
          ease: 'power2.in',
        });

        // Step 2 — fade next card in smoothly from slightly below (0.5 units, overlaps step 1)
        tl.fromTo(
          next,
          { opacity: 0, y: 60, scale: 0.96, filter: 'blur(6px)' },
          { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' },
          '<0.15', // start 0.15 into the blur-out, so transitions overlap slightly
        );

        // Step 3 — brief pause on new card so user can read it
        tl.to({}, { duration: 0.4 });
      }
    });

    return () => mm.revert();
  }, [TOTAL]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="bg-gray-50 dark:bg-[#020817] overflow-hidden"
      style={{ height: '100vh' }} // exact viewport height — GSAP adds scroll room via pin
    >
      <div className="h-full flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── TITLE — always stays at top because section is pinned ── */}
        <div className="text-center pt-20 pb-10 shrink-0">
          <span className="block text-xs md:text-sm font-mono text-teal-500 tracking-[0.5em] mb-3 uppercase">
            {t('eyebrow')}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black dark:from-white to-gray-600 dark:to-white/60">
              {t('title')}
            </span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full mt-4 shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
        </div>

        {/* ── MOBILE: horizontal swipe carousel ── */}
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
            {tiers.map((tier, i) => (
              <div
                key={i}
                className="snap-center shrink-0 w-[85vw] max-w-[340px] bg-[#00353F] rounded-2xl border border-white/10 shadow-xl overflow-hidden flex flex-col"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={tier.image}
                    alt={tier.imageAlt}
                    fill
                    className={`object-cover ${tier.objectPosition || 'object-center'}`}
                    sizes="340px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00353F]/80 to-transparent" />
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <p className="text-xs uppercase tracking-wider text-white/60">{tier.eyebrow}</p>
                  <h3 className="text-lg font-bold text-white leading-snug">{tier.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed line-clamp-3">{tier.description}</p>
                  <div className="flex gap-2 mt-auto pt-2">
                    <Button size="sm" asChild className="flex-1 bg-white text-[#00353F] hover:bg-white/90 text-xs font-semibold">
                      <Link href="#contact">{tier.cta}</Link>
                    </Button>
                    <Button size="sm" asChild variant="outline" className="flex-1 bg-white/10 text-white hover:bg-white/20 border-white/20 text-xs">
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
                className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'w-5 h-2 bg-[#00353F]' : 'w-2 h-2 bg-[#00353F]/30'}`}
                aria-label={`Go to tier ${i + 1}`}
              />
            ))}
          </div>

          {/* prev / next */}
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

        {/* ── DESKTOP: single card slot — GSAP swaps cards here ── */}
        <div
          ref={deckRef}
          className="hidden md:block relative flex-1 max-w-4xl mx-auto w-full mb-16"
          style={{ minHeight: '420px' }}
        >
          {tiers.map((tier, index) => (
            <div
              key={index}
              data-card
              className="rounded-[2rem] overflow-hidden bg-[#00353F] border border-white/10 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.6)] transform-gpu will-change-transform"
            >
              <div className="grid grid-cols-2 h-full min-h-[380px]">
                {/* Image side — fills 100% height, no aspect-ratio wrapper */}
                <div className="relative overflow-hidden">
                  <Image
                    src={tier.image}
                    alt={tier.imageAlt}
                    fill
                    className={`object-cover ${tier.objectPosition || 'object-center'}`}
                    sizes="50vw"
                    priority={index === 0}
                  />
                  {/* subtle right-edge fade into the dark card bg */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#00353F]/60" />
                </div>

                {/* Text side */}
                <div className="flex flex-col justify-center gap-5 p-8 lg:p-10">
                  <p className="text-xs uppercase tracking-[0.3em] text-teal-400 font-mono">
                    {tier.eyebrow}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white leading-snug">
                    {tier.title}
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="flex gap-3 pt-2">
                    <Button
                      size="lg"
                      asChild
                      className="flex-1 bg-white text-[#00353F] hover:bg-teal-50 font-bold text-sm"
                    >
                      <Link href="#contact">{tier.cta}</Link>
                    </Button>
                    <Button
                      size="lg"
                      asChild
                      className="flex-1 bg-transparent text-white border border-white/30 hover:bg-white/10 text-sm"
                    >
                      <Link href="#contact">{tServices('getQuote')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
