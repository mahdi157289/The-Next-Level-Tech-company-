import dynamic from 'next/dynamic';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Hero from '../../components/sections/Hero';
import Services from '../../components/sections/Services';
import ServiceTiers from '../../components/sections/ServiceTiers';
import ContentSection from '../../components/sections/ContentSection';
import FAQ from '../../components/sections/FAQ';
import Contact from '../../components/sections/Contact';
import SectionWrapper from '../../components/layout/SectionWrapper';

// Temporarily commented out for debugging
const ParticlesBackground = dynamic(
  () => import('../../components/layout/ParticlesBackground'),
  { ssr: false }
);

const BottomNavbar = dynamic(
  () => import('../../components/layout/BottomNavbar'),
  { ssr: false }
);

const LanguageSwitcherBubble = dynamic(
  () => import('../../components/i18n/LanguageSwitcherBubble'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      <main id="main-content" className="pb-28 lg:pb-0">
        <SectionWrapper id="hero">
          <Hero />
        </SectionWrapper>
        <SectionWrapper id="services">
          <Services />
          <ServiceTiers />
        </SectionWrapper>
        <SectionWrapper id="content">
          <ContentSection />
          <FAQ />
        </SectionWrapper>
        <SectionWrapper id="contact">
          <Contact />
        </SectionWrapper>
      </main>
      <Footer />
      <BottomNavbar />
      <LanguageSwitcherBubble />
    </>
  );
}
