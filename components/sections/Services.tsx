'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Globe, Users, CheckCircle, BarChart3, Bot, Megaphone, ArrowLeftRight, Zap, Cpu } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function Services() {
  const t = useTranslations('services');
  const sectionRef = useRef<HTMLElement>(null);
  const [leftExpanded, setLeftExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const [secondExpanded, setSecondExpanded] = useState(false);
  const gridRefSecond = useRef<HTMLDivElement>(null);
  const leftCardRefSecond = useRef<HTMLDivElement>(null);
  const rightCardRefSecond = useRef<HTMLDivElement>(null);
  const [thirdExpanded, setThirdExpanded] = useState(false);
  const gridRefThird = useRef<HTMLDivElement>(null);
  const leftCardRefThird = useRef<HTMLDivElement>(null);
  const rightCardRefThird = useRef<HTMLDivElement>(null);
  const [fourthExpanded, setFourthExpanded] = useState(false);
  const gridRefFourth = useRef<HTMLDivElement>(null);
  const leftCardRefFourth = useRef<HTMLDivElement>(null);
  const rightCardRefFourth = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Globe,
      title: t('websiteCreation.title'),
      description: t('websiteCreation.description'),
      image: '/images/f46a60f7-a9a2-49b7-954e-34c806953ad7.avif',
      imageAlt: t('websiteCreation.imageAlt'),
    },
    {
      icon: Users,
      title: t('appDevelopment.title'),
      description: t('appDevelopment.description'),
      image: '/images/7d7550b9-9b1a-4e90-9bb5-0cb57ea28d28.avif',
      imageAlt: t('appDevelopment.imageAlt'),
    },
    {
      icon: CheckCircle,
      title: t('dataOrganization.title'),
      description: t('dataOrganization.description'),
      image: '/images/035762ab-b59c-48b6-b5d1-1dd2db2262b3.avif',
      imageAlt: t('dataOrganization.imageAlt'),
    },
    {
      icon: BarChart3,
      title: t('analyticsSolutions.title'),
      description: t('analyticsSolutions.description'),
      image: '/images/bf90027e-1724-4b82-b430-963d19430087.avif',
      imageAlt: t('analyticsSolutions.imageAlt'),
    },
    {
      icon: Bot,
      title: t('marketingAI.title'),
      description: t('marketingAI.description'),
      image: '/images/23c333ef-fb7f-4a47-acbc-a50b49fb3fd8.avif',
      imageAlt: t('marketingAI.imageAlt'),
    },
    {
      icon: Megaphone,
      title: t('marketingHuman.title'),
      description: t('marketingHuman.description'),
      image: '/images/8c377ce8-99cc-44ef-9617-c0d570c3a9b4.avif',
      imageAlt: t('marketingHuman.imageAlt'),
    },
    {
      icon: Zap,
      title: t('simpleAutomation.title'),
      description: t('simpleAutomation.description'),
      image: '/images/simple-automation-v2.jpg',
      imageAlt: t('simpleAutomation.imageAlt'),
    },
    {
      icon: Cpu,
      title: t('aiAgentAutomation.title'),
      description: t('aiAgentAutomation.description'),
      image: '/images/ai-automation-v2.jpg',
      imageAlt: t('aiAgentAutomation.imageAlt'),
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate title
      gsap.from(sectionRef.current?.querySelector('h2') || null, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Animate service cards with stagger
      const cards = sectionRef.current?.querySelectorAll('.service-card') || [];
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 0.9,
        stagger: {
          amount: 0.6,
          from: 'start',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    if (!gridRef.current) return;
    if (isDesktop) {
      const targetCols = leftExpanded ? '2fr 1fr' : '1fr 2fr';
      gsap.to(gridRef.current, { duration: 0.5, ease: 'power2.out', gridTemplateColumns: targetCols });
      gsap.to(leftCardRef.current, { duration: 0.4, ease: 'power2.out', scale: leftExpanded ? 1 : 0.98 });
      gsap.to(rightCardRef.current, { duration: 0.4, ease: 'power2.out', scale: leftExpanded ? 0.98 : 1 });
    } else {
      gridRef.current.style.gridTemplateColumns = '';
      gsap.to([leftCardRef.current, rightCardRef.current], { duration: 0.2, scale: 1 });
    }
  }, [leftExpanded]);

  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    if (!gridRefSecond.current) return;
    if (isDesktop) {
      const targetCols = secondExpanded ? '2fr 1fr' : '1fr 2fr';
      gsap.to(gridRefSecond.current, { duration: 0.5, ease: 'power2.out', gridTemplateColumns: targetCols });
      gsap.to(leftCardRefSecond.current, { duration: 0.4, ease: 'power2.out', scale: secondExpanded ? 1 : 0.98 });
      gsap.to(rightCardRefSecond.current, { duration: 0.4, ease: 'power2.out', scale: secondExpanded ? 0.98 : 1 });
    } else {
      gridRefSecond.current.style.gridTemplateColumns = '';
      gsap.to([leftCardRefSecond.current, rightCardRefSecond.current], { duration: 0.2, scale: 1 });
    }
  }, [secondExpanded]);

  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    if (!gridRefThird.current) return;
    if (isDesktop) {
      const targetCols = thirdExpanded ? '2fr 1fr' : '1fr 2fr';
      gsap.to(gridRefThird.current, { duration: 0.5, ease: 'power2.out', gridTemplateColumns: targetCols });
      gsap.to(leftCardRefThird.current, { duration: 0.4, ease: 'power2.out', scale: thirdExpanded ? 1 : 0.98 });
      gsap.to(rightCardRefThird.current, { duration: 0.4, ease: 'power2.out', scale: thirdExpanded ? 0.98 : 1 });
    } else {
      gridRefThird.current.style.gridTemplateColumns = '';
      gsap.to([leftCardRefThird.current, rightCardRefThird.current], { duration: 0.2, scale: 1 });
    }
  }, [thirdExpanded]);

  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;
    if (!gridRefFourth.current) return;
    if (isDesktop) {
      const targetCols = fourthExpanded ? '2fr 1fr' : '1fr 2fr';
      gsap.to(gridRefFourth.current, { duration: 0.5, ease: 'power2.out', gridTemplateColumns: targetCols });
      gsap.to(leftCardRefFourth.current, { duration: 0.4, ease: 'power2.out', scale: fourthExpanded ? 1 : 0.98 });
      gsap.to(rightCardRefFourth.current, { duration: 0.4, ease: 'power2.out', scale: fourthExpanded ? 0.98 : 1 });
    } else {
      gridRefFourth.current.style.gridTemplateColumns = '';
      gsap.to([leftCardRefFourth.current, rightCardRefFourth.current], { duration: 0.2, scale: 1 });
    }
  }, [fourthExpanded]);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-[#00353F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
        </div>

        <div className="space-y-16">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-semibold">
                {t('groups.development')}
              </h3>
              <div className="h-px w-1/2 bg-white/20" />
            </div>
            <div
              ref={gridRef}
              className={`relative grid grid-cols-1 ${leftExpanded ? 'md:grid-cols-[2fr_1fr]' : 'md:grid-cols-[1fr_2fr]'} gap-6 md:transition-all md:duration-500 md:ease-out items-stretch`}
            >
              <Card
                ref={leftCardRef}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={leftExpanded ? 'true' : undefined}
              >
                <CardContent className={leftExpanded ? 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={services[0].image}
                        alt={services[0].imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[0].icon;
                      return (
                        <h4 className={`${leftExpanded ? 'text-2xl' : 'text-lg'} font-semibold mb-3 flex items-center gap-2 text-white`}>
                          <Icon className={`${leftExpanded ? 'h-7 w-7' : 'h-6 w-6'} text-white`} />
                          {services[0].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${leftExpanded ? 'mb-4' : 'text-sm mb-4'}`}>
                      {services[0].description}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <Card
                ref={rightCardRef}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={!leftExpanded ? 'true' : undefined}
              >
                <CardContent className={leftExpanded ? 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={services[1].image}
                        alt={services[1].imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[1].icon;
                      return (
                        <h4 className={`${leftExpanded ? 'text-lg' : 'text-2xl'} font-semibold mb-3 flex items-center gap-3 text-white`}>
                          <Icon className={`${leftExpanded ? 'h-6 w-6' : 'h-7 w-7'} text-white`} />
                          {services[1].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${leftExpanded ? 'text-sm mb-4' : 'mb-4'}`}>
                      {services[1].description}
                    </p>
                    {!leftExpanded && (
                      <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-200 transition-opacity duration-400 ease-out">
                        <li className="flex items-center gap-2 before:content-['•'] before:text-blue-400">{t('appDevelopment.highlight1')}</li>
                        <li className="flex items-center gap-2 before:content-['•'] before:text-blue-400">{t('appDevelopment.highlight2')}</li>
                        <li className="flex items-center gap-2 before:content-['•'] before:text-blue-400">{t('appDevelopment.highlight3')}</li>
                        <li className="flex items-center gap-2 before:content-['•'] before:text-blue-400">{t('appDevelopment.highlight4')}</li>
                      </ul>
                    )}
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <div
                className="hidden md:block absolute z-20 -translate-y-1/2 -translate-x-1/2"
                style={{
                  top: '50%',
                  left: leftExpanded ? 'calc(66.666% + 0.75rem)' : 'calc(33.333% + 0.75rem)',
                  transition: 'left 0.5s ease-in-out',
                }}
              >
                <button
                  onClick={() => setLeftExpanded(!leftExpanded)}
                  className="rounded-full w-16 h-16 bg-white shadow-2xl ring-4 ring-white/30 hover:scale-105 active:scale-95 transition transform-gpu"
                  style={{ perspective: '800px' }}
                  aria-label="Swap cards"
                  title="Swap cards"
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <ArrowLeftRight className="h-7 w-7 text-[#020817]" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-semibold">
                {t('groups.data')}
              </h3>
              <div className="h-px w-1/2 bg-white/20" />
            </div>
            <div
              ref={gridRefSecond}
              className={`relative grid grid-cols-1 ${secondExpanded ? 'md:grid-cols-[2fr_1fr]' : 'md:grid-cols-[1fr_2fr]'} gap-6 md:transition-all md:duration-500 md:ease-out items-stretch`}
            >
              <Card
                ref={leftCardRefSecond}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={secondExpanded ? 'true' : undefined}
              >
                <CardContent className={secondExpanded ? 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={services[2].image}
                        alt={services[2].imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[2].icon;
                      return (
                        <h4 className={`${secondExpanded ? 'text-2xl' : 'text-lg'} font-semibold mb-3 flex items-center gap-2 text-white`}>
                          <Icon className={`${secondExpanded ? 'h-7 w-7' : 'h-6 w-6'} text-white`} />
                          {services[2].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${secondExpanded ? 'mb-4' : 'text-sm mb-4'}`}>
                      {services[2].description}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <Card
                ref={rightCardRefSecond}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={!secondExpanded ? 'true' : undefined}
              >
                <CardContent className={secondExpanded ? 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={services[3].image}
                        alt={services[3].imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[3].icon;
                      return (
                        <h4 className={`${secondExpanded ? 'text-lg' : 'text-2xl'} font-semibold mb-3 flex items-center gap-3 text-white`}>
                          <Icon className={`${secondExpanded ? 'h-6 w-6' : 'h-7 w-7'} text-white`} />
                          {services[3].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${secondExpanded ? 'text-sm mb-4' : 'mb-4'}`}>
                      {services[3].description}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <div
                className="hidden md:block absolute z-20 -translate-y-1/2 -translate-x-1/2"
                style={{
                  top: '50%',
                  left: secondExpanded ? 'calc(66.666% + 0.75rem)' : 'calc(33.333% + 0.75rem)',
                  transition: 'left 0.5s ease-in-out',
                }}
              >
                <button
                  onClick={() => setSecondExpanded(!secondExpanded)}
                  className="rounded-full w-16 h-16 bg-white shadow-2xl ring-4 ring-white/30 hover:scale-105 active:scale-95 transition transform-gpu"
                  style={{ perspective: '800px' }}
                  aria-label="Swap cards"
                  title="Swap cards"
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <ArrowLeftRight className="h-7 w-7 text-[#020817]" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-semibold">
                {t('groups.marketing')}
              </h3>
              <div className="h-px w-1/2 bg-white/20" />
            </div>
            <div
              ref={gridRefThird}
              className={`relative grid grid-cols-1 ${thirdExpanded ? 'md:grid-cols-[2fr_1fr]' : 'md:grid-cols-[1fr_2fr]'} gap-6 md:transition-all md:duration-500 md:ease-out items-stretch`}
            >
              <Card
                ref={leftCardRefThird}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={thirdExpanded ? 'true' : undefined}
              >
                <CardContent className={thirdExpanded ? 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={services[4].image}
                        alt={services[4].imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[4].icon;
                      return (
                        <h4 className={`${thirdExpanded ? 'text-2xl' : 'text-lg'} font-semibold mb-3 flex items-center gap-2 text-white`}>
                          <Icon className={`${thirdExpanded ? 'h-7 w-7' : 'h-6 w-6'} text-white`} />
                          {services[4].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${thirdExpanded ? 'mb-4' : 'text-sm mb-4'}`}>
                      {services[4].description}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <Card
                ref={rightCardRefThird}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={!thirdExpanded ? 'true' : undefined}
              >
                <CardContent className={thirdExpanded ? 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={services[5].image}
                        alt={services[5].imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[5].icon;
                      return (
                        <h4 className={`${thirdExpanded ? 'text-lg' : 'text-2xl'} font-semibold mb-3 flex items-center gap-3 text-white`}>
                          <Icon className={`${thirdExpanded ? 'h-6 w-6' : 'h-7 w-7'} text-white`} />
                          {services[5].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${thirdExpanded ? 'text-sm mb-4' : 'mb-4'}`}>
                      {services[5].description}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <div
                className="hidden md:block absolute z-20 -translate-y-1/2 -translate-x-1/2"
                style={{
                  top: '50%',
                  left: thirdExpanded ? 'calc(66.666% + 0.75rem)' : 'calc(33.333% + 0.75rem)',
                  transition: 'left 0.5s ease-in-out',
                }}
              >
                <button
                  onClick={() => setThirdExpanded(!thirdExpanded)}
                  className="rounded-full w-16 h-16 bg-white shadow-2xl ring-4 ring-white/30 hover:scale-105 active:scale-95 transition transform-gpu"
                  style={{ perspective: '800px' }}
                  aria-label="Swap cards"
                  title="Swap cards"
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <ArrowLeftRight className="h-7 w-7 text-[#020817]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-semibold">
                {t('groups.automations')}
              </h3>
              <div className="h-px w-1/2 bg-white/20" />
            </div>
            <div
              ref={gridRefFourth}
              className={`relative grid grid-cols-1 ${fourthExpanded ? 'md:grid-cols-[2fr_1fr]' : 'md:grid-cols-[1fr_2fr]'} gap-6 md:transition-all md:duration-500 md:ease-out items-stretch`}
            >
              <Card
                ref={leftCardRefFourth}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={fourthExpanded ? 'true' : undefined}
              >
                <CardContent className={fourthExpanded ? 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden bg-[#0a192f]">
                      <Image
                        src={services[6].image}
                        alt={services[6].imageAlt}
                        fill
                        className="object-contain transition-transform duration-500 hover:scale-105 p-2"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[6].icon;
                      return (
                        <h4 className={`${fourthExpanded ? 'text-2xl' : 'text-lg'} font-semibold mb-3 flex items-center gap-2 text-white`}>
                          <Icon className={`${fourthExpanded ? 'h-7 w-7' : 'h-6 w-6'} text-white`} />
                          {services[6].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${fourthExpanded ? 'mb-4' : 'text-sm mb-4'}`}>
                      {services[6].description}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <Card
                ref={rightCardRefFourth}
                className="service-card h-full bg-[#020817]/80 backdrop-blur-md border border-white overflow-hidden will-change-transform shadow-xl hover:shadow-2xl transition-shadow transform-gpu hover:-translate-y-0.5"
                data-big={!fourthExpanded ? 'true' : undefined}
              >
                <CardContent className={fourthExpanded ? 'p-6 transition-[padding] duration-500 ease-out flex flex-col h-full' : 'p-8 transition-[padding] duration-500 ease-out flex flex-col h-full'}>
                  <div className="flex-1 flex flex-col">
                    <div className="relative h-64 mb-6 rounded-lg overflow-hidden bg-[#0a192f]">
                      <Image
                        src={services[7].image}
                        alt={services[7].imageAlt}
                        fill
                        className="object-contain transition-transform duration-500 hover:scale-105 p-2"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    {(() => {
                      const Icon = services[7].icon;
                      return (
                        <h4 className={`${fourthExpanded ? 'text-lg' : 'text-2xl'} font-semibold mb-3 flex items-center gap-3 text-white`}>
                          <Icon className={`${fourthExpanded ? 'h-6 w-6' : 'h-7 w-7'} text-white`} />
                          {services[7].title}
                        </h4>
                      );
                    })()}
                    <p className={`text-gray-300 ${fourthExpanded ? 'text-sm mb-4' : 'mb-4'}`}>
                      {services[7].description}
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-6 w-full bg-[#00353F] hover:bg-[#00353F] text-white border border-white">
                    {t('viewDetails')}
                  </Button>
                </CardContent>
              </Card>

              <div
                className="hidden md:block absolute z-20 -translate-y-1/2 -translate-x-1/2"
                style={{
                  top: '50%',
                  left: fourthExpanded ? 'calc(66.666% + 0.75rem)' : 'calc(33.333% + 0.75rem)',
                  transition: 'left 0.5s ease-in-out',
                }}
              >
                <button
                  onClick={() => setFourthExpanded(!fourthExpanded)}
                  className="rounded-full w-16 h-16 bg-white shadow-2xl ring-4 ring-white/30 hover:scale-105 active:scale-95 transition transform-gpu"
                  style={{ perspective: '800px' }}
                  aria-label="Swap cards"
                  title="Swap cards"
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <ArrowLeftRight className="h-7 w-7 text-[#020817]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

