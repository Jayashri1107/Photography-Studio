import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Img, Reveal } from './Motion';
import { categories } from '../data/categories';
import { site } from '../data/site';

const ease = [0.22, 1, 0.36, 1];

// ---------- Services as Instagram-style story circles ----------
export function StoryHighlights() {
  const reduce = useReducedMotion();
  return (
    <motion.ul
      className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:justify-center sm:gap-8 sm:px-0 [scrollbar-width:none]"
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
    >
      {categories.map((c) => (
        <motion.li
          key={c.slug}
          className="snap-start"
          variants={{
            hidden: { opacity: 0, scale: 0.4, y: 20 },
            show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 220, damping: 16 } },
          }}
        >
          <Link to={c.path} className="group flex w-20 flex-col items-center gap-2 sm:w-24" aria-label={`${c.title} — explore gallery`}>
            <span className="story-ring block rounded-full p-[3px] transition-transform duration-500 ease-lux group-hover:scale-105">
              <span className="block h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full border-[3px] border-warm bg-cream sm:h-[5.5rem] sm:w-[5.5rem]">
                <Img image={c.card} className="img-zoom" sizes="96px" width={300} />
              </span>
            </span>
            <span className="text-center text-xs font-medium text-charcoal sm:text-[0.8rem]">{c.short}</span>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// ---------- A slowly turning 3D ring of photos ----------
// Each photo stands on a circle (rotateY + translateZ); the whole ring turns with CSS (index.css: .ring-spin).
export function PhotoRing({ images }) {
  const reduce = useReducedMotion();
  const n = images.length;
  return (
    <section className="overflow-hidden pb-10 pt-6 sm:pb-20">
      <div className="container-lux text-center">
        <Reveal><p className="eyebrow">Portfolio</p></Reveal>
        <Reveal delay={0.05}><h2 className="mt-3 font-serif text-[2.1rem] sm:text-5xl">A Glimpse Into Our World.</h2></Reveal>
        <Reveal delay={0.1}><p className="mt-3 text-sm text-charcoal-soft">Hover to pause · tap a photo to see the full portfolio</p></Reveal>
      </div>
      <motion.div
        className="ring-stage relative mx-auto mt-2 h-[220px] sm:mt-4 sm:h-[330px]"
        initial={reduce ? false : { opacity: 0, scale: 0.7, rotateX: 25 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.4, ease }}
      >
        {/* soft shadow on the "floor" */}
        <div className="absolute bottom-0 left-1/2 h-10 w-[70%] max-w-[640px] -translate-x-1/2 rounded-[50%] bg-charcoal/15 blur-2xl" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]">
          <div className="ring-tilt [transform-style:preserve-3d]">
            <div className="ring-spin relative h-[170px] w-[124px] [transform-style:preserve-3d] sm:h-[250px] sm:w-[180px]">
              {images.map((img, i) => (
                <Link
                  key={i}
                  to="/portfolio"
                  className="ring-item group absolute inset-0 overflow-hidden rounded-xl bg-cream shadow-[0_24px_40px_-24px_rgba(65,68,61,0.6)]"
                  style={{ '--a': `${(360 / n) * i}deg` }}
                  aria-label={`See the portfolio: ${img.alt}`}
                >
                  <Img image={img} className="img-zoom" sizes="180px" width={500} />
                  <span className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <Reveal className="mt-5 flex flex-wrap justify-center gap-3 sm:mt-12">
        <Link to="/portfolio" className="btn-primary">View Full Portfolio</Link>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
          <Instagram size={16} aria-hidden="true" /> {site.instagramHandle}
        </a>
      </Reveal>
    </section>
  );
}

// ---------- Endless sliding photo strips ----------
function Strip({ images, reverse = false, duration = 45 }) {
  const loop = [...images, ...images];
  return (
    <div className="marquee overflow-hidden">
      <div
        className={`marquee-track flex w-max gap-3 ${reverse ? 'marquee-reverse' : ''}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {loop.map((img, k) => (
          <div key={k} className="h-32 w-28 shrink-0 overflow-hidden rounded-lg bg-cream sm:h-44 sm:w-36" aria-hidden={k >= images.length}>
            <Img image={img} sizes="150px" width={400} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PhotoMarquee({ images }) {
  const half = Math.ceil(images.length / 2);
  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease }}
    >
      <Strip images={images.slice(0, half)} />
      <div className="hidden sm:block"><Strip images={images.slice(half)} reverse duration={55} /></div>
    </motion.div>
  );
}
