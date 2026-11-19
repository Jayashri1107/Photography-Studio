import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { ParallaxImage, Reveal, RevealImage, TextReveal } from '../components/Motion';
import { BookingCTA, SectionHeading, Seo } from '../components/Common';
import { Approach, FeaturedProjects, InstagramGallery, Packages, ServicesGrid, Testimonials } from '../components/Sections';
import { MasonryGallery } from '../components/Gallery';
import { images } from '../data/images';
import { interleaved, portfolio } from '../data/content';

const ease = [0.22, 1, 0.36, 1];

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: 'inset(18% 22% 18% 22% round 28px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)' }}
        transition={{ duration: 1.8, ease, delay: 0.1 }}
      >
        <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.25 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
          <ParallaxImage image={images.weddingCanopy} eager strength={10} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-charcoal/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/55 via-charcoal/15 to-transparent" />
      </motion.div>

      <div className="container-lux relative flex h-full flex-col justify-end pb-20 sm:pb-28">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="eyebrow mb-6 text-butter"
        >
          Luxury Indian Photography Studio
        </motion.p>
        <TextReveal as="h1" text="Every Frame Tells Your Story." immediate delay={1.2} className="font-serif text-[3.1rem] leading-[0.98] text-warm sm:text-7xl lg:text-[6.6rem] max-w-5xl" />
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.7, ease }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-warm/90 sm:text-xl"
        >
          Beautifully capturing life’s most meaningful moments, one photograph at a time.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9, ease }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <Link to="/portfolio" className="btn-light">Explore Our Work <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link to="/contact" className="btn-glass">Book Your Shoot</Link>
        </motion.div>
      </div>

      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-8 right-6 hidden items-center gap-3 text-xs uppercase tracking-label text-warm/85 sm:flex lg:right-12"
      >
        Scroll
        <motion.span animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Seo description="Photography Studio — luxury Indian wedding, pre-wedding, maternity, newborn, portrait, event and fashion photography with an editorial, timeless style." />
      <Hero />

      {/* Introduction */}
      <section id="intro" className="section scroll-mt-20">
        <div className="container-lux grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="relative lg:col-span-6">
            <RevealImage image={images.photographer} aspect="aspect-[4/5]" sizes="(min-width:1024px) 45vw, 100vw" />
            <div className="absolute -bottom-10 -right-4 hidden w-44 sm:block lg:-right-10 lg:w-56">
              <RevealImage image={images.hennaHands} aspect="aspect-square" direction="left" className="border-[6px] border-warm" sizes="15vw" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Reveal><p className="eyebrow mb-5">About the studio</p></Reveal>
            <TextReveal text="More Than Just Photographs." className="h2" />
            <Reveal delay={0.1}>
              <p className="lead mt-7">
                We are a small team of photographers and editors who believe the best pictures come from trust. We get to know you first — your
                families, traditions and the little things that make you laugh — so that on the day we can quietly disappear into the moment.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-charcoal-soft">
                Our style is editorial yet warm: honest emotion, soft natural colour and compositions that feel timeless rather than trendy.
                Every gallery is hand-edited, never run through a one-click filter.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link to="/about" className="btn-outline mt-10">Discover Our Story <ArrowRight size={16} aria-hidden="true" /></Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-cream/70">
        <div className="container-lux">
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="What we photograph" title="Stories We Love to Capture." />
            <Reveal><Link to="/services" className="link-underline shrink-0">All services & packages <ArrowRight size={16} aria-hidden="true" /></Link></Reveal>
          </div>
          <ServicesGrid />
        </div>
      </section>

      {/* Portfolio */}
      <section className="section">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Featured portfolio" title="A Glimpse Into Our World." className="mb-14" />
          <MasonryGallery items={interleaved(portfolio).slice(0, 15)} />
          <Reveal className="mt-14 text-center">
            <Link to="/portfolio" className="btn-primary">View Full Portfolio <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="section bg-sage/40">
        <div className="container-lux">
          <SectionHeading
            align="center"
            eyebrow="Our approach"
            title="The Art Behind Every Frame."
            text="Four principles guide every shoot, from a twenty-minute portrait to a five-day wedding."
            className="mb-16"
          />
          <Approach />
        </div>
      </section>

      {/* Featured projects */}
      <section className="section">
        <div className="container-lux">
          <SectionHeading eyebrow="Featured projects" title="Stories From Recent Shoots." className="mb-20" />
          <FeaturedProjects />
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-butter/45">
        <div className="container-lux">
          <SectionHeading
            align="center"
            eyebrow="Packages"
            title="Find the Perfect Experience."
            text="Three starting points, each tailored to your day. Tell us what you need and we will shape the right package."
            className="mb-16"
          />
          <Packages />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-lux">
          <SectionHeading eyebrow="Testimonials" title="Kind Words From Our Clients." className="mb-14" />
          <Testimonials />
        </div>
      </section>

      {/* Instagram */}
      <section className="section bg-cream/70 !pt-24">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Instagram" title="Follow Our Stories." className="mb-12" />
          <InstagramGallery />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
