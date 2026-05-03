'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

// Placeholder icons to avoid lucide-react module resolution issues during debugging
const Home = (props: any) => <div {...props}>H</div>;
const Briefcase = (props: any) => <div {...props}>B</div>;
const BookOpen = (props: any) => <div {...props}>L</div>;
const Mail = (props: any) => <div {...props}>M</div>;
const Layers = (props: any) => <div {...props}>S</div>;
const MessageSquare = (props: any) => <div {...props}>C</div>;

interface NavItem {
  key: string;
  icon: React.ReactNode;
  sectionId: string;
}

export default function BottomNavbar() {
  const t = useTranslations('nav');
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { key: 'solutions', icon: <Layers />,        sectionId: 'solutions' },
    { key: 'services',  icon: <Briefcase />,     sectionId: 'services' },
    { key: 'home',      icon: <Home />,          sectionId: 'hero' },
    { key: 'blog',      icon: <BookOpen />,      sectionId: 'blog' },
    { key: 'messages',  icon: <MessageSquare />, sectionId: 'contact' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const isScrollingRef = useRef(false);

  // Scroll-reactive: observe which section is visible
  useEffect(() => {
    if (!mounted) return;

    const sections = navItems.map((item) =>
      document.getElementById(item.sectionId)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // Prevent jiggling: ignore scroll events if we are programmatically scrolling
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [mounted]);

  const handleClick = (index: number, sectionId: string) => {
    setActiveIndex(index);
    isScrollingRef.current = true; // Lock the observer

    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });

    // Unlock the observer after the smooth scroll is likely finished
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  if (!mounted) return null;

  const itemWidth = 100 / navItems.length;
  const bubbleLeft = activeIndex * itemWidth + itemWidth / 2;

  return (
    <>
      {/* SVG Gooey Filter Defined OUTSIDE the fixed container to prevent layout bugs */}
      <div
        ref={navRef}
        className="fixed bottom-0 left-0 right-0 z-[100] lg:hidden pointer-events-none pb-6 px-4"
      >
        <div 
          className="pointer-events-auto relative bg-[#00353F]/70 dark:bg-[#00353F]/70 backdrop-blur-xl border border-white/20 rounded-2xl h-[70px] flex items-center justify-around shadow-lg"
        >
          {/* Floating Bubble Indicator */}
          <div
            className="absolute top-[-18px] w-[52px] h-[52px] rounded-full flex items-center justify-center bg-black dark:bg-white shadow-lg z-10 transition-all duration-400 ease-in-out"
            style={{
              insetInlineStart: `calc(${bubbleLeft}% - 26px)`,
            }}
          >
            <div className="text-white dark:text-black">
              {navItems[activeIndex]?.icon}
            </div>
          </div>

          {/* Nav Items */}
          {navItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.sectionId}
                onClick={() => handleClick(index, item.sectionId)}
                className="flex-1 flex flex-col items-center justify-center gap-1 bg-transparent border-none cursor-pointer py-2 text-white z-20 transition-opacity duration-200"
                style={{
                  opacity: isActive ? 0 : 0.7,
                }}
                aria-label={t(item.key)}
              >
                <div style={{ opacity: isActive ? 0 : 1, transition: 'opacity 0.2s' }}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-semibold tracking-wider">
                  {t(item.key)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
