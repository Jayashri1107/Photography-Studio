import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { categories } from '../data/categories';
import { site, whatsappLink } from '../data/site';

const empty = { name: '', phone: '', email: '', category: '', date: '', location: '', message: '', package: '', website: '' };

// Same rules as the server (server/validate.js) so the visitor sees errors before sending.
export function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  const digits = v.phone.replace(/[\s()-]/g, '');
  if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) e.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Please enter a valid email address.';
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
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-charcoal">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-charcoal-soft">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1 flex items-center gap-1 text-xs text-red-800" role="alert">
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export default function BookingForm({ defaultCategory = '', defaultPackage = '' }) {
  const [v, setV] = useState({ ...empty, category: defaultCategory, package: defaultPackage });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | success
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const [sentLink, setSentLink] = useState('');

  // The whole enquiry, written out as a WhatsApp message to the studio.
  function enquiryMessage(x) {
    const cat = categories.find((c) => c.slug === x.category)?.title || x.category;
    const date = x.date ? new Date(`${x.date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
    return [
      `Hello ${site.name}, I would like to book a shoot.`,
      '',
      `Name: ${x.name.trim()}`,
      `Mobile: ${x.phone.trim()}`,
      `Shoot type: ${cat}`,
      `Preferred date: ${date}`,
      `Location: ${x.location.trim()}`,
      x.package ? `Package: ${x.package}` : null,
      x.message.trim() ? `Message: ${x.message.trim()}` : null,
    ].filter((line) => line !== null).join('\n');
  }

  function onSubmit(e) {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    if (v.website) return; // spam bot filled the hidden field

    // WhatsApp must open straight from the click, or the browser blocks it as a pop-up.
    const link = whatsappLink(enquiryMessage(v));
    const win = window.open(link, '_blank', 'noopener');
    if (!win) window.location.href = link;

    // Backup copy in the studio's database when the server is running; WhatsApp works without it.
    fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(v),
    }).catch(() => {});

    setSentLink(link);
    setStatus('success');
    setV({ ...empty });
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
          className="rounded-soft bg-sage/60 p-6 text-center sm:p-8"
          role="status"
        >
          <CheckCircle2 size={40} className="mx-auto text-olive" strokeWidth={1.4} aria-hidden="true" />
          <h3 className="mt-4 font-serif text-2xl sm:text-3xl">Your enquiry is ready in WhatsApp.</h3>
          <p className="mx-auto mt-3 max-w-md text-sm text-charcoal-soft">Tap <strong>Send</strong> in WhatsApp so it reaches us. We reply within one working day.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={sentLink} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle size={16} aria-hidden="true" /> Open WhatsApp again</a>
            <button type="button" onClick={() => setStatus('idle')} className="btn-outline">New enquiry</button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-1"><Field id="name" label="Full name" error={errors.name}>
              <input id="name" className={cls('name')} value={v.name} onChange={set('name')} autoComplete="name" placeholder="Your full name" {...aria('name')} />
            </Field></div>
            <div className="col-span-2 sm:col-span-1"><Field id="phone" label="Mobile number" error={errors.phone}>
              <input id="phone" type="tel" inputMode="tel" className={cls('phone')} value={v.phone} onChange={set('phone')} autoComplete="tel" placeholder="10-digit mobile" {...aria('phone')} />
            </Field></div>
            <Field id="category" label="Shoot type" error={errors.category}>
              <select id="category" className={cls('category')} value={v.category} onChange={set('category')} {...aria('category')}>
                <option value="">Choose</option>
                {categories.map((c) => <option key={c.slug} value={c.slug}>{c.short}</option>)}
              </select>
            </Field>
            <Field id="date" label="Preferred date" error={errors.date}>
              <input id="date" type="date" min={minDate} className={cls('date')} value={v.date} onChange={set('date')} {...aria('date')} />
            </Field>
            <div className="col-span-2"><Field id="location" label="Location" error={errors.location}>
              <input id="location" className={cls('location')} value={v.location} onChange={set('location')} placeholder="City or venue" {...aria('location')} />
            </Field></div>
          </div>
          <Field id="message" label="Message (optional)" error={errors.message}>
            <textarea id="message" rows={2} className={cls('message')} value={v.message} onChange={set('message')} placeholder="Occasion, guests, anything we should know" {...aria('message')} />
          </Field>
          {/* Hidden field to catch spam bots */}
          <input type="text" name="website" value={v.website} onChange={set('website')} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:gap-4">
            <button type="submit" className="btn-primary sm:px-8">
              <MessageCircle size={16} aria-hidden="true" /> Send on WhatsApp
            </button>
            <p className="text-xs text-charcoal-soft">Opens WhatsApp with your details filled in — just tap Send.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
