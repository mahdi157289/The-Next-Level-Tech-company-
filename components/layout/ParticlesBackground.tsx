'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadSlim } from '@tsparticles/slim';
import type { Container, Engine, IOptions, RecursivePartial } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
 
export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (init) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (container) {
      console.log('Particles loaded successfully');
    }
  }, []);

  useEffect(() => {
    console.log('ParticlesBackground mounted, init state:', init);
  }, [init]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Function to check the current theme class on documentElement
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    // Initial check
    checkTheme();

    // Observe class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const options = useMemo(() => {
    const dark: RecursivePartial<IOptions> = {
      background: { color: { value: 'transparent' } },
      fullScreen: { enable: false },
      particles: {
        number: { value: 40 }, // Reduced from 80 to 40 particles
        color: { value: '#ffffff' },
        links: { enable: true, color: '#ffffff', distance: 250, opacity: 0.2, width: 1 }, // Increased distance from 150 to 250
        move: { enable: true, speed: 0.5, direction: 'none', outModes: { default: 'out' } },
        opacity: { value: 0.4 },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' }, resize: { enable: true } },
        modes: { repulse: { distance: 180, duration: 0.4 } }, // Increased repulse distance from 120 to 180
      },
      detectRetina: true,
    };
    const light: RecursivePartial<IOptions> = {
      background: { color: { value: 'transparent' } },
      fullScreen: { enable: false },
      particles: {
        number: { value: 40 }, // Reduced from 80 to 40 particles
        color: { value: '#00353F' },
        links: { enable: true, color: '#00353F', distance: 250, opacity: 0.2, width: 1 }, // Increased distance from 150 to 250
        move: { enable: true, speed: 0.5, direction: 'none', outModes: { default: 'out' } },
        opacity: { value: 0.35 },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' }, resize: { enable: true } },
        modes: { repulse: { distance: 180, duration: 0.4 } }, // Increased repulse distance from 120 to 180
      },
      detectRetina: true,
    };
    return theme === 'dark' ? dark : light;
  }, [theme]);

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      className="fixed inset-0 z-10 pointer-events-none"
    />
  );
}
