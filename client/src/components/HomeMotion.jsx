import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Img } from './Motion';
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

// ---------- Collect → burst → settle into a 3×3 grid, driven by scroll ----------
// Each tile is moved by a percentage of its own size, so the same numbers work on any screen.
const spread = [
  [-1.6, -1.3, -18], [0.2, -1.9, 9], [1.7, -1.1, 16],
  [-2.0, 0.1, 12], [0, 0, 0], [2.1, -0.2, -14],
  [-1.5, 1.6, -10], [-0.1, 2.0, 7], [1.8, 1.5, 20],
];

function BurstTile({ image, i, progress, reduce }) {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const [bx, by, br] = spread[i];
  const pct = (n) => `${n * 100}%`;
  const steps = [0, 0.15, 0.45, 0.72];
  // collected pile → burst outward → settle in place
  const x = useTransform(progress, steps, [pct((1 - col) * 1.04), pct((1 - col) * 1.04), pct((col - 1) * 0.6 + bx * 0.5), '0%']);
  const y = useTransform(progress, steps, [pct((1 - row) * 1.04), pct((1 - row) * 1.04), pct((row - 1) * 0.6 + by * 0.5), '0%']);
  const rotate = useTransform(progress, steps, [(i - 4) * 5, (i - 4) * 3, br, 0]);
  const scale = useTransform(progress, steps, [1.25, 1.2, 0.78, 1]);
  const style = reduce ? undefined : { x, y, rotate, scale, zIndex: i === 4 ? 10 : 9 - Math.abs(i - 4) };
  return (
    <motion.a
      href={site.instagram}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      className="group relative block aspect-square overflow-hidden rounded-md bg-cream shadow-[0_18px_40px_-18px_rgba(65,68,61,0.55)] sm:rounded-lg"
      aria-label={`View on Instagram: ${image.alt}`}
    >
      <Img image={image} className="img-zoom" sizes="(min-width:768px) 190px, 31vw" width={500} />
      <span className="absolute inset-0 grid place-items-center bg-olive/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <Instagram size={22} className="text-warm" aria-hidden="true" />
      </span>
    </motion.a>
  );
}

export function BurstGrid({ images }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // The burst starts while the section is still sliding in, so there is never an empty screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.55', 'end end'] });
  const buttonsOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const tiles = images.slice(0, 9);
  return (
    <section ref={ref} className={reduce ? 'section' : 'relative h-[190vh]'}>
      <div className={reduce ? '' : 'sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden pt-16'}>
        <div className="container-lux flex flex-col items-center">
          <div className="mb-5 text-center sm:mb-6">
            <p className="eyebrow">Portfolio</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">A Glimpse Into Our World.</h2>
          </div>
          <div className="grid w-full max-w-[min(500px,46svh)] grid-cols-3 gap-1.5 sm:gap-2.5">
            {tiles.map((img, i) => (
              <BurstTile key={i} image={img} i={i} progress={scrollYProgress} reduce={reduce} />
            ))}
          </div>
          <motion.div style={reduce ? undefined : { opacity: buttonsOpacity }} className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/portfolio" className="btn-primary">View Full Portfolio</Link>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Instagram size={16} aria-hidden="true" /> {site.instagramHandle}
            </a>
          </motion.div>
        </div>
      </div>
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
      <Strip images={images.slice(half)} reverse duration={55} />
    </motion.div>
  );
}
