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
    // GSAP animations removed to fix opacity 0 bug
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
    <section ref={sectionRef} id="faq" className="pt-4 pb-24 bg-transparent">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60">
              {t('title')}
            </span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-6">
            {t('description')}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
          {questions.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} data-accordion-item className="border-b border-black/10 dark:border-white/10 px-2 overflow-hidden">
              <AccordionTrigger className="text-left text-lg font-medium py-6 text-black dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-black/80 dark:text-white/80 pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

