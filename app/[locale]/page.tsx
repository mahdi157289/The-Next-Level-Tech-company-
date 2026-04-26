'use client';

import dynamic from 'next/dynamic';
import TopBar from '../../components/layout/TopBar';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Hero from '../../components/sections/Hero';
import LanguageSwitcherBubble from '../../components/i18n/LanguageSwitcherBubble';
import ParticlesBackground from '../../components/layout/ParticlesBackground';
import SectionWrapper from '../../components/layout/SectionWrapper';


const Services = dynamic(() => import('../../components/sections/Services'), {
  loading: () => <div className="py-24 bg-[#00353F]" aria-label="Loading services section" />,
});

const ServiceTiers = dynamic(() => import('../../components/sections/ServiceTiers'), {
  loading: () => <div className="py-24 bg-gray-50" aria-label="Loading service tiers section" />,
});

const ContentSection = dynamic(() => import('../../components/sections/ContentSection'), {
  loading: () => <div className="py-24" aria-label="Loading content section" />,
});

const FAQ = dynamic(() => import('../../components/sections/FAQ'), {
  loading: () => <div className="py-24 bg-gray-50" aria-label="Loading FAQ section" />,
});

const Contact = dynamic(() => import('../../components/sections/Contact'), {
  loading: () => <div className="py-24" aria-label="Loading contact section" />,
});

export default function HomePage() {
  return (
    <>
      <ParticlesBackground />
      <TopBar />
      <Navbar />
      <main id="main-content" className="min-h-screen" role="main">
        <SectionWrapper id="hero">
          <Hero />
        </SectionWrapper>
        <SectionWrapper id="services" className="bg-[#00353F]/90">
          <Services />
        </SectionWrapper>
        <SectionWrapper id="service-tiers" className="bg-gray-50/90 dark:bg-transparent" animate={false}>
        <ServiceTiers />
      </SectionWrapper>
        <SectionWrapper id="content" className="bg-white/90">
          <ContentSection />
        </SectionWrapper>
        <SectionWrapper id="faq" className="bg-transparent">
          <FAQ />
        </SectionWrapper>
        <SectionWrapper id="contact" className="bg-white/90">
          <Contact />
        </SectionWrapper>
      </main>
      <Footer />
      <LanguageSwitcherBubble />
    </>
  );
}
