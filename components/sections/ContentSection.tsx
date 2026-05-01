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
      image: '/images/ai-agent-v3.png',
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
    <section ref={sectionRef} id="blog" className="pt-20 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-black to-black/60 dark:from-white dark:to-white/60">
              {t('title')}
            </span>
          </h2>
          <div className="h-1 w-20 bg-teal-500 mx-auto rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)]" />
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          
          {/* Featured Post - Large */}
          <Link href="#" className="content-item shrink-0 w-[85vw] snap-center md:w-auto md:col-span-2 md:row-span-2 group">
            <Card className="h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] transition-all duration-500 overflow-hidden flex flex-col bg-[#00353F]/40 backdrop-blur-xl border border-white/10 rounded-3xl group-hover:border-white/30">
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00353F] via-[#00353F]/40 to-transparent opacity-90" />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-teal-500 text-white border-none px-3 py-1 text-xs uppercase tracking-widest font-bold">
                    {featuredPost.category}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-3xl md:text-4xl font-black mb-4 text-white transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/80 text-base md:text-lg line-clamp-3 max-w-2xl">
                    {featuredPost.description}
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          {/* Regular Posts - All in the same style */}
          {posts.map((post, index) => (
            <Link key={index} href="#" className="content-item shrink-0 w-[85vw] snap-center md:w-auto md:col-span-1 group">
              <Card className="h-full hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] transition-all duration-500 overflow-hidden flex flex-col bg-[#00353F]/40 backdrop-blur-xl border border-white/10 rounded-3xl group-hover:border-white/30">
                <div className="relative w-full h-full min-h-[350px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00353F] via-[#00353F]/60 to-transparent opacity-90" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="border-teal-500/50 text-teal-400 text-[10px] uppercase tracking-widest bg-black/20 backdrop-blur-md">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h4 className="text-xl font-black mb-2 text-white transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-white/70 text-sm line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {/* Quick Links / Resources - Now with background images to match the style */}
          <div className="content-item shrink-0 w-[85vw] snap-center md:w-auto md:col-span-1 flex flex-col gap-6">
            {links.slice(0, 2).map((link, index) => (
              <Link
                key={index}
                href="#"
                className="group relative h-1/2 flex-1 bg-[#00353F]/40 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/30 transition-all overflow-hidden"
              >
                <Image
                  src={`/images/${index === 0 ? '7d7550b9-9b1a-4e90-9bb5-0cb57ea28d28.avif' : '84ae5f2e-73bf-4bc8-8cd4-59a969bdc19f.avif'}`}
                  alt={link.title}
                  fill
                  className="object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00353F] via-[#00353F]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h4 className="font-black text-xl text-white transition-colors flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
                    {link.title}
                  </h4>
                  <p className="text-sm text-white/60 mt-2 line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

