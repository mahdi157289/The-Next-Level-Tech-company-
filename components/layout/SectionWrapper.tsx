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
          // Keep visible to avoid "blanks" during transition
        },
        onEnterBack: () => {
          gsap.to(sectionRef.current, { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' });
        },
        onLeaveBack: () => {
          // Keep visible to avoid "blanks" during transition
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