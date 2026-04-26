'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from '../../i18n/routing';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function ServiceTiers() {
  const t = useTranslations('serviceTiers');
  const containerRef = useRef<HTMLDivElement>(null);

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
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('[data-sticky-card]') || [];
      
      cards.forEach((card, index) => {
        // Create a single ScrollTrigger for both pinning and animation
        ScrollTrigger.create({
            trigger: card,
            start: 'top 100px',
            // End is exactly the card height to ensure the next card arrives immediately
            end: () => `+=${card.clientHeight}`, 
            pin: true,
            pinSpacing: true,
            scrub: true, // Immediate response to eliminate the "dead" space
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: gsap.timeline()
              // Phase 1: Card is active and readable
              .to(card, {
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'none'
              })
              // Phase 2: Seamless transition out
              .to(card, {
                scale: 0.96,
                opacity: 0,
                filter: 'blur(10px)',
                y: -40,
                duration: 1,
                ease: 'power1.inOut',
              })
          });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-gray-50 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
            {t('title')}
          </h2>
        </div>

        <div ref={containerRef} className="max-w-5xl mx-auto px-4 relative">
        {tiers.map((tier, index) => (
          <div
            key={index}
            data-sticky-card
            className="bg-[#00353F]/90 backdrop-blur-sm rounded-lg shadow-lg border border-white/10 transform-gpu will-change-transform-opacity"
            style={{ 
              transformOrigin: 'center center',
              zIndex: index + 1,
              backfaceVisibility: 'hidden'
            }}
          >
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-square rounded-lg overflow-hidden" style={{ position: 'relative' }}>
                      <Image
                        src={tier.image}
                        alt={tier.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm uppercase tracking-wider text-white/70">
                        {tier.eyebrow}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {tier.title}
                      </h3>
                      <p className="text-lg text-white/80">
                        {tier.description}
                      </p>
                      <Button 
                        size="lg" 
                        asChild 
                        className="bg-[#00353F] text-white hover:bg-[#00353F]/90 dark:bg-white dark:text-[#00353F] dark:hover:bg-white/90 border border-white/10 shadow-lg"
                      >
                        <Link href="#contact">{tier.cta}</Link>
                      </Button>
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

