'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function FAQ() {
  const t = useTranslations('faq');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate header
      const header = sectionRef.current?.querySelector('.text-center');
      if (header) {
        gsap.from(header.children || [], {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Animate accordion items
      const items = sectionRef.current?.querySelectorAll('[data-accordion-item]') || [];
      gsap.from(items, {
        opacity: 0,
        x: -40,
        duration: 0.7,
        stagger: {
          amount: 0.4,
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

  const questions = [
    {
      question: t('questions.0.question'),
      answer: t('questions.0.answer'),
    },
    {
      question: t('questions.1.question'),
      answer: t('questions.1.answer'),
    },
    {
      question: t('questions.2.question'),
      answer: t('questions.2.answer'),
    },
    {
      question: t('questions.3.question'),
      answer: t('questions.3.answer'),
    },
  ];

  return (
    <section ref={sectionRef} id="faq" className="py-24 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('description')}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} data-accordion-item className="border-gray-200 dark:border-gray-800">
              <AccordionTrigger className="text-left text-lg font-medium py-6 dark:text-white hover:dark:text-white/80">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400 pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

