'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import {
  Globe, Users, CheckCircle, BarChart3,
  Bot, Megaphone, ArrowLeftRight, Zap, Cpu,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

/* ─── types ─────────────────────────────────────────────────────────────── */
interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights?: string[];
}

interface ServiceGroup {
  labelKey: string;
  items: ServiceItem[];
}

/* ─── icon factory ───────────────────────────────────────────────────────── */
function renderIcon(name: string, cls: string) {
  switch (name) {
    case 'Globe':       return <Globe        className={cls} />;
    case 'Users':       return <Users        className={cls} />;
    case 'CheckCircle': return <CheckCircle  className={cls} />;
    case 'BarChart3':   return <BarChart3    className={cls} />;
    case 'Bot':         return <Bot          className={cls} />;
    case 'Megaphone':   return <Megaphone    className={cls} />;
    case 'Zap':         return <Zap          className={cls} />;
    case 'Cpu':         return <Cpu          className={cls} />;
    default:            return null;
  }
}

/* ─── mobile card ────────────────────────────────────────────────────────── */
function MobileCard({ item, t }: { item: ServiceItem; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="snap-center shrink-0 w-[82vw] max-w-[340px] bg-[#020817]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative group">
      {/* Scanning Line Effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-teal-400/50 z-20" />
      
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="340px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/20 to-transparent" />
        
        {/* Futuristic Label */}
        <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[9px] font-mono text-teal-400 tracking-tighter uppercase">
          SYS-M // {item.title.split(' ')[0]}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 gap-4">
        <h4 className="text-lg font-bold flex items-center gap-3 text-white">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            {renderIcon(item.icon, 'h-5 w-5 text-teal-400 shrink-0')}
          </div>
          <span>{item.title}</span>
        </h4>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{item.description}</p>
        
        <div className="flex gap-3 mt-auto pt-2">
          <Button size="sm" variant="ghost" className="flex-1 border border-white/10 text-white/70 hover:bg-white/5 text-[10px] uppercase tracking-widest h-10">
            {t('viewDetails')}
          </Button>
          <Button size="sm" className="flex-1 bg-white text-[#00353F] font-bold text-[10px] uppercase tracking-widest h-10">
            {t('getQuote')}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ─── desktop card pair ──────────────────────────────────────────────────── */
function DesktopPair({
  items,
  expanded,
  setExpanded,
  leftRef,
  rightRef,
  gridRef,
  t,
  isRtl,
}: {
  items: [ServiceItem, ServiceItem];
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  leftRef: React.RefObject<HTMLDivElement>;
  rightRef: React.RefObject<HTMLDivElement>;
  gridRef: React.RefObject<HTMLDivElement>;
  t: ReturnType<typeof useTranslations>;
  isRtl: boolean;
}) {
  const cols = expanded ? 'grid-cols-[2fr_1fr]' : 'grid-cols-[1fr_2fr]';

  return (
    <div
      ref={gridRef}
      className={`relative grid ${cols} gap-[1px] bg-white/10 p-[1px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out items-stretch`}
    >
      {/* LEFT */}
      <Card
        ref={leftRef}
        className="service-card group h-full bg-[#020817]/90 backdrop-blur-xl border-none rounded-none overflow-hidden transition-all duration-500 cursor-pointer relative"
        data-big={expanded ? 'true' : undefined}
        onClick={() => setExpanded(true)}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/[0.03] transition-colors duration-700 pointer-events-none" />
        
        <div className="relative h-64 overflow-hidden">
          <Image src={items[0].image} alt={items[0].imageAlt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-60" />
          {/* Futuristic corner label */}
          <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono text-teal-400 tracking-tighter uppercase">
            ST-A1 // {items[0].title.split(' ')[0]}
          </div>
        </div>
        
        <CardContent className={`${expanded ? 'p-10' : 'p-6'} flex flex-col h-full transition-[padding] duration-500 relative z-10`}>
          <h4 className={`${expanded ? 'text-3xl' : 'text-lg'} font-bold mb-4 flex items-center gap-3 text-white transition-all duration-500`}>
            <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${expanded ? 'scale-110' : 'scale-100'}`}>
              {renderIcon(items[0].icon, `${expanded ? 'h-7 w-7' : 'h-6 w-6'} text-teal-400`)}
            </div>
            {items[0].title}
          </h4>
          <p className={`text-gray-400 leading-relaxed ${expanded ? 'text-lg mb-8 max-w-2xl' : 'text-sm mb-4'}`}>
            {items[0].description}
          </p>
          
          <div className="flex gap-4 mt-auto">
            <Button variant="ghost" className="flex-1 border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all uppercase tracking-widest text-[10px] h-12">
              {t('viewDetails')}
            </Button>
            <Button className="flex-1 bg-white text-[#00353F] hover:bg-teal-50 transition-all uppercase tracking-widest text-[10px] h-12 font-bold">
              {t('getQuote')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* RIGHT */}
      <Card
        ref={rightRef}
        className="service-card group h-full bg-[#020817]/90 backdrop-blur-xl border-none rounded-none overflow-hidden transition-all duration-500 cursor-pointer relative"
        data-big={!expanded ? 'true' : undefined}
        onClick={() => setExpanded(false)}
      >
        <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/[0.03] transition-colors duration-700 pointer-events-none" />

        <div className="relative h-64 overflow-hidden">
          <Image src={items[1].image} alt={items[1].imageAlt} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 left-4 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono text-teal-400 tracking-tighter uppercase">
            ST-B2 // {items[1].title.split(' ')[0]}
          </div>
        </div>
        
        <CardContent className={`${expanded ? 'p-6' : 'p-10'} flex flex-col h-full transition-[padding] duration-500 relative z-10`}>
          <h4 className={`${expanded ? 'text-lg' : 'text-3xl'} font-bold mb-4 flex items-center gap-3 text-white transition-all duration-500`}>
            <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${expanded ? 'scale-100' : 'scale-110'}`}>
              {renderIcon(items[1].icon, `${expanded ? 'h-6 w-6' : 'h-7 w-7'} text-teal-400`)}
            </div>
            {items[1].title}
          </h4>
          <p className={`text-gray-400 leading-relaxed ${expanded ? 'text-sm mb-4' : 'text-lg mb-8 max-w-2xl'}`}>
            {items[1].description}
          </p>
          {items[1].highlights && !expanded && (
            <ul className="mb-8 grid grid-cols-2 gap-4">
              {items[1].highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300 group/item">
                  <div className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                  {h}
                </li>
              ))}
            </ul>
          )}
          <div className="flex gap-4 mt-auto">
            <Button variant="ghost" className="flex-1 border border-white/10 hover:bg-white/5 text-white/70 hover:text-white transition-all uppercase tracking-widest text-[10px] h-12">
              {t('viewDetails')}
            </Button>
            <Button className="flex-1 bg-white text-[#00353F] hover:bg-teal-50 transition-all uppercase tracking-widest text-[10px] h-12 font-bold">
              {t('getQuote')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SWAP BUTTON */}
      <div
        className="absolute z-20 -translate-y-1/2 -translate-x-1/2"
        style={{
          top: '50%',
          left: isRtl 
            ? (expanded ? 'calc(33.333% + 0px)' : 'calc(66.666% + 0px)')
            : (expanded ? 'calc(66.666% + 0px)' : 'calc(33.333% + 0px)'),
          transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
          className="group/btn relative rounded-full w-14 h-14 bg-white shadow-[0_0_30px_rgba(255,255,255,0.3)] ring-1 ring-white/50 hover:scale-110 active:scale-90 transition-all flex items-center justify-center overflow-hidden"
          aria-label="Swap cards"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity" />
          <ArrowLeftRight className="h-6 w-6 text-[#00353F] relative z-10 transition-transform duration-500 group-hover/btn:rotate-180" />
        </button>
      </div>
    </div>
  );
}

/* ─── main component ─────────────────────────────────────────────────────── */
export default function Services() {
  const t = useTranslations('services');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  /* desktop expand states */
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);

  /* desktop card/grid refs */
  const g1 = useRef<HTMLDivElement>(null), l1 = useRef<HTMLDivElement>(null), r1 = useRef<HTMLDivElement>(null);
  const g2 = useRef<HTMLDivElement>(null), l2 = useRef<HTMLDivElement>(null), r2 = useRef<HTMLDivElement>(null);
  const g3 = useRef<HTMLDivElement>(null), l3 = useRef<HTMLDivElement>(null), r3 = useRef<HTMLDivElement>(null);
  const g4 = useRef<HTMLDivElement>(null), l4 = useRef<HTMLDivElement>(null), r4 = useRef<HTMLDivElement>(null);

  /* mobile scroll nav */
  const [mobileIdx, setMobileIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const TOTAL_CARDS = 8;

  const scrollToCard = (idx: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    setMobileIdx(idx);
  };

  const groups: ServiceGroup[] = [
    {
      labelKey: 'groups.development',
      items: [
        { icon: 'Globe', title: t('websiteCreation.title'), description: t('websiteCreation.description'), image: '/images/f46a60f7-a9a2-49b7-954e-34c806953ad7.avif', imageAlt: t('websiteCreation.imageAlt') },
        { icon: 'Users', title: t('appDevelopment.title'), description: t('appDevelopment.description'), image: '/images/7d7550b9-9b1a-4e90-9bb5-0cb57ea28d28.avif', imageAlt: t('appDevelopment.imageAlt'), highlights: [t('appDevelopment.highlight1'), t('appDevelopment.highlight2'), t('appDevelopment.highlight3'), t('appDevelopment.highlight4')] },
      ],
    },
    {
      labelKey: 'groups.data',
      items: [
        { icon: 'BarChart3', title: t('dataOrganization.title'), description: t('dataOrganization.description'), image: '/images/035762ab-b59c-48b6-b5d1-1dd2db2262b3.avif', imageAlt: t('dataOrganization.imageAlt') },
        { icon: 'CheckCircle', title: t('analyticsSolutions.title'), description: t('analyticsSolutions.description'), image: '/images/bf90027e-1724-4b82-b430-963d19430087.avif', imageAlt: t('analyticsSolutions.imageAlt') },
      ],
    },
    {
      labelKey: 'groups.marketing',
      items: [
        { icon: 'Megaphone', title: t('marketingHuman.title'), description: t('marketingHuman.description'), image: '/images/8c377ce8-99cc-44ef-9617-c0d570c3a9b4.avif', imageAlt: t('marketingHuman.imageAlt') },
        { icon: 'Bot', title: t('marketingAI.title'), description: t('marketingAI.description'), image: '/images/23c333ef-fb7f-4a47-acbc-a50b49fb3fd8.avif', imageAlt: t('marketingAI.imageAlt') },
      ],
    },
    {
      labelKey: 'groups.automations',
      items: [
        { icon: 'Bot', title: t('aiAgentAutomation.title'), description: t('aiAgentAutomation.description'), image: '/images/ai-agent-v3.png', imageAlt: t('aiAgentAutomation.imageAlt') },
        { icon: 'Cpu', title: t('simpleAutomation.title'), description: t('simpleAutomation.description'), image: '/images/simple-automation-v2.avif', imageAlt: t('simpleAutomation.imageAlt') },
      ],
    },
  ];

  /* flat list of all cards for mobile */
  const allCards = groups.flatMap(g => g.items);

  /* category start indices for mobile dot nav */
  const catStarts = [0, 2, 4, 6];

  /* GSAP entry animation */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.querySelector('h2') || null, {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      const cards = sectionRef.current?.querySelectorAll('.service-card') || [];
      gsap.from(cards, {
        opacity: 0, y: 60, scale: 0.95, duration: 0.9,
        stagger: { amount: 0.6, from: 'start' },
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* GSAP desktop expand animations */
  const animateExpand = (
    gridEl: HTMLDivElement | null,
    leftEl: HTMLDivElement | null,
    rightEl: HTMLDivElement | null,
    exp: boolean,
  ) => {
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    if (!gridEl || !isDesktop) return;
    gsap.to(gridEl, { duration: 0.5, ease: 'power2.out', gridTemplateColumns: exp ? '2fr 1fr' : '1fr 2fr' });
    gsap.to(leftEl, { duration: 0.4, ease: 'power2.out', scale: exp ? 1 : 0.98 });
    gsap.to(rightEl, { duration: 0.4, ease: 'power2.out', scale: exp ? 0.98 : 1 });
  };

  useEffect(() => animateExpand(g1.current, l1.current, r1.current, expanded1), [expanded1]);
  useEffect(() => animateExpand(g2.current, l2.current, r2.current, expanded2), [expanded2]);
  useEffect(() => animateExpand(g3.current, l3.current, r3.current, expanded3), [expanded3]);
  useEffect(() => animateExpand(g4.current, l4.current, r4.current, expanded4), [expanded4]);

  const desktopProps = [
    { expanded: expanded1, setExpanded: setExpanded1, gridRef: g1, leftRef: l1, rightRef: r1 },
    { expanded: expanded2, setExpanded: setExpanded2, gridRef: g2, leftRef: l2, rightRef: r2 },
    { expanded: expanded3, setExpanded: setExpanded3, gridRef: g3, leftRef: l3, rightRef: r3 },
    { expanded: expanded4, setExpanded: setExpanded4, gridRef: g4, leftRef: l4, rightRef: r4 },
  ];

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-[#00353F] text-white relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
              {t('title')}
            </span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="md:hidden">
          {/* Compact Futuristic Navigation */}
          <div className="flex flex-col items-center mb-10 gap-1.5 lg:hidden">
            {/* Row 1: Icon Buttons */}
            <div className="flex items-center gap-2">
              {groups.map((g, gi) => {
                const isActive = mobileIdx >= catStarts[gi] && (gi === groups.length - 1 || mobileIdx < catStarts[gi + 1]);
                return (
                  <button
                    key={gi}
                    onClick={() => scrollToCard(catStarts[gi])}
                    onMouseEnter={() => setHoveredIdx(gi)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`relative w-14 h-14 flex flex-col items-center justify-center transition-all duration-500 rounded-xl border overflow-hidden backdrop-blur-md ${
                      isActive 
                        ? 'bg-white text-[#00353F] border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                        : 'bg-white/5 text-white/40 border-white/10 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {/* System Label */}
                    <span className={`absolute top-1 left-1 text-[5px] font-mono tracking-tighter opacity-40 ${isActive ? 'text-[#00353F]' : 'text-teal-400'}`}>
                      0{gi + 1}
                    </span>

                    <div className={`transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
                      {renderIcon(g.items[0].icon, 'h-5 w-5')}
                    </div>

                    {/* Shimmer on active */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Row 2: Dynamic Name Line */}
            <div className="relative h-4 w-full flex items-center justify-center">
              {groups.map((g, gi) => {
                const isActive = mobileIdx >= catStarts[gi] && (gi === groups.length - 1 || mobileIdx < catStarts[gi + 1]);
                const isHovered = hoveredIdx === gi;
                const showThis = isHovered || (hoveredIdx === null && isActive);
                
                return (
                  <span 
                    key={gi}
                    className={`absolute whitespace-nowrap text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 transform ${
                      showThis 
                        ? 'opacity-100 translate-y-0 text-teal-400 scale-100' 
                        : 'opacity-0 translate-y-1 scale-95 pointer-events-none'
                    }`}
                  >
                    {t(g.labelKey)}
                  </span>
                );
              })}
            </div>
          </div>

          {/* single horizontal card track */}
          <div
            ref={mobileScrollRef}
            className="flex flex-row flex-nowrap gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardW = el.scrollWidth / TOTAL_CARDS;
              const idx = Math.round(el.scrollLeft / cardW);
              setMobileIdx(Math.min(TOTAL_CARDS - 1, Math.max(0, idx)));
            }}
          >
            {allCards.map((card, i) => (
              <MobileCard key={i} item={card} t={t} />
            ))}
          </div>

          {/* dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {allCards.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`rounded-full transition-all ${
                  i === mobileIdx ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40'
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>

          {/* prev / next arrows */}
          <div className="flex justify-between mt-4 px-1">
            <button
              onClick={() => scrollToCard(Math.max(0, mobileIdx - 1))}
              disabled={mobileIdx === 0}
              className="p-2 rounded-full border border-white/40 disabled:opacity-30 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-white/60 self-center">{mobileIdx + 1} / {TOTAL_CARDS}</span>
            <button
              onClick={() => scrollToCard(Math.min(TOTAL_CARDS - 1, mobileIdx + 1))}
              disabled={mobileIdx === TOTAL_CARDS - 1}
              className="p-2 rounded-full border border-white/40 disabled:opacity-30 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden md:block space-y-16">
          {groups.map((group, gi) => (
            <div key={gi} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-2xl font-semibold">{t(group.labelKey)}</h3>
                <div className="h-px w-1/2 bg-white/20" />
              </div>
              <DesktopPair
                items={[group.items[0], group.items[1]]}
                expanded={desktopProps[gi].expanded}
                setExpanded={desktopProps[gi].setExpanded}
                gridRef={desktopProps[gi].gridRef}
                leftRef={desktopProps[gi].leftRef}
                rightRef={desktopProps[gi].rightRef}
                t={t}
                isRtl={isRtl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
