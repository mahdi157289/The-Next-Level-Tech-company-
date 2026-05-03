'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '../../i18n/routing';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { cn } from '../../lib/utils';

// Placeholder icons to avoid lucide-react module resolution issues during debugging
const BarChart = (props: any) => <div {...props}>Icon</div>;
const Zap = (props: any) => <div {...props}>Icon</div>;
const Layout = (props: any) => <div {...props}>Icon</div>;
const ChevronDown = (props: any) => <div {...props}>Icon</div>;

const Navbar = () => {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solutions = [
    {
      title: t('solutions.marketing.title'),
      description: t('solutions.marketing.description'),
      href: '/#services',
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      title: t('solutions.creative.title'),
      description: t('solutions.creative.description'),
      href: '/#services',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: t('solutions.management.title'),
      description: t('solutions.management.description'),
      href: '/#services',
      icon: <Layout className="w-5 h-5" />,
    },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-background/80 backdrop-blur-md py-2 border-border'
          : 'bg-transparent py-4 border-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-110 transition-transform">
            N
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            {t('brand')}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                  {t('solutions.trigger')}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {solutions.map((solution) => (
                      <li key={solution.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={solution.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2 text-sm font-medium leading-none">
                              {solution.icon}
                              {solution.title}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {solution.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/#services" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                  {t('services')}
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/#contact" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors">
                  {t('contact')}
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/#contact"
            className="hidden sm:flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {t('getStarted')}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
