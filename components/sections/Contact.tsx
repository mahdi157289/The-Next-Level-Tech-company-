'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { MapPin, Phone, Mail } from 'lucide-react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function Contact() {
  const t = useTranslations('contact');
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // GSAP animations removed to fix opacity 0 bug
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="pt-4 pb-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-20">
          <p className="text-sm uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2 font-semibold">
            {t('eyebrow')}
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60 whitespace-pre-line">
              {t('title')}
            </span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-6">
            {t('description')}{' '}
            <a href="mailto:hello@nextleveltech.com" className="text-teal-600 dark:text-teal-400 hover:underline">
              hello@nextleveltech.com
            </a>
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-row justify-between items-start gap-2 md:gap-8 mb-16 px-2">
          <div className="contact-item text-center flex-1">
            <div className="inline-flex items-center justify-center rounded-full border border-teal-400/30 p-3 md:p-4 mb-2 md:mb-3 bg-teal-400/5">
              <MapPin className="h-5 w-5 md:h-7 md:w-7 text-teal-400" />
            </div>
            <p className="text-black/80 dark:text-white/80 text-[10px] sm:text-xs md:text-base">{t('address')}</p>
          </div>
          <div className="contact-item text-center flex-1">
            <div className="inline-flex items-center justify-center rounded-full border border-teal-400/30 p-3 md:p-4 mb-2 md:mb-3 bg-teal-400/5">
              <Phone className="h-5 w-5 md:h-7 md:w-7 text-teal-400" />
            </div>
            <p className="text-black/80 dark:text-white/80 text-[10px] sm:text-xs md:text-base">{t('phone')}</p>
          </div>
          <div className="contact-item text-center flex-1">
            <div className="inline-flex items-center justify-center rounded-full border border-teal-400/30 p-3 md:p-4 mb-2 md:mb-3 bg-teal-400/5">
              <Mail className="h-5 w-5 md:h-7 md:w-7 text-teal-400" />
            </div>
            <a
              href="mailto:hello@nextleveltech.com"
              className="text-black/80 dark:text-white/80 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-[10px] sm:text-xs md:text-base break-all block"
            >
              hello@nextleveltech.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="contact-item bg-[#00353F]/85 backdrop-blur-xl border-white/20 rounded-2xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-white mb-2 block">{t('form.name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('form.namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400 focus:ring-teal-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">{t('form.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400 focus:ring-teal-400"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white mb-2 block">{t('form.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t('form.phonePlaceholder')}
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400 focus:ring-teal-400"
                  />
                </div>
                <div>
                  <Label className="text-white mb-3 block">{t('form.inquiryType')}</Label>
                  <RadioGroup
                    value={formData.inquiryType}
                    onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                    className="flex flex-wrap gap-4"
                  >
                    {[
                      t('form.inquiryTypes.business'),
                      t('form.inquiryTypes.service'),
                      t('form.inquiryTypes.partnership'),
                      t('form.inquiryTypes.other'),
                    ].map((type, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-white/5 border border-white/20 rounded-full px-4 py-2 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => setFormData({ ...formData, inquiryType: type })}>
                        <RadioGroupItem value={type} id={`type-${index}`} className="border-white/40 text-teal-400" />
                        <Label htmlFor={`type-${index}`} className="cursor-pointer text-white/80 hover:text-white">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label htmlFor="message" className="text-white mb-2 block">{t('form.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('form.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-teal-400 focus:ring-teal-400 min-h-[150px] resize-none"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full md:w-auto bg-white text-[#00353F] hover:bg-white/90 font-bold px-8">
                {t('form.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

