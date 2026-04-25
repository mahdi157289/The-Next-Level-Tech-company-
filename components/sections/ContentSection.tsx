'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link } from '../../i18n/routing';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { gsap, ScrollTrigger } from '../../lib/gsap';

export default function ContentSection() {
  const t = useTranslations('content');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.content-item') || [];
      
      // Animate title first
      const title = sectionRef.current?.querySelector('h2');
      if (title) {
        gsap.from(title, {
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
      }

      // Animate content items with stagger
      gsap.from(items, {
        opacity: 0,
        y: 50,
        scale: 0.96,
        duration: 0.8,
        stagger: {
          amount: 0.5,
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

  const featuredPost = {
    image: '/images/abf1eb51-ccd9-4f05-a11d-61f491f73929.avif',
    category: t('featuredPost.category'),
    title: t('featuredPost.title'),
    description: t('featuredPost.description'),
  };

  const posts = [
    {
      image: '/images/8c377ce8-99cc-44ef-9617-c0d570c3a9b4.avif',
      category: t('posts.0.category'),
      title: t('posts.0.title'),
      description: t('posts.0.description'),
    },
    {
      image: '/images/84ae5f2e-73bf-4bc8-8cd4-59a969bdc19f.avif',
      category: t('posts.1.category'),
      title: t('posts.1.title'),
      description: t('posts.1.description'),
    },
  ];

  const links = [
    { title: t('links.0.title'), description: t('links.0.description') },
    { title: t('links.1.title'), description: t('links.1.description') },
    { title: t('links.2.title'), description: t('links.2.description') },
    { title: t('links.3.title'), description: t('links.3.description') },
    { title: t('links.4.title'), description: t('links.4.description') },
    { title: t('links.5.title'), description: t('links.5.description') },
  ];

  return (
    <section ref={sectionRef} id="blog" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
            {t('title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Featured Post */}
          <Link href="#" className="content-item md:col-span-2 group">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="relative aspect-square md:aspect-auto md:h-64 mb-4 rounded-t-lg overflow-hidden" style={{ position: 'relative' }}>
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-2">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-600 transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {featuredPost.description}
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Side Posts */}
          <div className="md:col-span-1 space-y-6">
            {posts.map((post, index) => (
              <Link key={index} href="#" className="content-item block group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video mb-3 rounded-t-lg overflow-hidden" style={{ position: 'relative' }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {post.category}
                    </Badge>
                    <h4 className="font-semibold mb-1 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Links Column */}
          <div className="md:col-span-1 space-y-4">
            {links.map((link, index) => (
              <Link
                key={index}
                href="#"
                className="content-item block p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <h4 className="font-semibold mb-1 group-hover:text-gray-600 transition-colors">
                  {link.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {link.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

