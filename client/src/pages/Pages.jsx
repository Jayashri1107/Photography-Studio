import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Reveal, RevealImage, Stagger, staggerItem, TextReveal } from '../components/Motion';
import { BookingCTA, PageHero, SectionHeading, Seo } from '../components/Common';
import { Approach, FaqList, FeaturedProjects, Packages, ServiceCard, Testimonials } from '../components/Sections';
import { MasonryGallery } from '../components/Gallery';
import BookingForm from '../components/BookingForm';
import { motion } from 'framer-motion';
import { album as a, images } from '../data/images';
import { categories, categoryBySlug } from '../data/categories';
import { faqs, interleaved, portfolio, projects } from '../data/content';
import { site, whatsappLink } from '../data/site';

// ---------------- About ----------------
export function About() {
  const values = [
    { title: 'Presence over posing', text: 'Gentle guidance, real moments.' },
    { title: 'Respect for tradition', text: 'Every ritual, every elder, covered.' },
    { title: 'Timeless colour', text: 'True skin tones that never date.' },
    { title: 'Care after the shoot', text: 'Private gallery and heirloom albums.' },
  ];
  return (
    <>
      <Seo title="About Us" description="Meet Photography Studio — an Indian photography team creating timeless, editorial images of weddings, families and brands." />
      <PageHero eyebrow="About us" title="Quietly present, endlessly curious." text="The people and process behind every frame." image={a.windowHands} />

      <section className="section">
        <div className="container-lux grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="mx-auto w-full max-w-[340px] sm:max-w-md lg:col-span-5 lg:max-w-none">
            <RevealImage image={a.maroonCurtain} aspect="aspect-[4/5]" sizes="(min-width:1024px) 40vw, 340px" />
          </div>
          <div className="lg:col-span-7 lg:pt-10">
            <Reveal><p className="eyebrow mb-5">Our story</p></Reveal>
            <TextReveal text="It started with a borrowed camera and a cousin’s wedding." className="h2" />
            <Reveal delay={0.1}>
              <p className="lead mt-6">The most valuable photographs are honest ones — the laughter at the haldi, a quiet glance, a father’s blessing.</p>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6">
              {values.map((v) => (
                <motion.div key={v.title} variants={staggerItem} className="rounded-xl bg-sage/45 p-4 sm:rounded-soft sm:p-7">
                  <h3 className="font-serif text-lg leading-tight sm:text-2xl">{v.title}</h3>
                  <p className="mt-1 text-sm text-charcoal-soft sm:mt-2 sm:text-[0.97rem]">{v.text}</p>
                </motion.div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section bg-cream/70">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="How we work" title="The Art Behind Every Frame." className="mb-10 sm:mb-14" />
          <Approach />
        </div>
      </section>

      <section className="section">
        <div className="container-lux">
          <SectionHeading eyebrow="The process" title="From Hello to Heirloom." className="mb-10 sm:mb-14" />
          <ol className="grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4">
            {[
              ['Enquiry', 'Form or WhatsApp.'],
              ['Consultation', 'A relaxed planning call.'],
              ['The shoot', 'We capture the story.'],
              ['Delivery', 'Gallery, albums, prints.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.1} className="border-t border-olive/30 pt-6">
                <span className="font-serif text-3xl text-olive/50 sm:text-5xl">0{i + 1}</span>
                <h3 className="mt-2 font-serif text-2xl sm:mt-4 sm:text-3xl">{t}</h3>
                <p className="mt-2 text-charcoal-soft">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <BookingCTA image={a.gardenWalk} />
    </>
  );
}

// ---------------- Portfolio ----------------
export function Portfolio() {
  const [params] = useSearchParams();
  const initial = categoryBySlug[params.get('category')] ? params.get('category') : 'all';
  return (
    <>
      <Seo title="Portfolio" description="Browse the Photography Studio portfolio — Indian weddings, pre-wedding, maternity, newborn, portrait, event and fashion photography." />
      <PageHero eyebrow="Portfolio" title="A Glimpse Into Our World." text="Tap any photo to view it full-screen." image={a.maroonEmbrace} />
      <section className="section">
        <div className="container-lux">
          <MasonryGallery key={initial} items={interleaved(portfolio)} initial={initial} />
        </div>
      </section>
      <section className="section bg-cream/70">
        <div className="container-lux">
          <SectionHeading eyebrow="Stories" title="Featured Shoots." className="mb-12 sm:mb-16" />
          <FeaturedProjects items={projects} />
        </div>
      </section>
      <BookingCTA />
    </>
  );
}

// ---------------- Category page (shared by the seven photography pages) ----------------
export function CategoryPage({ slug }) {
  const c = categoryBySlug[slug];
  const items = portfolio.filter((p) => p.category === slug);
  const others = categories.filter((x) => x.slug !== slug).slice(0, 3);
  const related = projects.filter((p) => p.categorySlug === slug);
  return (
    <>
      <Seo title={c.title} description={c.seo} />
      <PageHero eyebrow={c.title} title={c.tagline} text={c.description} image={c.cover}>
        <Link to={`/contact?category=${c.slug}`} className="btn-light">Book this shoot <ArrowRight size={16} aria-hidden="true" /></Link>
        <a href="#gallery" className="btn-glass">View gallery</a>
      </PageHero>

      <section className="section">
        <div className="container-lux grid gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6">
            <Reveal><p className="eyebrow mb-4">The experience</p></Reveal>
            <TextReveal text={`Our ${c.short.toLowerCase()} photography.`} className="h2" />
            <Reveal delay={0.1}><p className="lead mt-5">{c.intro}</p></Reveal>
            <Reveal delay={0.3}>
              <Link to={`/contact?category=${c.slug}`} className="btn-primary mt-7">Check availability <ArrowRight size={16} aria-hidden="true" /></Link>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-soft bg-sage/45 p-6 sm:p-10">
              <h3 className="font-serif text-2xl sm:text-3xl">What’s included</h3>
              <Stagger className="mt-5 grid grid-cols-2 gap-3 text-sm sm:mt-7 sm:gap-4 sm:text-base" gap={0.07}>
                {c.highlights.map((h) => (
                  <motion.p key={h} variants={staggerItem} className="flex gap-2"><Check size={16} className="mt-1 shrink-0 text-olive" aria-hidden="true" />{h}</motion.p>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section scroll-mt-20 bg-cream/70">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Gallery" title={`${c.short} Stories.`} className="mb-8 sm:mb-14" />
          <MasonryGallery items={items} filters={false} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container-lux">
            <SectionHeading eyebrow="Featured story" title="Behind the Photographs." className="mb-10 sm:mb-16" />
            <FeaturedProjects items={related} />
          </div>
        </section>
      )}

      <section className="section bg-butter/40">
        <div className="container-lux">
          <SectionHeading eyebrow="Packages" title="Choose Your Experience." className="mb-10 sm:mb-14" />
          <Packages />
        </div>
      </section>

      <section className="section">
        <div className="container-lux">
          <div className="mb-8 flex items-end justify-between gap-6 sm:mb-14">
            <SectionHeading eyebrow="Explore more" title="Other Stories We Tell." />
            <Link to="/services" className="link-underline hidden shrink-0 sm:inline-flex">All services <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-8">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.1}><ServiceCard category={o} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}

// ---------------- Services & packages ----------------
export function Services() {
  return (
    <>
      <Seo title="Services & Packages" description="Photography services and packages — weddings, pre-wedding, portraits, maternity, newborn, events and fashion. Essential, Signature and Luxury packages." />
      <PageHero eyebrow="Services & packages" title="Find the Perfect Experience." text="Seven kinds of stories, three ways to tell them." image={a.blossomOne} />
      <section className="section">
        <div className="container-lux">
          <SectionHeading eyebrow="What we photograph" title="Stories We Love to Capture." className="mb-16" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 3) * 0.1}><ServiceCard category={c} /></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-butter/45">
        <div className="container-lux">
          <SectionHeading align="center" eyebrow="Packages" title="Three Ways to Begin." className="mb-10 sm:mb-14" />
          <Packages />
        </div>
      </section>
      <section className="section">
        <div className="container-lux">
          <SectionHeading eyebrow="Testimonials" title="Kind Words From Our Clients." className="mb-14" />
          <Testimonials />
        </div>
      </section>
      <BookingCTA image={a.pastelLook} />
    </>
  );
}

// ---------------- Contact / Book a shoot ----------------
export function Contact() {
  const [params] = useSearchParams();
  const cat = categoryBySlug[params.get('category')] ? params.get('category') : '';
  const pkg = ['Essential', 'Signature', 'Luxury'].includes(params.get('package')) ? params.get('package') : '';
  const details = [
    { icon: Phone, label: 'Call us', value: site.phone, href: site.phoneHref },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: 'Studio', value: site.address },
    { icon: Clock, label: 'Hours', value: site.hours },
  ];
  return (
    <>
      <Seo title="Contact & Book a Shoot" description="Book a photoshoot with Photography Studio. Send an enquiry for weddings, pre-wedding, maternity, newborn, portrait, events or fashion photography." />
      <PageHero eyebrow="Book a shoot" title="Let’s Begin Your Story." text="We reply within one working day." image={a.brideMehendi} />
      <section className="section">
        <div className="container-lux grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal><p className="eyebrow mb-4">Booking enquiry</p></Reveal>
            <TextReveal text="Tell us about your shoot." className="h2 mb-10" />
            <Reveal delay={0.1}><BookingForm defaultCategory={cat} defaultPackage={pkg} /></Reveal>
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-soft bg-sage/45 p-8 sm:p-10 lg:sticky lg:top-28">
              <h2 className="font-serif text-3xl">Studio details</h2>
              <ul className="mt-8 space-y-6">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-warm text-olive"><Icon size={18} aria-hidden="true" /></span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-label text-olive">{label}</span>
                      {href ? <a href={href} className="hover:text-olive">{value}</a> : <span>{value}</span>}
                    </span>
                  </li>
                ))}
              </ul>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9 w-full"><MessageCircle size={16} aria-hidden="true" /> Chat on WhatsApp</a>
              <p className="mt-5 text-xs text-charcoal-soft">{site.placeholderNote}</p>
            </div>
          </aside>
        </div>
      </section>
      <section className="section bg-cream/70">
        <div className="container-lux max-w-4xl">
          <SectionHeading eyebrow="Before you book" title="Common Questions." className="mb-10" />
          <FaqList items={faqs.filter((f) => f.group === 'Booking' || f.group === 'Pricing')} />
          <Reveal className="mt-8"><Link to="/faq" className="link-underline">See all questions <ArrowRight size={16} aria-hidden="true" /></Link></Reveal>
        </div>
      </section>
    </>
  );
}

// ---------------- FAQ ----------------
export function Faq() {
  const groups = [...new Set(faqs.map((f) => f.group))];
  return (
    <>
      <Seo title="FAQ" description="Answers to common questions about booking, sessions, delivery and pricing at Photography Studio." />
      <PageHero eyebrow="FAQ" title="Questions, Answered." text="Everything to know before your shoot." image={a.pastelClose} />
      <section className="section">
        <div className="container-lux grid gap-14 lg:grid-cols-12">
          <nav className="lg:col-span-3" aria-label="FAQ topics">
            <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col">
              {groups.map((g) => (
                <li key={g}><a href={`#${g.toLowerCase()}`} className="block rounded-full bg-sage/50 px-5 py-2.5 text-sm font-medium hover:bg-sage">{g}</a></li>
              ))}
            </ul>
          </nav>
          <div className="space-y-16 lg:col-span-9">
            {groups.map((g) => (
              <div key={g} id={g.toLowerCase()} className="scroll-mt-28">
                <Reveal><h2 className="eyebrow mb-6 font-sans">{g}</h2></Reveal>
                <FaqList items={faqs.filter((f) => f.group === g)} />
              </div>
            ))}
            <Reveal className="rounded-soft bg-butter/60 p-8 sm:flex sm:items-center sm:justify-between">
              <p className="font-serif text-2xl">Still have a question?</p>
              <div className="mt-5 flex flex-wrap gap-3 sm:mt-0">
                <Link to="/contact" className="btn-primary">Contact us</Link>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline"><MessageCircle size={16} aria-hidden="true" /> WhatsApp</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------- Project story ----------------
export function Story() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const next = projects[(projects.indexOf(p) + 1) % projects.length];
  return (
    <>
      <Seo title={`${p.title} — ${p.category}`} description={p.summary} />
      <PageHero eyebrow={`${p.category} · ${p.location}`} title={p.title} text={p.summary} image={p.cover} />
      <section className="section">
        <div className="container-lux max-w-3xl">
          <Link to="/portfolio" className="link-underline mb-10 text-sm"><ArrowLeft size={15} aria-hidden="true" /> Back to portfolio</Link>
          {p.story.map((s, i) => <Reveal key={i} delay={i * 0.1}><p className={i === 0 ? 'lead mt-4 font-serif text-2xl leading-relaxed text-charcoal' : 'mt-6 text-charcoal-soft'}>{s}</p></Reveal>)}
        </div>
        <div className="container-lux mt-16 grid gap-5 sm:grid-cols-2">
          {p.gallery.map((g, i) => (
            <RevealImage key={i} image={g} aspect={i === 0 && p.gallery.length % 2 ? 'aspect-[16/9] sm:col-span-2' : 'aspect-[4/5]'} className={i === 0 && p.gallery.length % 2 ? 'sm:col-span-2' : ''} sizes="(min-width:640px) 50vw, 100vw" />
          ))}
        </div>
        <div className="container-lux mt-20 border-t border-charcoal/10 pt-10 text-right">
          <p className="eyebrow">Next story</p>
          <Link to={`/stories/${next.slug}`} className="group mt-3 inline-flex items-center gap-3 font-serif text-4xl hover:text-olive">
            {next.title} <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <BookingCTA image={p.gallery[p.gallery.length - 1]} />
    </>
  );
}

// ---------------- 404 ----------------
export function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you were looking for could not be found." />
      <PageHero eyebrow="404" title="This frame is missing." text="The page you were looking for has moved or never existed." image={a.blossomThree}>
        <Link to="/" className="btn-light">Back to home</Link>
        <Link to="/portfolio" className="btn-glass">View portfolio</Link>
      </PageHero>
    </>
  );
}
