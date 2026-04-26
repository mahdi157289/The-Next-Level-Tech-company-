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
      image: '/images/7d7550b9-9b1a-4e90-9bb5-0cb57ea28d28.avif',
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
    {
      image: '/images/ai-automation-v2.jpg',
      category: t('posts.2.category'),
      title: t('posts.2.title'),
      description: t('posts.2.description'),
    },
    {
      image: '/images/23c333ef-fb7f-4a47-acbc-a50b49fb3fd8.avif',
      category: t('posts.3.category'),
      title: t('posts.3.title'),
      description: t('posts.3.description'),
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

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-6 gap-6">
          {/* Main Column: Featured + Automation */}
          <div className="md:col-span-2 md:row-span-6 flex flex-col gap-6">
            {/* Featured Post */}
            <Link href="#" className="content-item flex-1 group">
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden flex flex-col bg-[#00353F]/80 backdrop-blur-xl border-white/10">
                <div className="relative w-full flex-1 min-h-[240px] overflow-hidden" style={{ position: 'relative' }}>
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-white/80 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {featuredPost.description}
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Automation Card */}
            <Link href="#" className="content-item flex-1 group">
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden flex flex-col bg-[#00353F]/80 backdrop-blur-xl border-white/10">
                <div className="relative w-full flex-1 min-h-[240px] overflow-hidden" style={{ position: 'relative' }}>
                  <Image
                    src={posts[2].image}
                    alt={posts[2].title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="secondary" className="mb-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    {posts[2].category}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-white/80 transition-colors">
                    {posts[2].title}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {posts[2].description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Side Posts (Remaining) */}
          <div className="md:col-span-1 md:row-span-6 flex flex-col gap-6">
            {posts.filter((_, i) => i !== 2).map((post, index) => (
              <Link key={index} href="#" className="content-item flex-1 group">
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden flex flex-col bg-[#00353F]/80 backdrop-blur-xl border-white/10">
                  <div className="relative w-full flex-1 min-h-[120px] overflow-hidden" style={{ position: 'relative' }}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-1 text-xs bg-white/10 text-white border-white/20 hover:bg-white/20">
                      {post.category}
                    </Badge>
                    <h4 className="font-semibold text-sm mb-1 text-white group-hover:text-white/80 transition-colors line-clamp-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-white/70 line-clamp-2">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Links Column */}
          <div className="md:col-span-1 md:row-span-6 flex flex-col">
            <div className="h-full flex flex-col gap-[1px]">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href="#"
                  className="content-item block p-4 bg-[#00353F]/80 backdrop-blur-xl border border-white/10 rounded-lg hover:bg-[#00353F]/90 transition-all group flex-1"
                >
                  <h4 className="font-semibold mb-1 text-white group-hover:text-white/80 transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-xs text-white/70 line-clamp-2">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

