import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp, ChevronDown, Facebook, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { mainNav, site, whatsappLink } from '../data/site';
import { categories } from '../data/categories';

const ease = [0.22, 1, 0.36, 1];

export function Logo({ light = false }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label={`${site.name} — home`}>
      {/* The logo file has a white square behind the circle, so it is cropped to a circle here. */}
      <span className={`block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#F4E9D8] shadow-[0_8px_22px_-8px_rgba(0,0,0,0.55)] ring-2 transition-transform duration-500 group-hover:scale-105 sm:h-[4.75rem] sm:w-[4.75rem] ${light ? 'ring-warm/60' : 'ring-olive/20'}`}>
        <img src={site.logo} alt="" width="76" height="76" className="h-full w-full scale-[1.16] object-cover" />
      </span>
      <span className="leading-none">
        <span className={`block font-serif text-[1.6rem] font-medium tracking-wide transition-colors duration-500 sm:text-[1.9rem] ${light ? 'text-warm' : 'text-charcoal'}`}>Rupak</span>
        <span className={`mt-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.32em] sm:text-[0.68rem] transition-colors duration-500 ${light ? 'text-warm/85' : 'text-olive'}`}>Camatography</span>
      </span>
    </Link>
  );
}

const serviceLike = (path) => path === '/services' || categories.some((c) => c.path === path);

export function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); setMenu(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;
  const isActive = (to) => (to === '/' ? pathname === '/' : to === '/services' ? serviceLike(pathname) : pathname.startsWith(to));

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-lux ${
        solid ? 'bg-warm/95 py-3 shadow-[0_1px_0_rgba(65,68,61,0.08)] backdrop-blur-md' : 'bg-gradient-to-b from-charcoal/40 to-transparent py-5'
      }`}
    >
      <nav className="container-lux flex items-center justify-between" aria-label="Main">
        <Logo light={!solid} />

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = isActive(item.to);
            const isServices = item.to === '/services';
            return (
              <li
                key={item.to}
                className="relative"
                onMouseEnter={() => isServices && setMenu(true)}
                onMouseLeave={() => isServices && setMenu(false)}
              >
                <NavLink
                  to={item.to}
                  className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    solid ? (active ? 'text-olive' : 'text-charcoal hover:text-olive') : 'text-warm hover:text-butter'
                  }`}
                  onFocus={() => isServices && setMenu(true)}
                >
                  {item.label}
                  {isServices && <ChevronDown size={14} aria-hidden="true" />}
                  {active && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={`absolute inset-x-4 -bottom-0.5 h-px ${solid ? 'bg-olive' : 'bg-butter'}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </NavLink>
                {isServices && (
                  <AnimatePresence>
                    {menu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.3, ease }}
                        className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setMenu(false)}
                      >
                        <div className="rounded-2xl border border-charcoal/5 bg-warm p-3 shadow-[0_24px_60px_-20px_rgba(65,68,61,0.35)]">
                          {categories.map((c) => (
                            <Link key={c.slug} to={c.path} className="block rounded-xl px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-sage/50 hover:text-olive">
                              {c.title}
                            </Link>
                          ))}
                          <Link to="/services" className="mt-1 block rounded-xl bg-butter/70 px-4 py-2.5 text-sm font-semibold text-olive hover:bg-butter">
                            Services & Packages
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <Link to="/contact" className={`hidden sm:inline-flex ${solid ? 'btn-primary' : 'btn-light'} !px-6 !py-3`}>
            Book a Shoot
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${solid ? 'border-charcoal/15 text-charcoal' : 'border-warm/50 text-warm'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease }}
            className="fixed inset-0 z-[45] overflow-y-auto bg-warm pt-[76px] lg:hidden"
          >
            <motion.ul
              className="container-lux flex flex-col gap-1 pb-10 pt-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
            >
              {[...mainNav, { label: 'FAQ', to: '/faq' }].map((item) => (
                <motion.li key={item.to} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                  <NavLink
                    to={item.to}
                    className={`block border-b border-charcoal/10 py-4 font-serif text-3xl ${isActive(item.to) ? 'text-olive' : 'text-charcoal'}`}
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-6">
                <p className="eyebrow mb-3">Photography</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <Link key={c.slug} to={c.path} className="rounded-full bg-sage/60 px-4 py-2 text-sm text-charcoal">
                      {c.short}
                    </Link>
                  ))}
                </div>
              </motion.li>
              <motion.li variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className="mt-8">
                <Link to="/contact" className="btn-primary w-full">Book a Shoot</Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-olive/80" style={{ scaleX }} />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease }}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          className="group fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-olive text-warm shadow-[0_14px_30px_-12px_rgba(65,68,61,0.6)] transition-colors hover:bg-olive-deep"
          aria-label="Back to top"
        >
          <ArrowUp size={18} className="transition-transform duration-500 ease-lux group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-sage/45 pt-14 text-charcoal sm:pt-20">
      <div className="container-lux grid grid-cols-2 gap-x-6 gap-y-10 pb-12 sm:pb-16 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr] lg:gap-12">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-charcoal-soft">{site.intro}</p>
          <div className="mt-6 flex gap-3">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-olive/30 text-olive transition hover:bg-olive hover:text-warm">
              <Instagram size={18} />
            </a>
            {site.facebook && (
              <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-olive/30 text-olive transition hover:bg-olive hover:text-warm">
                <Facebook size={18} />
              </a>
            )}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="grid h-11 w-11 place-items-center rounded-full border border-olive/30 text-olive transition hover:bg-olive hover:text-warm">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
        <div>
          <h2 className="eyebrow mb-5 font-sans">Explore</h2>
          <ul className="space-y-3 text-[0.95rem]">
            {[...mainNav, { label: 'FAQ', to: '/faq' }].map((l) => (
              <li key={l.to}><Link to={l.to} className="transition-colors hover:text-olive">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5 font-sans">Photography</h2>
          <ul className="space-y-3 text-[0.95rem]">
            {categories.map((c) => (
              <li key={c.slug}><Link to={c.path} className="transition-colors hover:text-olive">{c.short}</Link></li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <h2 className="eyebrow mb-5 font-sans">Visit & Contact</h2>
          <ul className="space-y-4 text-[0.95rem]">
            <li className="flex gap-3">
              <Phone size={18} className="mt-1 shrink-0 text-olive" aria-hidden="true" />
              <span className="flex flex-col">
                {site.phones.map((p) => <a key={p.href} href={p.href} className="hover:text-olive">+91 {p.label}</a>)}
              </span>
            </li>
            {site.email && (
              <li className="flex gap-3"><Mail size={18} className="mt-1 shrink-0 text-olive" aria-hidden="true" /><a href={`mailto:${site.email}`} className="break-all hover:text-olive">{site.email}</a></li>
            )}
            <li className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-olive" aria-hidden="true" /><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-olive">{site.address}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-charcoal/10">
        <div className="container-lux flex flex-col items-center justify-between gap-2 py-6 text-sm text-charcoal-soft sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Chhatrapati Sambhajinagar, Maharashtra</p>
        </div>
      </div>
    </footer>
  );
}
