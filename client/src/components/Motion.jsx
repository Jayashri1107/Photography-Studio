import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { imgUrl, imgSrcSet } from '../lib/img';

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1];

/** Fade-and-rise when scrolled into view. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </Comp>
  );
}

/** Children appear one after another. */
export function Stagger({ children, className = '', gap = 0.12 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

/** Word-by-word text reveal behind a mask. */
export function TextReveal({ text, as = 'h2', className = '', delay = 0, immediate = false }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const words = text.split(' ');
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '-40px' } };
  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? false : 'hidden'}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.9, ease } } }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Responsive, lazy image that never shifts layout (parent sets the aspect ratio). */
export function Img({ image, className = '', sizes = '(min-width: 1024px) 50vw, 100vw', eager = false, width = 1200 }) {
  return (
    <img
      src={imgUrl(image, width)}
      srcSet={imgSrcSet(image)}
      sizes={sizes}
      alt={image.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchpriority={eager ? 'high' : undefined}
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

/** Cinematic clip-mask image reveal (+ optional hover zoom). */
export function RevealImage({ image, className = '', aspect = 'aspect-[4/5]', sizes, zoom = true, direction = 'up' }) {
  const reduce = useReducedMotion();
  const from = direction === 'left' ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)';
  return (
    <motion.div
      className={`relative overflow-hidden rounded-soft bg-cream ${aspect} ${className}`}
      initial={reduce ? false : { clipPath: from }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.3, ease }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.8, ease }}
      >
        <Img image={image} sizes={sizes} className={zoom ? 'img-zoom' : ''} />
      </motion.div>
    </motion.div>
  );
}

/** GSAP ScrollTrigger parallax for a background image. Desktop only; off for reduced motion. */
export function useParallax(strength = 12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        el,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    });
    return () => mm.revert();
  }, [strength]);
  return ref;
}

export function ParallaxImage({ image, className = '', strength = 10, sizes = '100vw', eager = false }) {
  const ref = useParallax(strength);
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div ref={ref} className="absolute -inset-y-[14%] inset-x-0">
        <Img image={image} sizes={sizes} eager={eager} width={1920} />
      </div>
    </div>
  );
}
