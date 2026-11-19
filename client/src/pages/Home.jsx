import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Img, Reveal, RevealImage, TextReveal, useParallax } from '../components/Motion';
import { BookingCTA, SectionHeading, Seo } from '../components/Common';
import { Approach, FeaturedProjects, InstagramGallery, Packages, ServicesGrid, Testimonials } from '../components/Sections';
import { MasonryGallery } from '../components/Gallery';
import { album as a } from '../data/images';
import { imgUrl } from '../lib/img';
import { interleaved, portfolio } from '../data/content';

const ease = [0.22, 1, 0.36, 1];
const INTERVAL = 5200;

// Phone: one full-screen slideshow. Desktop: three columns, each with its own slideshow.
const mobileSlides = [a.brideMehendi, a.pastelPortrait, a.maroonSmile, a.blossomTwo, a.windowLight];
const columns = [
  { slides: [a.redGarden, a.pastelFull, a.windowLight2], className: 'mt-24 h-[62vh]', parallax: 6 },
  { slides: [a.brideMehendi, a.pastelPortrait, a.maroonSmile], className: 'h-[74vh]', parallax: 12 },
  { slides: [a.blossomTwo, a.maroonEmbrace, a.pastelClose], className: 'mt-40 h-[56vh]', parallax: 4 },
];

function useMedia(query) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}

/** Index that advances every `interval` ms after an initial `delay`. */
function useCycle(length, interval, delay = 0) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || length < 2) return;
    let timer;
    const start = setTimeout(() => {
      setI((v) => (v + 1) % length);
      timer = setInterval(() => setI((v) => (v + 1) % length), interval);
    }, interval + delay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [length, interval, delay, reduce]);
  return i;
}

/** Cross-fading slides with a slow "Ken Burns" zoom. */
function Slides({ slides, index, sizes, eager }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    // Warm the cache so the next slide is sharp the moment it fades in.
    slides.forEach((s) => {
      const img = new Image();
      img.referrerPolicy = 'no-referrer';
      img.src = imgUrl(s, 1200);
    });
  }, [slides]);
  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={index}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      >
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.14 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: INTERVAL / 1000 + 2, ease: 'linear' }}
        >
          <Img image={slides[index]} sizes={sizes} eager={eager && index === 0} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function HeroText({ light = true }) {
  const reduce = useReducedMotion();
  const up = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });
  return (
    <div>
      <motion.p {...up(0.5)} className="eyebrow mb-5 flex items-center gap-3 text-butter">
        <motion.span
          className="inline-block h-px w-10 origin-left bg-butter"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease }}
        />
        Wedding & Portrait Photography
      </motion.p>
      <TextReveal
        as="h1"
        text="Every Frame Tells Your Story."
        immediate
        delay={0.7}
        className={`font-serif text-[2.75rem] leading-[1] sm:text-6xl lg:text-[5.2rem] xl:text-[5.8rem] ${light ? 'text-warm' : ''}`}
      />
      <motion.p {...up(1.3)} className="mt-6 max-w-md text-base leading-relaxed text-warm/85 sm:text-lg">
        Life’s most meaningful moments, beautifully kept.
      </motion.p>
      <motion.div {...up(1.5)} className="mt-8 flex flex-wrap gap-3">
        <Link to="/portfolio" className="btn-light">Explore Our Work <ArrowRight size={16} aria-hidden="true" /></Link>
        <Link to="/contact" className="btn-glass">Book Your Shoot</Link>
      </motion.div>
    </div>
  );
}

function MobileHero() {
  const reduce = useReducedMotion();
  const index = useCycle(mobileSlides.length, INTERVAL);
  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: 'inset(14% 10% 14% 10% round 24px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.4, ease }}
      >
        <Slides slides={mobileSlides} index={index} sizes="100vw" eager />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/30" />
      </motion.div>
      <div className="container-lux relative flex h-full flex-col justify-end pb-14">
        <HeroText />
        <div className="mt-10 flex gap-1.5" aria-hidden="true">
          {mobileSlides.map((_, k) => (
            <span key={k} className="h-[2px] flex-1 overflow-hidden rounded-full bg-warm/25">
              {k === index && (
                <motion.span
                  key={index}
                  className="block h-full origin-left bg-butter"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : INTERVAL / 1000, ease: 'linear' }}
                />
              )}
              {k < index && <span className="block h-full bg-warm/70" />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroColumn({ col, k }) {
  const reduce = useReducedMotion();
  const index = useCycle(col.slides.length, INTERVAL, k * 1400);
  const ref = useParallax(col.parallax);
  return (
    <div ref={ref} className={col.className}>
      <motion.div
        className="relative h-full overflow-hidden rounded-soft bg-charcoal-soft"
        initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 20px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 20px)' }}
        transition={{ duration: 1.5, delay: 0.3 + k * 0.18, ease }}
      >
        <Slides slides={col.slides} index={index} sizes="32vw" eager />
      </motion.div>
    </div>
  );
}

function DesktopHero() {
  return (
    <section className="relative h-[100svh] min-h-[700px] overflow-hidden bg-charcoal">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-olive/30 blur-[120px]" />
      <div className="container-lux relative grid h-full grid-cols-12 items-center gap-10 pt-16">
        <div className="col-span-5 z-10">
          <HeroText />
        </div>
        <div className="col-span-7 grid h-full grid-cols-3 items-start gap-5 pt-10">
          {columns.map((col, k) => <HeroColumn key={k} col={col} k={k} />)}
        </div>
      </div>
      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 text-xs uppercase tracking-label text-warm/80"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}

export default function Home() {
  const desktop = useMedia('(min-width: 1024px)');
  return (
    <>
      <Seo description="Photography Studio — luxury Indian wedding, pre-wedding, maternity, newborn, portrait, event and fashion photography with an editorial, timeless style." />
      {desktop ? <DesktopHero /> : <MobileHero />}

      {/* Introduction */}
      <section id="intro" className="section scroll-mt-20">
        <div className="container-lux grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="relative mx-auto w-full max-w-[340px] sm:max-w-md lg:col-span-6 lg:max-w-none">
            <RevealImage image={a.windowHands} aspect="aspect-[4/5]" sizes="(min-width:1024px) 45vw, 340px" />
            <div className="absolute -bottom-8 -right-6 w-28 sm:w-40 lg:-right-10 lg:w-52">
              <RevealImage image={a.brideMehendi} aspect="aspect-[4/5]" direction="left" className="border-[5px] border-warm" sizes="200px" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Reveal><p className="eyebrow mb-4">About the studio</p></Reveal>
            <TextReveal text="More Than Just Photographs." className="h2" />
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-lg">Honest emotion, soft natural colour and timeless compositions — hand-edited, never filtered.</p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link to="/about" className="btn-outline mt-8">Discover Our Story <ArrowRight size={16} aria-hidden="true" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-cream/70">
        <div className="container-lux">
          <div className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
            <SectionHeading eyebrow="What we photograph" title="Stories We Love to Capture." />
            <Reveal className="hidden sm:block"><Link to="/services" className="link-underline shrink-0">All services <ArrowRight size={16} aria-hidden="true" /></Link></Reveal>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* Portfolio */}
      <section className="section">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Portfolio" title="A Glimpse Into Our World." className="mb-10 sm:mb-14" />
          <MasonryGallery items={interleaved(portfolio).slice(0, 12)} />
          <Reveal className="mt-10 text-center sm:mt-14">
            <Link to="/portfolio" className="btn-primary">View Full Portfolio <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="section bg-sage/40">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Our approach" title="The Art Behind Every Frame." className="mb-10 sm:mb-14" />
          <Approach />
        </div>
      </section>

      {/* Featured projects */}
      <section className="section">
        <div className="container-lux">
          <SectionHeading eyebrow="Featured stories" title="Recent Shoots." className="mb-12 sm:mb-16" />
          <FeaturedProjects />
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-butter/45">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Packages" title="Find the Perfect Experience." className="mb-10 sm:mb-14" />
          <Packages />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-lux">
          <SectionHeading eyebrow="Testimonials" title="Kind Words From Our Clients." className="mb-10 sm:mb-14" />
          <Testimonials />
        </div>
      </section>

      {/* Instagram */}
      <section className="section bg-cream/70">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Instagram" title="Follow Our Stories." className="mb-10" />
          <InstagramGallery />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
