import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, MessageCircle, Send } from 'lucide-react';
import { categories } from '../data/categories';
import { packages } from '../data/content';
import { whatsappLink } from '../data/site';

const empty = { name: '', phone: '', email: '', category: '', date: '', location: '', message: '', package: '', website: '' };

// Same rules as the server (server/validate.js) so the visitor sees errors before sending.
export function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  const digits = v.phone.replace(/[\s()-]/g, '');
  if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) e.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!v.category) e.category = 'Please choose a photography category.';
  if (!v.date) e.date = 'Please choose a preferred date.';
  else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(`${v.date}T00:00:00`) < today) e.date = 'Please choose a date in the future.';
  }
  if (v.location.trim().length < 2) e.location = 'Please tell us the city or venue.';
  if (v.message.length > 1500) e.message = 'Please keep the message under 1500 characters.';
  return e;
}

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-charcoal">{label}</label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-charcoal-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-800" role="alert">
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export default function BookingForm({ defaultCategory = '', defaultPackage = '' }) {
  const [v, setV] = useState({ ...empty, category: defaultCategory, package: defaultPackage });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverMsg, setServerMsg] = useState('');
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const catLabel = categories.find((c) => c.slug === v.category)?.title || 'a photoshoot';
  const waMessage = `Hello Photography Studio, I'm ${v.name || '…'} and I'd like to enquire about ${catLabel}${v.date ? ` on ${v.date}` : ''}${v.location ? ` in ${v.location}` : ''}.${v.message ? ` ${v.message}` : ''}`;

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus('sending');
    setServerMsg('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || 'Our booking system did not respond. Please try again in a moment or message us on WhatsApp.');
      }
      setStatus('success');
      setV({ ...empty });
    } catch (err) {
      setStatus('error');
      setServerMsg(
        err instanceof TypeError
          ? 'We could not reach our booking system. Please check your connection or message us on WhatsApp.'
          : err.message
      );
    }
  }

  const cls = (k) => `field ${errors[k] ? 'field-error' : ''}`;
  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined });

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="ok"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-soft bg-sage/60 p-10 text-center"
          role="status"
        >
          <CheckCircle2 size={48} className="mx-auto text-olive" strokeWidth={1.4} aria-hidden="true" />
          <h3 className="mt-6 font-serif text-4xl">Thank you — your enquiry has been received.</h3>
          <p className="mx-auto mt-4 max-w-md text-charcoal-soft">We will contact you within one working day to talk through your shoot and check availability.</p>
          <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-8">Send another enquiry</button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="name" label="Full name" error={errors.name}>
              <input id="name" className={cls('name')} value={v.name} onChange={set('name')} autoComplete="name" placeholder="Your full name" {...aria('name')} />
            </Field>
            <Field id="phone" label="Mobile number" error={errors.phone}>
              <input id="phone" type="tel" inputMode="tel" className={cls('phone')} value={v.phone} onChange={set('phone')} autoComplete="tel" placeholder="10-digit mobile number" {...aria('phone')} />
            </Field>
            <Field id="email" label="Email address" error={errors.email}>
              <input id="email" type="email" className={cls('email')} value={v.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" {...aria('email')} />
            </Field>
            <Field id="category" label="Photography category" error={errors.category}>
              <select id="category" className={cls('category')} value={v.category} onChange={set('category')} {...aria('category')}>
                <option value="">Choose a category</option>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.title}</option>)}
              </select>
            </Field>
            <Field id="date" label="Preferred date" error={errors.date}>
              <input id="date" type="date" min={minDate} className={cls('date')} value={v.date} onChange={set('date')} {...aria('date')} />
            </Field>
            <Field id="location" label="Preferred location" error={errors.location}>
              <input id="location" className={cls('location')} value={v.location} onChange={set('location')} placeholder="City or venue" {...aria('location')} />
            </Field>
          </div>
          <Field id="package" label="Package (optional)">
            <select id="package" className="field" value={v.package} onChange={set('package')}>
              <option value="">Not sure yet</option>
              {packages.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
          </Field>
          <Field id="message" label="Additional message (optional)" error={errors.message} hint="Tell us about the occasion, number of guests or anything else we should know.">
            <textarea id="message" rows={5} className={cls('message')} value={v.message} onChange={set('message')} placeholder="Your message" {...aria('message')} />
          </Field>
          {/* Hidden field to catch spam bots */}
          <input type="text" name="website" value={v.website} onChange={set('website')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          {status === 'error' && (
            <div className="flex gap-3 rounded-xl border border-red-800/30 bg-red-50 p-4 text-sm text-red-900" role="alert">
              <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
              <p><strong>Your enquiry was not sent.</strong> {serverMsg}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button type="submit" className="btn-primary sm:flex-1" disabled={status === 'sending'} aria-busy={status === 'sending'}>
              {status === 'sending' ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…</> : <><Send size={16} aria-hidden="true" /> Send Booking Enquiry</>}
            </button>
            <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn-outline sm:flex-1">
              <MessageCircle size={16} aria-hidden="true" /> Enquire on WhatsApp
            </a>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
