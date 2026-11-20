import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Img } from './Motion';
import { imgSrcSet, imgUrl } from '../lib/img';
import { categories } from '../data/categories';

const ease = [0.22, 1, 0.36, 1];

export function Lightbox({ items, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const reduce = useReducedMotion();
  const [dir, setDir] = useState(0);
  const item = items[index];

  const go = useCallback(
    (step) => {
      setDir(step);
      onIndex((index + step + items.length) % items.length);
    },
    [index, items.length, onIndex]
  );

  useEffect(() => {
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  if (!item) return null;
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[70] flex flex-col bg-charcoal/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-warm sm:px-8">
        <p className="text-sm tracking-wide text-warm/80">
          <span className="text-butter">{item.categoryLabel}</span> · {item.project}
          <span className="ml-3 text-warm/60">{index + 1} / {items.length}</span>
        </p>
        <button ref={closeRef} onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full border border-warm/30 hover:bg-warm hover:text-charcoal" aria-label="Close photo viewer">
          <X size={20} />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-20">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.img
            key={item.id}
            src={imgUrl(item.image, 1600)}
            srcSet={imgSrcSet(item.image)}
            sizes="100vw"
            referrerPolicy="no-referrer"
            alt={item.image.alt}
            custom={dir}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 80, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -80, scale: 0.98 }}
            transition={{ duration: 0.6, ease }}
            drag={reduce ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(1);
              else if (info.offset.x > 80) go(-1);
            }}
            className="max-h-[78vh] max-w-full cursor-grab select-none rounded-xl object-contain active:cursor-grabbing"
          />
        </AnimatePresence>
        <button onClick={() => go(-1)} className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-warm/10 text-warm transition hover:bg-warm hover:text-charcoal sm:left-6" aria-label="Previous photo">
          <ChevronLeft size={22} />
        </button>
        <button onClick={() => go(1)} className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-warm/10 text-warm transition hover:bg-warm hover:text-charcoal sm:right-6" aria-label="Next photo">
          <ChevronRight size={22} />
        </button>
      </div>
    </motion.div>
  );
}

// Editorial rhythm of six frames: one large feature, two landscape crops, then three taller frames.
// Every other group mirrors (feature on the right). Photos are cropped around `image.pos`, so faces stay in frame.
// Phones (6 columns) and desktops (12 columns) each get their own spans.
const TILE = [
  { cls: 'col-span-6 row-span-5 md:col-span-7 md:row-span-5', sizes: '(min-width:768px) 60vw, 100vw' },
  { cls: 'col-span-3 row-span-3 md:col-span-5 md:row-span-3', sizes: '(min-width:768px) 42vw, 50vw' },
  { cls: 'col-span-3 row-span-3 md:col-span-5 md:row-span-2', sizes: '(min-width:768px) 42vw, 50vw' },
  { cls: 'col-span-6 row-span-4 md:col-span-4 md:row-span-4', sizes: '(min-width:768px) 34vw, 100vw' },
  { cls: 'col-span-3 row-span-4 md:col-span-4 md:row-span-4', sizes: '(min-width:768px) 34vw, 50vw' },
  { cls: 'col-span-3 row-span-4 md:col-span-4 md:row-span-4', sizes: '(min-width:768px) 34vw, 50vw' },
];
const MIRROR = 'md:col-start-6';

// When the last group is not complete, stretch its frames so the grid ends without gaps.
function lastGroupTile(slot, n) {
  const wide = '(min-width:768px) 60vw, 100vw';
  if (n === 1) return { cls: 'col-span-6 row-span-5 md:col-span-12 md:row-span-6', sizes: '100vw' };
  if (n === 2 && slot === 1) return { cls: 'col-span-6 row-span-5 md:col-span-5 md:row-span-5', sizes: wide };
  if (n === 4 && slot === 3) return { cls: 'col-span-6 row-span-4 md:col-span-12 md:row-span-5', sizes: '100vw' };
  if (n === 5 && (slot === 3 || slot === 4)) return { cls: 'col-span-6 row-span-4 md:col-span-6 md:row-span-5', sizes: wide };
  return null;
}

export function EditorialGrid({ items, onOpen }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid auto-rows-[52px] grid-flow-dense grid-cols-6 gap-2 sm:auto-rows-[72px] sm:gap-3 md:grid-cols-12 lg:auto-rows-[92px] lg:gap-4">
      {items.map((item, i) => {
        const slot = i % TILE.length;
        const group = Math.floor(i / TILE.length);
        const inLast = items.length - group * TILE.length;
        const tile = (inLast < TILE.length && lastGroupTile(slot, inLast)) || TILE[slot];
        const mirror = slot === 0 && group % 2 === 1 ? MIRROR : '';
        return (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => onOpen(i)}
            initial={reduce ? false : { opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: (slot % 3) * 0.08, ease }}
            className={`group relative overflow-hidden rounded-lg bg-cream text-left sm:rounded-xl ${tile.cls} ${mirror}`}
            aria-label={`Open photo: ${item.project}, ${item.categoryLabel}`}
          >
            <Img image={item.image} className="img-zoom" sizes={tile.sizes} />
            <span className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex translate-y-2 flex-col p-4 opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-6">
              <span className="text-[0.65rem] font-semibold uppercase tracking-label text-butter">{item.categoryLabel}</span>
              <span className="mt-1 font-serif text-lg text-warm sm:text-2xl">{item.project}</span>
            </span>
            <Expand size={16} className="absolute right-4 top-4 text-warm opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
          </motion.button>
        );
      })}
    </div>
  );
}

/** Small square tiles, Instagram style — keeps long galleries short. */
export function SquareGrid({ items, onOpen }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 sm:gap-2.5 lg:grid-cols-6">
      {items.map((item, i) => (
        <motion.button
          key={item.id}
          type="button"
          onClick={() => onOpen(i)}
          initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: i % 2 ? 3 : -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.7, delay: (i % 6) * 0.06, ease }}
          className="group relative aspect-square overflow-hidden rounded-md bg-cream text-left sm:rounded-lg"
          aria-label={`Open photo: ${item.project}, ${item.categoryLabel}`}
        >
          <Img image={item.image} className="img-zoom" sizes="(min-width:1024px) 16vw, (min-width:640px) 25vw, 33vw" width={500} />
          <span className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/75 to-transparent p-2.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="text-[0.62rem] font-semibold uppercase tracking-label text-butter">{item.categoryLabel}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}

/** Gallery with category filters, an editorial mixed-size layout and a full-screen lightbox. */
export function MasonryGallery({ items, filters = true, initial = 'all', compact = false, limit = 12 }) {
  const [active, setActive] = useState(initial);
  const [open, setOpen] = useState(null);
  const [count, setCount] = useState(limit);
  useEffect(() => setCount(limit), [active, limit]);
  const reduce = useReducedMotion();

  const shown = useMemo(() => (active === 'all' ? items : items.filter((i) => i.category === active)), [items, active]);
  const available = useMemo(() => categories.filter((c) => items.some((i) => i.category === c.slug)), [items]);

  return (
    <div>
      {filters && (
        <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mb-12 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0" role="group" aria-label="Filter photographs by category">
          {[{ slug: 'all', short: 'All' }, ...available].map((c) => {
            const on = active === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActive(c.slug)}
                aria-pressed={on}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium sm:px-5 sm:py-2.5 transition-colors duration-300 ${on ? 'text-warm' : 'text-charcoal hover:text-olive'}`}
              >
                {on && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-olive" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                {!on && <span className="absolute inset-0 rounded-full border border-charcoal/12" />}
                <span className="relative">{c.short}</span>
              </button>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease }}
        >
          {compact ? <SquareGrid items={shown.slice(0, count)} onOpen={setOpen} /> : <EditorialGrid items={shown} onOpen={setOpen} />}
        </motion.div>
      </AnimatePresence>

      {compact && shown.length > count && (
        <div className="mt-8 text-center">
          <button type="button" onClick={() => setCount((n) => n + limit)} className="btn-outline">
            Show more photos <span className="text-charcoal-soft">({shown.length - count})</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {open !== null && <Lightbox items={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}
