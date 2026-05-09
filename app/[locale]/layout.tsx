import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Next Level Tech Company | Websites, Apps & Digital Ecosystems',
    template: '%s | The Next Level Tech Company',
  },
  description:
    'We build websites, apps, and digital ecosystems that put your brand ahead — powered by AI, automation, and world-class design. Choose Presence, Identity, or Dominance and rise to the next level.',
  keywords: [
    'web design agency',
    'website creation',
    'app development',
    'AI automation',
    'digital marketing',
    'custom website',
    'SEO-ready website',
    'web development company',
    'next level tech',
    '3D web design',
    'AI personalization',
    'brand identity website',
  ],
  authors: [{ name: 'The Next Level Tech Company' }],
  creator: 'The Next Level Tech Company',
  metadataBase: new URL('https://www.thenextleveltechcompany.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      ar: '/ar',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.thenextleveltechcompany.com',
    siteName: 'The Next Level Tech Company',
    title: 'The Next Level Tech Company | Websites, Apps & Digital Ecosystems',
    description:
      'We build websites, apps, and digital ecosystems powered by AI, automation, and world-class design. Rise to the next level.',
    images: [
      {
        url: '/images/og-image.avif',
        width: 1200,
        height: 630,
        alt: 'The Next Level Tech Company — Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Next Level Tech Company | Web, Apps & AI Solutions',
    description:
      'Websites, apps, and digital ecosystems powered by AI and world-class design. Choose your tier and rise to the next level.',
    images: ['/images/og-image.avif'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

