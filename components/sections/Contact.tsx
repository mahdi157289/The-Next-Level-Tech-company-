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

      // Animate contact info items
      const contactItems = sectionRef.current?.querySelectorAll('.contact-item') || [];
      gsap.from(contactItems, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });

      // Animate form
      const form = sectionRef.current?.querySelector('form');
      if (form) {
        gsap.from(form.children || [], {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('description')}{' '}
            <a href="mailto:hello@nextleveltech.com" className="text-blue-600 hover:underline">
              hello@nextleveltech.com
            </a>
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="contact-item text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-700">{t('address')}</p>
          </div>
          <div className="contact-item text-center">
            <Phone className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-700">{t('phone')}</p>
          </div>
          <div className="contact-item text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <a
              href="mailto:hello@nextleveltech.com"
              className="text-blue-600 hover:underline"
            >
              hello@nextleveltech.com
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <Card className="contact-item">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">{t('form.name')}</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('form.namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t('form.email')}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t('form.emailPlaceholder')}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">{t('form.phone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={t('form.phonePlaceholder')}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">{t('form.inquiryType')}</Label>
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
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={`type-${index}`} />
                        <Label htmlFor={`type-${index}`} className="cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div>
                <Label htmlFor="message">{t('form.message')}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('form.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                {t('form.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

