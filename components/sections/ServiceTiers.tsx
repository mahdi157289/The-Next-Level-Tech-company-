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
        const isBlurCard = index > 0; // Cards 2 & 3 have blur
        
        // Create sticky pin
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Create scroll progress animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // Keyframe 0%: Full scale, full opacity, no blur
        tl.to(card, {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.1,
        }, 0);

        // Keyframe 10%: Still full scale, full opacity, blur starts (for blur cards)
        if (isBlurCard) {
          tl.to(card, {
            filter: 'blur(0px)',
            duration: 0.1,
          }, 0.1);
        }

        // Keyframe 90%: Scale down to 0.8, opacity to 0, blur to 5px (for blur cards)
        tl.to(card, {
          scale: 0.8,
          opacity: 0,
          filter: isBlurCard ? 'blur(5px)' : 'blur(0px)',
          duration: 0.8,
        }, 0.1);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('title')}
          </h2>
        </div>

        <div ref={containerRef} className="space-y-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              data-sticky-card
              className={`${
                index === 0 
                  ? 'bg-white' 
                  : 'ix_sticky-card backdrop-blur-sm bg-white/80'
              } ${
                index === 1 ? 'is-card-2' : index === 2 ? 'is-card-3' : ''
              } ${
                index > 0 ? 'ix_backdrop-filter-blur' : ''
              } rounded-lg shadow-lg`}
              style={{ transformOrigin: 'center center' }}
            >
              <Card className="border-0 shadow-none">
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
                      <p className="text-sm uppercase tracking-wider text-gray-600">
                        {tier.eyebrow}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {tier.title}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {tier.description}
                      </p>
                      <Button size="lg" asChild>
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

