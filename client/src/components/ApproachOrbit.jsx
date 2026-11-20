import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Camera, Gem, Palette } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { approach } from '../data/content';
import { site } from '../data/site';

const ease = [0.22, 1, 0.36, 1];
const icons = { BookOpen, Camera, Gem, Palette };

// Desktop: the four cards sit at the corners; `from` is how far they travel from the logo when they fly out.
const corners = [
  { pos: 'lg:left-0 lg:top-0', from: { x: 260, y: 170 } },
  { pos: 'lg:right-0 lg:top-0', from: { x: -260, y: 170 } },
  { pos: 'lg:left-0 lg:bottom-0', from: { x: 260, y: -170 } },
  { pos: 'lg:right-0 lg:bottom-0', from: { x: -260, y: -170 } },
];

function CentreLogo() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto grid h-[300px] w-[300px] place-items-center sm:h-[340px] sm:w-[340px]">
      {/* two dashed rings turning in opposite directions */}
      <span className="spin-slow absolute inset-0 rounded-full border border-dashed border-warm/25" />
      <span className="spin-slow-reverse absolute inset-10 rounded-full border border-butter/20" />
      {/* small glowing points travelling on the rings */}
      <div className="spin-slow absolute inset-0" aria-hidden="true">
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-butter shadow-[0_0_12px_3px_rgba(248,240,206,0.7)]" />
        <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-sage shadow-[0_0_10px_2px_rgba(220,232,213,0.6)]" />
      </div>
      <div className="spin-slow-reverse absolute inset-10" aria-hidden="true">
        <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-butter/80 shadow-[0_0_10px_2px_rgba(248,240,206,0.6)]" />
      </div>
      <motion.div
        className="relative grid h-36 w-36 place-items-center rounded-full bg-[#F4E9D8] shadow-[0_0_0_10px_rgba(248,240,206,0.08),0_0_60px_10px_rgba(248,240,206,0.18)] sm:h-44 sm:w-44"
        initial={reduce ? false : { scale: 0, rotate: -120 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      >
        <span className="pulse-ring absolute inset-0 rounded-full" />
        <LogoMark className="h-full w-full" alt={site.name} />
      </motion.div>
    </div>
  );
}

function Card({ item, i, wide }) {
  const reduce = useReducedMotion();
  const Icon = icons[item.icon];
  const c = corners[i];
  // Phones: the cards rise up out of the logo above them instead of flying in from the sides.
  const from = wide ? c.from : { x: 0, y: -90 };
  return (
    <motion.div
      className={`lg:absolute lg:w-[300px] ${c.pos}`}
      variants={{
        hidden: { opacity: 0, scale: 0.4, ...from },
        show: { opacity: 1, scale: 1, x: 0, y: 0, transition: { duration: 1.1, delay: 0.35 + i * 0.15, ease } },
      }}
    >
      {/* gentle float once in place */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 + i * 0.4 }}
        className="group h-full rounded-2xl border border-warm/15 bg-warm/[0.06] p-5 backdrop-blur-sm transition-colors duration-500 hover:border-butter/40 hover:bg-warm/[0.1] sm:p-6"
      >
        <div className="flex items-center justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-butter text-olive-deep transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <span className="font-serif text-2xl text-butter/50">0{i + 1}</span>
        </div>
        <h3 className="mt-4 font-serif text-xl leading-tight text-warm sm:text-2xl">{item.title}</h3>
        <p className="mt-1.5 text-sm text-warm/70">{item.text}</p>
      </motion.div>
    </motion.div>
  );
}

/** "How we work": the logo in the middle, photos circling it, four cards flying out to the corners. */
export function ApproachOrbit() {
  const reduce = useReducedMotion();
  const wide = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-olive-deep via-[#3f4936] to-charcoal py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-butter/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sage/10 blur-[100px]" />
      <div className="container-lux relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-butter">How we work</p>
          <h2 className="mt-3 font-serif text-[2.1rem] text-warm sm:text-5xl">The Art Behind Every Frame.</h2>
        </div>
        {/* This box (always on screen) starts the animation, not the cards, which begin off to the side. */}
        <motion.div
          className="relative mx-auto mt-10 max-w-5xl lg:mt-6 lg:h-[560px]"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <CentreLogo />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
            {approach.map((item, i) => <Card key={item.title} item={item} i={i} wide={wide} />)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
