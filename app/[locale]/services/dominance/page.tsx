'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Zap, Clock, ArrowRight, MousePointer2, Sparkles, Send, Layout, ShieldCheck, Crown, Box, Cpu } from 'lucide-react';
import dynamic from 'next/dynamic';
import DiscoveryFunnel from '@/components/sections/DiscoveryFunnel';

const ParticlesBackground = dynamic(
  () => import('@/components/layout/ParticlesBackground'),
  { ssr: false }
);

const BottomNavbar = dynamic(
  () => import('@/components/layout/BottomNavbar'),
  { ssr: false }
);

const LanguageSwitcherBubble = dynamic(
  () => import('@/components/i18n/LanguageSwitcherBubble'),
  { ssr: false }
);

export default function DominanceServicePage() {
  const t = useTranslations('dominanceService');
  const [activePhase, setActiveIdx] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const guideMessages = [
    "Phase 1: Concept immersion and breaking the standard industry boundaries.",
    "Phase 2: World-building with custom 3D, AI, and real-time interactive shaders.",
    "Phase 3: Global deployment of your digital empire across the edge."
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top 20%",
        end: "bottom 80%",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      [1, 2, 3].forEach((i) => {
        ScrollTrigger.create({
          trigger: `#phase-${i}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onToggle: (self) => {
            if (self.isActive) setActiveIdx(i);
          },
          onEnter: () => {
            setActiveIdx(i);
            gsap.to(`#phase-${i}`, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power4.out',
              overwrite: true
            });
          },
          onLeave: () => {
            gsap.to(`#phase-${i}`, {
              opacity: 0,
              y: -50,
              scale: 0.95,
              duration: 1,
              ease: 'power4.in',
              overwrite: true
            });
          },
          onEnterBack: () => {
            setActiveIdx(i);
            gsap.to(`#phase-${i}`, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power4.out',
              overwrite: true
            });
          },
          onLeaveBack: () => {
            gsap.to(`#phase-${i}`, {
              opacity: 0,
              y: 50,
              scale: 0.95,
              duration: 1,
              ease: 'power4.in',
              overwrite: true
            });
          },
        });
        gsap.set(`#phase-${i}`, { opacity: 0, y: 50, scale: 0.95 });
      });

      gsap.to('.indicator-glow', {
        boxShadow: '0 0 30px rgba(245, 158, 11, 0.8)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToPhase = (idx: number) => {
    const el = document.getElementById(`phase-${idx}`);
    if (el) {
      const offset = window.innerHeight * 0.1;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFD] dark:bg-[#020817] transition-colors duration-700 selection:bg-amber-500/30">
      <ParticlesBackground />
      <Navbar />

      <main ref={mainRef} className="relative pt-24">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            
            {/* ── LEFT SIDE: PREMIUM ACCOMPANIMENT ────────────────────────── */}
            <aside className="lg:w-1/3 order-2 lg:order-1 mb-20 lg:mb-0">
              <div className="sidebar-content lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] flex flex-col justify-center relative pl-14 pr-8 py-12 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-r border-gray-100 dark:border-white/5 shadow-2xl dark:shadow-none rounded-r-[3rem] lg:rounded-none overflow-hidden">
                
                <div 
                  className="absolute inset-0 opacity-20 transition-all duration-1000 ease-in-out -z-10"
                  style={{
                    background: activePhase === 1 
                      ? 'radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 70%)'
                      : activePhase === 2
                      ? 'radial-gradient(circle at 20% 50%, #fbbf24 0%, transparent 70%)'
                      : 'radial-gradient(circle at 20% 50%, #d97706 0%, transparent 70%)'
                  }}
                />
                
                <div className="absolute left-6 top-24 bottom-24 w-[2px] bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-b from-amber-400 to-yellow-600 transition-all duration-300 ease-out rounded-full relative"
                    style={{ height: `${scrollProgress * 100}%` }}
                  >
                    <div className="indicator-glow absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full z-20" />
                  </div>
                </div>

                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 text-amber-500 mb-4">
                    <Crown className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Dominance Protocol</span>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    {t('roadmap.title')}
                  </h2>
                  <div className="h-14 overflow-hidden">
                    <p key={activePhase} className="text-sm font-medium text-gray-500 dark:text-amber-400/60 italic leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700">
                      {guideMessages[activePhase - 1]}
                    </p>
                  </div>
                </div>

                <nav className="space-y-8 relative">
                  <div 
                    className="absolute left-6 top-0 w-[2px] bg-amber-500 transition-all duration-500 ease-out hidden lg:block"
                    style={{ 
                      height: '48px', 
                      transform: `translateY(${(activePhase - 1) * 80}px)`,
                      opacity: activePhase ? 1 : 0
                    }}
                  />

                  {[1, 2, 3].map((i) => (
                    <button 
                      key={i} 
                      onClick={() => scrollToPhase(i)}
                      className={`w-full text-left transition-all duration-500 flex items-center gap-6 group relative ${
                        activePhase === i ? 'opacity-100' : 'opacity-30 hover:opacity-70'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black transition-all duration-500 border-2 relative z-10 ${
                        activePhase === i 
                          ? 'bg-amber-500 border-amber-400 text-white shadow-xl shadow-amber-500/20 scale-110' 
                          : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400'
                      }`}>
                        {i}
                        {activePhase === i && (
                          <div className="absolute -inset-2 bg-amber-500/20 rounded-[1.5rem] animate-pulse -z-10" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-[9px] font-black uppercase tracking-widest mb-1 transition-colors ${
                          activePhase === i ? 'text-amber-500' : 'text-gray-400'
                        }`}>
                          {t(`roadmap.step${i}`).includes(':') ? t(`roadmap.step${i}`).split(':')[0] : `Phase ${i}`}
                        </p>
                        <p className={`text-base font-bold leading-tight text-gray-900 dark:text-white transition-all ${
                          activePhase === i ? 'translate-x-1' : ''
                        }`}>
                          {t(`roadmap.step${i}`).includes(':') ? t(`roadmap.step${i}`).split(':')[1] : t(`roadmap.step${i}`)}
                        </p>
                      </div>
                    </button>
                  ))}
                </nav>

                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400 dark:text-white/20">
                    <Box className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest">3D / WebGL</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-500/50">
                    <Cpu className="h-3.5 w-3.5" />
                    <span className="text-[9px] font-black uppercase tracking-widest">AI Core</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── RIGHT SIDE: HIGH-END CONTENT FLOW ────────────────────────── */}
            <div className="lg:w-2/3 space-y-40 pb-48 order-1 lg:order-2">
              
              <section id="phase-1" className="pt-4">
                <div className="max-w-3xl">
                  <h2 className="reveal-item text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-10 leading-[0.9]">
                    {t('phases.phase1.title')}
                  </h2>

                  <p className="reveal-item text-xl text-gray-600 dark:text-white/60 leading-relaxed mb-16 max-w-2xl">
                    {t('phases.phase1.description')}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-y-10 gap-x-12 mb-20">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="relative shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-500 border border-amber-500/20">
                            <CheckCircle2 className="h-4 w-4 text-amber-500" />
                          </div>
                          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-amber-500/40" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="text-base font-black text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors leading-none">
                            {t(`phases.phase1.benefitTitle${i}`)}
                          </h4>
                          <p className="text-[13px] font-medium text-gray-500 dark:text-white/40 leading-relaxed">
                            {t(`phases.phase1.benefitDesc${i}`)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="phase-2">
                <div className="max-w-3xl">
                  <h2 className="reveal-item text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-10 leading-tight tracking-tighter uppercase">
                    {t('phases.phase2.title')}
                  </h2>
                  <p className="reveal-item text-xl text-gray-500 dark:text-white/40 mb-16 leading-relaxed max-w-2xl">
                    {t('phases.phase2.description')}
                  </p>

                  <div className="reveal-item relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-white dark:bg-[#080c14] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-2xl">
                      <label className="block text-xs font-black uppercase tracking-[0.4em] text-gray-400 dark:text-white/20 mb-8">
                        {t('phases.phase2.inputLabel')}
                      </label>
                      <textarea 
                        className="w-full bg-gray-50 dark:bg-white/[0.03] border-2 border-transparent focus:border-amber-500/30 rounded-3xl p-8 text-lg text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-white/10 min-h-[220px] resize-none transition-all outline-none"
                        placeholder={t('phases.phase2.inputPlaceholder')}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section id="phase-3">
                <div className="max-w-4xl">
                  <h2 className="reveal-item text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-10 leading-tight tracking-tighter">
                    {t('phases.phase3.title')}
                  </h2>
                  <p className="reveal-item text-xl text-gray-500 dark:text-white/40 mb-16 leading-relaxed max-w-2xl">
                    {t('phases.phase3.description')}
                  </p>
                  
                  <div className="reveal-item rounded-[3rem] bg-gray-900 dark:bg-black p-1 md:p-2 shadow-3xl relative overflow-hidden border border-white/5 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="relative bg-gray-900 rounded-[2.8rem] p-8 md:p-12 overflow-hidden border border-white/10">
                      <DiscoveryFunnel />
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNavbar />
      <LanguageSwitcherBubble />
    </div>
  );
}
