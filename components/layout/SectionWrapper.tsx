'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animate?: boolean;
}

export default function SectionWrapper({ children, className = '', id, animate = true }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !animate) return;

    const ctx = gsap.context(() => {
      const nextSection = sectionRef.current?.nextElementSibling;
      const prevSection = sectionRef.current?.previousElementSibling;

      // Animate current section based on its own visibility
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.to(sectionRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' });
        },
        onLeave: () => {
          if (nextSection && ScrollTrigger.isInViewport(nextSection)) {
            gsap.to(sectionRef.current, { opacity: 0, filter: 'blur(5px)', duration: 0.6, ease: 'power3.in' });
          }
        },
        onEnterBack: () => {
          gsap.to(sectionRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' });
        },
        onLeaveBack: () => {
          if (prevSection && ScrollTrigger.isInViewport(prevSection)) {
            gsap.to(sectionRef.current, { opacity: 0, filter: 'blur(5px)', duration: 0.6, ease: 'power3.in' });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [animate]);

  return (
    <div ref={sectionRef} id={id} className={`section-wrapper ${className}`}>
      {children}
    </div>
  );
}