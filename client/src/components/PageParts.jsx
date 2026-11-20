import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Instagram, MessageCircle, Quote, Star } from 'lucide-react';
import { Img, Reveal } from './Motion';
import { LogoMark } from './LogoMark';
import { categories } from '../data/categories';
import { projects, reviews, reviewsNote } from '../data/content';
import { site } from '../data/site';
import { imgUrl } from '../lib/img';

const ease = [0.22, 1, 0.36, 1];

// ---------- Services: a numbered list with one photo that changes as you point at each line ----------
export function ServiceShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const c = categories[active];
  return (
    <>
      {/* Phones: swipeable cards */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 lg:hidden [scrollbar-width:none]">
        {categories.map((cat, i) => (
          <Link key={cat.slug} to={cat.path} className="group relative aspect-[3/4] w-[62%] shrink-0 snap-start overflow-hidden rounded-xl bg-cream sm:w-[38%]">
            <Img image={cat.card} sizes="(min-width:640px) 38vw, 62vw" width={700} />
            <span className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="font-serif text-sm text-butter">0{i + 1}</span>
              <span className="block font-serif text-2xl leading-tight text-warm">{cat.short}</span>
              <span className="mt-1 block text-xs text-warm/80">{cat.description}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop: list on the left, photo on the right */}
      <div className="hidden items-center gap-14 lg:grid lg:grid-cols-12">
        <ul className="lg:col-span-7">
          {categories.map((cat, i) => {
            const on = i === active;
            return (
              <li key={cat.slug} className="border-b border-charcoal/10 first:border-t">
                <Link
                  to={cat.path}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-center gap-6 py-4"
                >
                  <span className={`w-10 font-serif text-lg transition-colors duration-300 ${on ? 'text-olive' : 'text-charcoal/35'}`}>0{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-serif text-[2rem] leading-tight transition-all duration-500 ease-lux ${on ? 'translate-x-2 text-olive' : 'text-charcoal'}`}>{cat.short}</span>
                    <span className={`block overflow-hidden text-sm text-charcoal-soft transition-all duration-500 ease-lux ${on ? 'max-h-8 translate-x-2 opacity-100' : 'max-h-0 opacity-0'}`}>{cat.description}</span>
                  </span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-lux ${on ? 'rotate-45 border-olive bg-olive text-warm' : 'border-charcoal/15 text-charcoal'}`}>
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] max-h-[560px] overflow-hidden rounded-soft bg-cream shadow-[0_40px_80px_-40px_rgba(65,68,61,0.55)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={c.slug}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
                animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.8, ease }}
              >
                <motion.div className="h-full w-full" initial={reduce ? false : { scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }}>
                  <Img image={c.card} sizes="40vw" eager />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/75 to-transparent p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-label text-butter">{c.title}</p>
              <p className="mt-1 font-serif text-2xl text-warm">{c.tagline}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------- A short "reel": plays the studio's video when there is one, otherwise a moving photo slideshow ----------
export function Reel({ images, className = '' }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const SLIDE = 3600;
  useEffect(() => {
    if (site.video || reduce) return;
    images.forEach((im) => { const p = new Image(); p.referrerPolicy = 'no-referrer'; p.src = imgUrl(im, 900); });
    const id = setInterval(() => setI((v) => (v + 1) % images.length), SLIDE);
    return () => clearInterval(id);
  }, [images, reduce]);
  if (site.video) {
    return (
      <div className={`relative overflow-hidden rounded-soft bg-charcoal ${className}`}>
        <video src={site.video} poster={imgUrl(images[0], 900)} autoPlay muted loop playsInline className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-soft bg-charcoal ${className}`} aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1 }}>
          <motion.div className="h-full w-full" initial={reduce ? false : { scale: 1.18, x: i % 2 ? '3%' : '-3%' }} animate={{ scale: 1.02, x: '0%' }} transition={{ duration: SLIDE / 1000 + 1.2, ease: 'linear' }}>
            <Img image={images[i]} sizes="(min-width:1024px) 40vw, 100vw" width={900} />
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal/50" />
      {/* story-style progress bars */}
      <div className="absolute inset-x-4 top-4 flex gap-1.5">
        {images.map((_, k) => (
          <span key={k} className="h-[3px] flex-1 overflow-hidden rounded-full bg-warm/30">
            {k === i && <motion.span key={i} className="block h-full origin-left bg-warm" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduce ? 0 : SLIDE / 1000, ease: 'linear' }} />}
            {k < i && <span className="block h-full bg-warm" />}
          </span>
        ))}
      </div>
      <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
        <span className="h-8 w-8 rounded-full border-2 border-warm"><LogoMark className="h-full w-full" /></span>
        <span className="text-sm font-semibold text-warm">{site.instagramHandle}</span>
      </div>
    </div>
  );
}

// ---------- Reviews: a stack of cards; the front one flies away and the next comes forward ----------
function Stars({ n }) {
  return (
    <span className="flex gap-0.5 text-[#C9A13B]" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, k) => (
        <Star key={k} size={16} fill={k < n ? 'currentColor' : 'none'} aria-hidden="true" />
      ))}
    </span>
  );
}

const initialsOf = (name) => name.replace('@', '').split(/\s|&/).filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join('');

export function Reviews({ className = '' }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const n = reviews.length;
  const go = (step) => { setDir(step); setI((v) => (v + step + n) % n); };
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => { setDir(1); setI((v) => (v + 1) % n); }, 5000);
    return () => clearInterval(id);
  }, [paused, reduce, n]);
  // The front card and the two waiting behind it.
  const stack = [0, 1, 2].map((d) => ({ d, r: reviews[(i + d) % n], key: (i + d) % n }));

  return (
    <section className={`section overflow-hidden bg-cream/70 ${className}`}>
      <div className="container-lux grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow">Reviews</p></Reveal>
          <Reveal delay={0.05}><h2 className="mt-3 font-serif text-[2.1rem] leading-tight sm:text-5xl">Kind Words From Our Clients.</h2></Reveal>
          <Reveal delay={0.1}><p className="mt-3 text-xs text-charcoal-soft">{reviewsNote}</p></Reveal>
          <Reveal delay={0.15} className="mt-8 flex items-center gap-4">
            <button type="button" onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 transition hover:border-olive hover:bg-olive hover:text-warm" aria-label="Previous review"><ChevronLeft size={19} /></button>
            <button type="button" onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 transition hover:border-olive hover:bg-olive hover:text-warm" aria-label="Next review"><ChevronRight size={19} /></button>
            <span className="font-serif text-xl text-olive">
              {String(i + 1).padStart(2, '0')} <span className="text-charcoal/30">/ {String(n).padStart(2, '0')}</span>
            </span>
          </Reveal>
          {/* little avatars: the current reviewer grows */}
          <div className="mt-6 flex flex-wrap gap-2">
            {reviews.map((r, k) => (
              <button
                key={k}
                type="button"
                onClick={() => { setDir(k > i ? 1 : -1); setI(k); }}
                aria-label={`Show review from ${r.name}`}
                aria-current={k === i}
                className={`grid h-9 w-9 place-items-center rounded-full font-serif text-sm transition-all duration-500 ease-lux ${k === i ? 'scale-110 bg-olive text-warm shadow-lg' : 'bg-sage text-olive hover:bg-sage/70'}`}
              >
                {initialsOf(r.name)}
              </button>
            ))}
          </div>
        </div>

        <div
          className="relative mx-auto h-[430px] w-full max-w-[540px] sm:h-[360px] lg:col-span-7"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
        >
          <AnimatePresence initial={false} custom={dir}>
            {stack.slice().reverse().map(({ d, r, key }) => (
              <motion.figure
                key={key}
                custom={dir}
                className={`absolute inset-x-0 bottom-12 top-0 flex flex-col rounded-2xl border p-6 sm:p-8 ${d === 0 ? 'cursor-grab border-charcoal/10 bg-warm shadow-[0_40px_70px_-40px_rgba(65,68,61,0.6)] active:cursor-grabbing' : d === 1 ? 'border-olive/10 bg-sage shadow-[0_20px_40px_-30px_rgba(65,68,61,0.5)]' : 'border-olive/10 bg-olive/40'}`}
                style={{ zIndex: 10 - d }}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 70, scale: 0.84 }}
                animate={{
                  opacity: 1,
                  y: d * 22,
                  scale: 1 - d * 0.06,
                  rotate: reduce ? 0 : d === 0 ? 0 : d % 2 ? 2.5 : -2.5,
                  x: 0,
                }}
                exit={reduce ? { opacity: 0 } : (c) => ({ x: c > 0 ? -380 : 380, rotate: c > 0 ? -16 : 16, opacity: 0, transition: { duration: 0.6, ease } })}
                transition={{ duration: 0.7, ease }}
                drag={d === 0 && !reduce ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -90) go(1);
                  else if (info.offset.x > 90) go(-1);
                }}
                aria-hidden={d !== 0}
              >
                <Quote size={34} className="absolute right-6 top-6 text-olive/15" aria-hidden="true" />
                {r.rating ? <Stars n={r.rating} /> : <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-label text-olive">{r.source === 'WhatsApp' ? <MessageCircle size={12} aria-hidden="true" /> : <Instagram size={12} aria-hidden="true" />} Via {r.source}</span>}
                <blockquote className={`mt-4 font-serif leading-snug text-charcoal ${r.text.length > 150 ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>“{r.text}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-4">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sage font-serif text-lg text-olive">{initialsOf(r.name)}</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{r.name}</span>
                    <span className="block text-xs text-charcoal-soft">{r.event}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ---------- Featured shoots as three small cards ----------
export function StoryCards({ items = projects }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.1}>
          <Link to={`/stories/${p.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream">
              <Img image={p.cover} className="img-zoom" sizes="(min-width:640px) 30vw, 100vw" width={700} />
              <span className="absolute left-3 top-3 rounded-full bg-warm/90 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-label text-olive">{p.category}</span>
            </div>
            <h3 className="mt-3 font-serif text-2xl transition-colors group-hover:text-olive">{p.title}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-charcoal-soft">{p.summary}</p>
            <span className="link-underline mt-2 text-sm">View story <ArrowRight size={14} aria-hidden="true" /></span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
