import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, BookOpen, Camera, Check, ChevronLeft, ChevronRight, Gem, Instagram, MapPin, Palette, Plus, Quote, Star } from 'lucide-react';
import { Img, Reveal, RevealImage, Stagger, staggerItem } from './Motion';
import { SectionHeading } from './Common';
import { categories } from '../data/categories';
import { approach, faqs, instagramGrid, packages, packagesNote, projects, testimonials, testimonialsNote } from '../data/content';
import { site } from '../data/site';

const ease = [0.22, 1, 0.36, 1];
const icons = { BookOpen, Camera, Gem, Palette };

// ---------- Services: category cards (2 columns on phones, asymmetric on desktop) ----------
// Mixed frames: wide feature cards top and bottom, three tall cards in the middle (desktop);
// one wide card then two per row on phones.
const layout = [
  { wrap: 'col-span-2 lg:col-span-7', aspect: 'aspect-[16/10]', sizes: '(min-width:1024px) 58vw, 100vw' },
  { wrap: 'col-span-1 lg:col-span-5', aspect: 'aspect-[4/5] lg:aspect-[5/4]', sizes: '(min-width:1024px) 42vw, 50vw' },
  { wrap: 'col-span-1 lg:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width:1024px) 33vw, 50vw' },
  { wrap: 'col-span-1 lg:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width:1024px) 33vw, 50vw' },
  { wrap: 'col-span-1 lg:col-span-4', aspect: 'aspect-[4/5]', sizes: '(min-width:1024px) 33vw, 50vw' },
  { wrap: 'col-span-1 lg:col-span-5', aspect: 'aspect-[4/5] lg:aspect-[5/4]', sizes: '(min-width:1024px) 42vw, 50vw' },
  { wrap: 'col-span-1 lg:col-span-7', aspect: 'aspect-[4/5] lg:aspect-[16/10]', sizes: '(min-width:1024px) 58vw, 50vw' },
];

/** Photo card with the title set on the image. */
export function ServiceCard({ category, aspect = 'aspect-[4/5]', sizes = '(min-width:1024px) 33vw, 50vw' }) {
  return (
    <Link
      to={category.path}
      className={`group relative block overflow-hidden rounded-xl bg-cream sm:rounded-soft ${aspect}`}
      aria-label={`${category.title} — explore gallery`}
    >
      <Img image={category.card} className="img-zoom" sizes={sizes} />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/15 to-transparent transition-opacity duration-700 group-hover:from-charcoal/85" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
        <div className="min-w-0">
          <p className="hidden text-[0.65rem] font-semibold uppercase tracking-label text-butter sm:block">{category.description}</p>
          <h3 className="mt-1 font-serif text-xl leading-tight text-warm sm:text-3xl">{category.title.replace(' Photography', '')}</h3>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-warm/50 text-warm transition-all duration-500 ease-lux group-hover:rotate-45 group-hover:bg-warm group-hover:text-olive sm:h-11 sm:w-11">
          <ArrowUpRight size={17} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5">
      {categories.map((c, i) => (
        <Reveal key={c.slug} delay={(i % 3) * 0.08} className={layout[i].wrap}>
          <ServiceCard category={c} aspect={layout[i].aspect} sizes={layout[i].sizes} />
        </Reveal>
      ))}
    </div>
  );
}

// ---------- Approach ----------
export function Approach() {
  const reduce = useReducedMotion();
  return (
    <Stagger className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4" gap={0.14}>
      {approach.map((a, i) => {
        const Icon = icons[a.icon];
        return (
          <motion.div key={a.title} variants={staggerItem} className="group rounded-soft border border-charcoal/8 bg-warm p-5 transition-all duration-700 sm:p-8 ease-lux hover:-translate-y-1 hover:border-olive/25 hover:shadow-[0_30px_60px_-30px_rgba(89,102,77,0.35)]">
            <div className="flex items-center justify-between">
              <motion.span
                className="grid h-11 w-11 place-items-center rounded-full bg-sage sm:h-14 sm:w-14 text-olive transition-colors duration-500 group-hover:bg-olive group-hover:text-warm"
                initial={reduce ? false : { rotate: -30, scale: 0.6 }}
                whileInView={{ rotate: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.2 + i * 0.12 }}
              >
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              </motion.span>
              <span className="font-serif text-xl text-olive/45 sm:text-2xl">0{i + 1}</span>
            </div>
            <h3 className="mt-5 font-serif text-xl leading-tight sm:mt-8 sm:text-[1.7rem]">{a.title}</h3>
            <p className="mt-2 text-sm text-charcoal-soft sm:text-[0.97rem]">{a.text}</p>
          </motion.div>
        );
      })}
    </Stagger>
  );
}

// ---------- Featured projects (editorial) ----------
export function FeaturedProjects({ items = projects.slice(0, 3) }) {
  return (
    <div className="space-y-16 sm:space-y-28">
      {items.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <article key={p.slug} className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
              <Link to={`/stories/${p.slug}`} className="group block" aria-label={`View story: ${p.title}`}>
                <RevealImage image={p.cover} aspect="aspect-[4/3] lg:aspect-[5/4]" direction={flip ? 'left' : 'up'} sizes="(min-width:1024px) 58vw, 100vw" />
              </Link>
            </div>
            <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : ''}`}>
              <Reveal>
                <p className="eyebrow">{p.category}</p>
                <h3 className="mt-3 font-serif text-3xl sm:text-5xl">{p.title}</h3>
                {p.location && <p className="mt-3 flex items-center gap-2 text-sm text-charcoal-soft"><MapPin size={15} className="text-olive" aria-hidden="true" /> {p.location}</p>}
                <p className="lead mt-3 sm:mt-5">{p.summary}</p>
                <Link to={`/stories/${p.slug}`} className="link-underline mt-5 sm:mt-8">View Story <ArrowRight size={16} aria-hidden="true" /></Link>
              </Reveal>
            </div>
          </article>
        );
      })}
    </div>
  );
}

// ---------- Packages ----------
export function Packages() {
  return (
    <>
      <Stagger className="grid gap-6 lg:grid-cols-3" gap={0.15}>
        {packages.map((p) => (
          <motion.div
            key={p.name}
            variants={staggerItem}
            className={`relative flex flex-col rounded-soft p-7 transition-transform sm:p-9 duration-700 ease-lux hover:-translate-y-1.5 ${
              p.featured ? 'bg-sage shadow-[0_40px_80px_-40px_rgba(89,102,77,0.5)] lg:-mt-4 lg:pb-12' : 'border border-charcoal/10 bg-warm'
            }`}
          >
            {p.featured && <span className="absolute -top-3.5 left-9 rounded-full bg-butter px-4 py-1.5 text-xs font-semibold uppercase tracking-label text-olive">Most loved</span>}
            <h3 className="font-serif text-3xl sm:text-4xl">{p.name}</h3>
            <p className="mt-2 text-[0.95rem] text-charcoal-soft">{p.ideal}</p>
            <p className="mt-5 border-y border-charcoal/10 py-4 font-serif text-xl sm:mt-7 sm:py-5 sm:text-2xl italic text-olive">{p.price}</p>
            <ul className="mt-5 flex-1 space-y-3 sm:mt-7">
              {p.inclusions.map((inc) => (
                <li key={inc} className="flex gap-3 text-[0.97rem]">
                  <Check size={18} className="mt-1 shrink-0 text-olive" aria-hidden="true" /> {inc}
                </li>
              ))}
            </ul>
            <Link to={`/contact?package=${p.name}`} className={`${p.featured ? 'btn-primary' : 'btn-outline'} mt-7 w-full sm:mt-9`}>
              Enquire about {p.name}
            </Link>
          </motion.div>
        ))}
      </Stagger>
      <Reveal><p className="mt-10 text-center text-sm text-charcoal-soft">{packagesNote}</p></Reveal>
    </>
  );
}

// ---------- Testimonials carousel ----------
export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const t = testimonials[i];
  const go = (step) => {
    setDir(step);
    setI((v) => (v + step + testimonials.length) % testimonials.length);
  };
  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(() => go(1), 7000);
    return () => clearInterval(id);
  }, [paused, reduce, i]);

  return (
    <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-soft bg-cream sm:aspect-[16/10] lg:col-span-5 lg:aspect-[4/5]">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { clipPath: dir > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 1 }}
            transition={{ duration: 1, ease }}
          >
            <Img image={t.image} sizes="(min-width:1024px) 40vw, 100vw" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="lg:col-span-7" aria-live="polite">
        <Quote size={36} className="text-olive/35" strokeWidth={1.2} aria-hidden="true" />
        <AnimatePresence mode="wait">
          <motion.figure
            key={i}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease }}
          >
            <blockquote className="mt-4 font-serif text-[1.6rem] leading-snug text-charcoal sm:mt-6 sm:text-[2.4rem]">“{t.quote}”</blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-semibold">{t.name}</span>
              <span className="text-sm text-charcoal-soft">{t.event}</span>
              {t.verified && t.rating && (
                <span className="flex items-center gap-0.5 text-olive" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={15} fill="currentColor" aria-hidden="true" />)}
                </span>
              )}
            </figcaption>
          </motion.figure>
        </AnimatePresence>
        <div className="mt-10 flex items-center gap-4">
          <button onClick={() => go(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/15 transition hover:border-olive hover:bg-olive hover:text-warm" aria-label="Previous testimonial"><ChevronLeft size={20} /></button>
          <button onClick={() => go(1)} className="grid h-12 w-12 place-items-center rounded-full border border-charcoal/15 transition hover:border-olive hover:bg-olive hover:text-warm" aria-label="Next testimonial"><ChevronRight size={20} /></button>
          <div className="ml-2 flex gap-2">
            {testimonials.map((_, k) => (
              <button key={k} onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} aria-label={`Show testimonial ${k + 1}`} aria-current={k === i} className="grid h-6 w-6 place-items-center">
                <span className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? 'w-8 bg-olive' : 'w-3 bg-charcoal/20'}`} />
              </button>
            ))}
          </div>
        </div>
        <p className="mt-8 text-xs text-charcoal-soft">{testimonialsNote}</p>
      </div>
    </div>
  );
}

// ---------- Instagram ----------
export function InstagramGallery() {
  return (
    <>
      <Stagger className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6" gap={0.08}>
        {instagramGrid.map((img, k) => (
          <motion.a
            key={k}
            variants={staggerItem}
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-xl bg-cream"
            aria-label={`View on Instagram: ${img.alt}`}
          >
            <Img image={img} className="img-zoom" sizes="(min-width:1024px) 16vw, 50vw" width={500} />
            <span className="absolute inset-0 grid place-items-center bg-olive/55 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <Instagram size={26} className="text-warm" aria-hidden="true" />
            </span>
          </motion.a>
        ))}
      </Stagger>
      <Reveal className="mt-10 text-center">
        <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">
          <Instagram size={16} aria-hidden="true" /> Follow {site.instagramHandle}
        </a>
      </Reveal>
    </>
  );
}

// ---------- FAQ accordion ----------
export function FaqList({ items = faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((f, k) => {
        const on = open === k;
        return (
          <div key={f.q}>
            <h3 className="font-sans">
              <button
                type="button"
                onClick={() => setOpen(on ? -1 : k)}
                aria-expanded={on}
                aria-controls={`faq-${k}`}
                id={`faq-btn-${k}`}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-xl text-charcoal transition-colors sm:text-2xl hover:text-olive"
              >
                {f.q}
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${on ? 'rotate-45 border-olive bg-olive text-warm' : 'border-charcoal/15'}`}>
                  <Plus size={16} aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`faq-${k}`}
                  role="region"
                  aria-labelledby={`faq-btn-${k}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 text-charcoal-soft">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export { SectionHeading };
