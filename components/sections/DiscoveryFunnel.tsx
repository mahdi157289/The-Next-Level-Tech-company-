'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from '../../lib/gsap';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CheckCircle2, ArrowRight, ArrowLeft, Send, PhoneCall } from 'lucide-react';

interface DiscoveryFunnelProps {
  onSuccess?: () => void;
}

export default function DiscoveryFunnel({ onSuccess }: DiscoveryFunnelProps) {
  const t = useTranslations('presenceService.discoveryFunnel');
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const transitionStep = (next: number) => {
    if (!containerRef.current) return;
    
    gsap.to(containerRef.current, {
      opacity: 0,
      x: next > step ? -30 : 30,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setStep(next);
        gsap.fromTo(containerRef.current, 
          { opacity: 0, x: next > step ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
    });
  };

  const nextStep = () => transitionStep(step + 1);
  const prevStep = () => transitionStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
    if (onSuccess) onSuccess();
  };

  if (showSuccess) {
    return (
      <div className="relative w-full max-w-2xl mx-auto animate-in zoom-in-95 fade-in duration-700">
        <div className="bg-white dark:bg-[#080c14] border border-gray-100 dark:border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 space-y-8">
            <div className="w-24 h-24 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <PhoneCall className="h-10 w-10 text-teal-500" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
              {t('success.title') || 'Booking Confirmed!'}
            </h3>
            <p className="text-xl text-gray-500 dark:text-white/60 max-w-md mx-auto leading-relaxed">
              {t('success.message') || 'We have booked your free call consultation. We will contact you soon.'}
            </p>
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 className="h-3 w-3 text-teal-500" />
                Launch Protocol Active
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Premium Card Container */}
      <div className="bg-white dark:bg-[#080c14] border border-gray-100 dark:border-white/10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] dark:shadow-none p-8 md:p-12 overflow-hidden relative">
        {/* Dynamic Background Accents */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    step >= i ? 'w-8 bg-teal-500' : 'w-4 bg-gray-100 dark:bg-white/5'
                  }`} 
                />
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-white/20">
              Step 0{step} of 03
            </span>
          </div>

          <div className="min-h-[300px] flex flex-col justify-center">
            <form onSubmit={handleSubmit}>
              <div ref={containerRef}>
                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h3 className="text-2xl md:text-3xl font-black leading-tight text-gray-900 dark:text-white">
                      {t('steps.step1.question')}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2, 3].map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={nextStep}
                          className="group flex items-center justify-between p-6 rounded-2xl border-2 border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] hover:border-teal-500/30 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 text-left"
                        >
                          <span className="font-bold text-gray-700 dark:text-white/80 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {t(`steps.step1.option${i}`)}
                          </span>
                          <ArrowRight className="h-5 w-5 text-gray-300 dark:text-white/10 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h3 className="text-2xl md:text-3xl font-black leading-tight text-gray-900 dark:text-white">
                      {t('steps.step2.question')}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {[1, 2, 3].map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={nextStep}
                          className="group flex items-center justify-between p-6 rounded-2xl border-2 border-gray-50 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02] hover:border-teal-500/30 hover:bg-white dark:hover:bg-white/[0.04] transition-all duration-300 text-left"
                        >
                          <span className="font-bold text-gray-700 dark:text-white/80 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {t(`steps.step2.option${i}`)}
                          </span>
                          <ArrowRight className="h-5 w-5 text-gray-300 dark:text-white/10 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-teal-500 transition-colors mt-4"
                    >
                      <ArrowLeft className="h-3 w-3" /> Back
                    </button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-black leading-tight text-gray-900 dark:text-white">
                        {t('steps.step3.question')}
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        required
                        placeholder={t('steps.step3.namePlaceholder')}
                        className="h-14 rounded-xl bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/5 focus:border-teal-500/50 focus:bg-white transition-all px-6 font-medium"
                      />
                      <Input
                        required
                        placeholder={t('steps.step3.brandPlaceholder') || 'Company or Brand Name'}
                        className="h-14 rounded-xl bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/5 focus:border-teal-500/50 focus:bg-white transition-all px-6 font-medium"
                      />
                      <Input
                        required
                        type="email"
                        placeholder={t('steps.step3.emailPlaceholder')}
                        className="h-14 rounded-xl bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/5 focus:border-teal-500/50 focus:bg-white transition-all px-6 font-medium"
                      />
                      <Input
                        required
                        type="tel"
                        placeholder={t('steps.step3.phonePlaceholder') || 'Phone Number'}
                        className="h-14 rounded-xl bg-gray-50 dark:bg-white/[0.02] border-gray-100 dark:border-white/5 focus:border-teal-500/50 focus:bg-white transition-all px-6 font-medium"
                      />
                    </div>

                    <div className="flex flex-col gap-4 pt-4">
                      <Button 
                        type="submit"
                        size="xl" 
                        disabled={isSubmitting}
                        className="w-full bg-gray-900 dark:bg-teal-500 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-teal-400 h-16 rounded-2xl text-base font-black shadow-2xl shadow-teal-500/10 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {t('steps.step3.submit')}
                            <Send className="h-5 w-5" />
                          </div>
                        )}
                      </Button>
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 hover:text-teal-500 transition-colors"
                      >
                        <ArrowLeft className="h-3 w-3" /> Back
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
