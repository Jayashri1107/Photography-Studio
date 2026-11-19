import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Img } from './Motion';
import { imgUrl } from '../lib/img';
import { categories } from '../data/categories';

const ease = [0.22, 1, 0.36, 1];
const aspect = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' };

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
            src={imgUrl(item.image, 1800)}
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

/** Masonry gallery with category filters and a full-screen lightbox. */
export function MasonryGallery({ items, filters = true, initial = 'all' }) {
  const [active, setActive] = useState(initial);
  const [open, setOpen] = useState(null);
  const reduce = useReducedMotion();

  const shown = useMemo(() => (active === 'all' ? items : items.filter((i) => i.category === active)), [items, active]);
  const available = useMemo(() => categories.filter((c) => items.some((i) => i.category === c.slug)), [items]);

  return (
    <div>
      {filters && (
        <div className="mb-12 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter photographs by category">
          {[{ slug: 'all', short: 'All' }, ...available].map((c) => {
            const on = active === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setActive(c.slug)}
                aria-pressed={on}
                className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${on ? 'text-warm' : 'text-charcoal hover:text-olive'}`}
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
          className="columns-1 gap-5 sm:columns-2 lg:columns-3"
        >
          {shown.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setOpen(i)}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease }}
              className={`group relative mb-5 block w-full overflow-hidden rounded-soft bg-cream text-left ${aspect[item.image.shape] || aspect.tall}`}
              aria-label={`Open photo: ${item.project}, ${item.categoryLabel}`}
            >
              <Img image={item.image} className="img-zoom" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" width={900} />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="eyebrow text-butter">{item.categoryLabel}</span>
                <span className="mt-1 font-serif text-2xl text-warm">{item.project}</span>
                <Expand size={18} className="absolute right-5 top-5 text-warm" aria-hidden="true" />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {open !== null && <Lightbox items={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}
