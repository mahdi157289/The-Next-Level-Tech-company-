'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from '../../i18n/routing';
import { Button } from '../ui/button';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { cn } from '../../lib/utils';
import { 
  Globe, 
  Smartphone, 
  Database, 
  Bot, 
  Megaphone, 
  BarChart3, 
  CircleDot, 
  Settings, 
  Rocket, 
  Phone 
} from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const ts = useTranslations('services');
  const tt = useTranslations('serviceTiers');
  const navRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    const ctx = gsap.context(() => {
      // Add scroll effect - triggered when page scrolls 100px
      ScrollTrigger.create({
        start: 100, // Trigger when window has scrolled 100px
        end: 'max',
        toggleClass: { className: 'scrolled', targets: navRef.current },
        onToggle: (self) => setIsScrolled(self.isActive)
      });

      // Bobbing animation for phone icon
      if (phoneRef.current) {
        gsap.to(phoneRef.current, {
          yPercent: -20,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b dark:border-slate-800 transition-all duration-300">
      <div className="nav-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all">
        <div className="nav-inner flex justify-between items-center h-16 transition-all">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.jpeg" alt="Logo" width={48} height={48} className="rounded-lg" />
            <span className="font-medium text-lg hidden sm:block dark:text-white">{t('brand')}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent dark:text-white">{t('services')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-0 p-4 md:w-[900px] lg:w-[1000px] md:grid-cols-4 mx-auto">
                      <div className="px-4 py-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-4 w-4 text-foreground" />
                          <span className="text-sm font-semibold">{ts('websiteCreation.title')}</span>
                        </div>
                        <div className="h-px bg-border mb-2" />
                        <ul className="space-y-1">
                          <ListItem href="#services" title={tt('static.title')} icon={CircleDot}>
                            {tt('static.description')}
                          </ListItem>
                          <ListItem href="#services" title={tt('standard.title')} icon={Settings}>
                            {tt('standard.description')}
                          </ListItem>
                          <ListItem href="#services" title={tt('advanced.title')} icon={Rocket}>
                            {tt('advanced.description')}
                          </ListItem>
                        </ul>
                      </div>
                      <div className="px-4 py-2 md:border-l">
                        <div className="flex items-center gap-2 mb-2">
                          <Smartphone className="h-4 w-4 text-foreground" />
                          <span className="text-sm font-semibold">{ts('appDevelopment.title')}</span>
                        </div>
                        <div className="h-px bg-border mb-2" />
                        <ul className="space-y-1">
                          <ListItem href="#services" title={tt('static.title')} icon={CircleDot}>
                            {tt('static.description')}
                          </ListItem>
                          <ListItem href="#services" title={tt('standard.title')} icon={Settings}>
                            {tt('standard.description')}
                          </ListItem>
                          <ListItem href="#services" title={tt('advanced.title')} icon={Rocket}>
                            {tt('advanced.description')}
                          </ListItem>
                        </ul>
                      </div>
                      <div className="px-4 py-2 md:border-l">
                        <div className="flex items-center gap-2 mb-2">
                          <Database className="h-4 w-4 text-foreground" />
                          <span className="text-sm font-semibold">{ts('dataOrganization.title')}</span>
                        </div>
                        <div className="h-px bg-border mb-2" />
                        <ul className="space-y-1">
                          <ListItem href="#services" title={ts('dataOrganization.title')} icon={Database}>
                            {ts('dataOrganization.description')}
                          </ListItem>
                          <ListItem href="#services" title={ts('analyticsSolutions.title')} icon={BarChart3}>
                            {ts('analyticsSolutions.description')}
                          </ListItem>
                        </ul>
                      </div>
                      <div className="px-4 py-2 md:border-l">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="h-4 w-4 text-foreground" />
                          <span className="text-sm font-semibold">{ts('marketingAI.title')}</span>
                        </div>
                        <div className="h-px bg-border mb-2" />
                        <ul className="space-y-1">
                          <ListItem href="#services" title={ts('marketingAI.title')} icon={Bot}>
                            {ts('marketingAI.description')}
                          </ListItem>
                          <ListItem href="#services" title={ts('marketingHuman.title')} icon={Megaphone}>
                            {ts('marketingHuman.description')}
                          </ListItem>
                        </ul>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link href="#about" className="text-sm font-medium hover:text-gray-600 px-4 py-2 dark:text-white">
              {t('about')}
            </Link>
            <Link href="#blog" className="text-sm font-medium hover:text-gray-600 px-4 py-2 dark:text-white">
              {t('blog')}
            </Link>
            <Link href="#help" className="text-sm font-medium hover:text-gray-600 px-4 py-2 dark:text-white">
              {t('help')}
            </Link>
          </div>

          <div className={cn("hidden lg:block transition-all duration-500", isScrolled && "opacity-0 scale-90 pointer-events-none translate-x-12")}>
            <Button>{t('startNow')}</Button>
          </div>

          {/* Bobbing Phone Icon - appears inside the navbar container when scrolled */}
          <div 
            ref={phoneRef}
            className={cn(
              "absolute right-4 z-[70] transition-all duration-500 pointer-events-none opacity-0 scale-0 flex items-center",
              isScrolled && "opacity-100 scale-100 pointer-events-auto"
            )}
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <div className="group relative flex items-center justify-center">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110">
                <Phone className="h-5 w-5" />
              </div>
              
              {/* Tooltip/Number on Hover */}
              <div className="absolute right-full mr-3 opacity-0 translate-x-4 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <div className="bg-white dark:bg-slate-800 text-foreground px-4 py-2 rounded-lg shadow-xl border dark:border-slate-700 whitespace-nowrap font-bold">
                  +216 93 149 727
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ComponentType<{ className?: string }> }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="h-4 w-4 text-foreground" /> : null}
            <span className="text-sm font-medium leading-none">{title}</span>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
