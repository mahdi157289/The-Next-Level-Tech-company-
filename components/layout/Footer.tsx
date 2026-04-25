'use client';

import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#00353F] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="flex flex-col items-start justify-center">
            <Link href="/" aria-label="Home" className="block">
              <Image
                src="/images/logo.jpeg"
                alt="Logo"
                width={320}
                height={320}
                className="rounded-lg"
                priority
              />
            </Link>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">{t('newsletterTitle')}</h2>
            <p className="text-gray-300 mb-6">{t('newsletterDescription')}</p>
            
            {subscribed ? (
              <div className="bg-green-500/20 text-green-300 p-4 rounded-lg">
                {t('subscribedMessage')}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  id="newsletter-email"
                  name="newsletterEmail"
                  type="email"
                  autoComplete="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 flex-1"
                  required
                />
                <Button type="submit" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                  {t('subscribe')}
                </Button>
              </form>
            )}
            
            <p className="text-sm text-gray-400 mt-4">
              {t.rich('policyText', {
                policy: (chunks) => (
                  <Link key="policy" href="#" className="underline hover:text-white">
                    {chunks}
                  </Link>
                )
              })}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>{t('copyright')}</p>
          <p>{t('madeBy')}</p>
        </div>
      </div>
    </footer>
  );
}
