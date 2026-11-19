import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ParallaxImage, Reveal, TextReveal } from './Motion';
import { site, whatsappLink } from '../data/site';
import { images } from '../data/images';

const ease = [0.22, 1, 0.36, 1];

/** Sets the page title and meta description. */
export function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | ${site.name}` : `${site.name} | Luxury Wedding & Portrait Photography in India`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (description) meta.setAttribute('content', description);
  }, [title, description]);
  return null;
}

export function SectionHeading({ eyebrow, title, text, align = 'left', className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <Reveal><p className="eyebrow mb-5">{eyebrow}</p></Reveal>}
      <TextReveal text={title} className="h2" />
      {text && <Reveal delay={0.15}><p className={`lead mt-6 ${center ? 'mx-auto max-w-2xl' : ''}`}>{text}</p></Reveal>}
    </div>
  );
}

/** Image hero used on inner pages. */
export function PageHero({ eyebrow, title, text, image, children }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: 'inset(8% 8% 8% 8% round 24px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.4, ease }}
      >
        <ParallaxImage image={image} eager strength={8} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-charcoal/20" />
      </motion.div>
      <div className="container-lux relative pb-16 pt-40 sm:pb-24">
        {eyebrow && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="eyebrow mb-5 text-butter"
          >
            {eyebrow}
          </motion.p>
        )}
        <TextReveal as="h1" text={title} immediate delay={0.6} className="display max-w-4xl text-warm" />
        {text && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-warm/90"
          >
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Full-width booking call to action with parallax photography. */
export function BookingCTA({ image = images.coupleSilhouette }) {
  return (
    <section className="relative isolate overflow-hidden py-32 sm:py-44">
      <ParallaxImage image={image} strength={12} />
      <div className="absolute inset-0 bg-charcoal/55" />
      <div className="container-lux relative text-center">
        <Reveal><p className="eyebrow mb-6 text-butter">Book your session</p></Reveal>
        <TextReveal text="Let's Create Something Beautiful Together." className="display mx-auto max-w-4xl text-warm" />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-warm/90">
            Tell us about your day, your family or your brand. We reply within one working day.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-light">
            Book Your Session <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-glass">
            <MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
