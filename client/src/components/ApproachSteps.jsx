import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Camera, Gem, Palette } from 'lucide-react';
import { Img } from './Motion';
import { approach } from '../data/content';
import { album as a } from '../data/images';

const ease = [0.22, 1, 0.36, 1];
const icons = { BookOpen, Camera, Gem, Palette };
// One of the studio's own photos for each step, in the same order as `approach`.
const photos = [a.windowHands, a.maroonCurtain, a.brideMehendi, a.pastelClose];

function StepCard({ item, i }) {
  const reduce = useReducedMotion();
  const Icon = icons[item.icon];
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: i * 0.15, ease } },
      }}
      className={`group relative ${i % 2 === 1 ? 'lg:mt-12' : ''}`}
    >
      {/* photo opens like a curtain, then zooms gently on hover */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-soft bg-cream shadow-[0_30px_60px_-35px_rgba(65,68,61,0.55)]">
        <motion.div
          className="absolute inset-0"
          variants={{
            hidden: reduce ? {} : { clipPath: 'inset(0% 0% 100% 0%)' },
            show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, delay: 0.15 + i * 0.15, ease } },
          }}
        >
          <Img image={photos[i]} className="img-zoom" sizes="(min-width:1024px) 23vw, 50vw" width={700} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/5 to-charcoal/45" />
        <span className="absolute left-4 top-3 font-serif text-5xl text-warm/90 drop-shadow sm:text-6xl">0{i + 1}</span>
        {/* title on the photo; the line of text slides open on hover (always shown on phones and tablets) */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-serif text-xl leading-tight text-warm sm:text-2xl">{item.title}</h3>
          <p className="mt-1 text-sm text-warm/85 transition-all duration-500 ease-lux lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:opacity-100">
            {item.text}
          </p>
        </div>
      </div>
      {/* icon badge sitting on the photo's top edge */}
      <motion.span
        className="absolute -top-5 right-5 grid h-12 w-12 place-items-center rounded-full border-4 border-warm bg-olive text-warm shadow-lg"
        variants={{
          hidden: reduce ? {} : { scale: 0, rotate: -90 },
          show: { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 220, damping: 14, delay: 0.6 + i * 0.15 } },
        }}
      >
        <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
      </motion.span>
    </motion.article>
  );
}

/** "How we work": four photo cards in a gently staggered row, each revealing its photo and step. */
export function ApproachSteps() {
  const reduce = useReducedMotion();
  return (
    <section className="section bg-sage/40">
      <div className="container-lux">
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <p className="eyebrow">How we work</p>
          <h2 className="mt-3 font-serif text-[2.1rem] sm:text-5xl">The Art Behind Every Frame.</h2>
          {/* a short line that draws itself under the heading */}
          <motion.span
            className="mx-auto mt-5 block h-px w-24 origin-center bg-olive/60"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          />
        </div>
        <motion.div
          className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {approach.map((item, i) => <StepCard key={item.title} item={item} i={i} />)}
        </motion.div>
      </div>
    </section>
  );
}
