import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { cleanEnquiry, validateEnquiry } from './validate.js';

const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/photography_studio';

// ---------- Model ----------
const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    package: { type: String, default: '' },
    message: { type: String, default: '' },
    status: { type: String, enum: ['new', 'contacted', 'booked', 'closed'], default: 'new' },
  },
  { timestamps: true }
);
const Enquiry = mongoose.model('Enquiry', enquirySchema);

// ---------- App ----------
const app = express();
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5601' }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many enquiries from this connection. Please try again later or message us on WhatsApp.' },
});

app.post('/api/enquiries', enquiryLimiter, async (req, res) => {
  const data = cleanEnquiry(req.body);
  // Spam bots fill the hidden "website" field; quietly drop the submission.
  if (data.website) return res.status(400).json({ message: 'Your enquiry could not be accepted.' });
  const errors = validateEnquiry(data);
  if (Object.keys(errors).length) {
    return res.status(422).json({ message: 'Please correct the highlighted fields.', errors });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Our booking system is temporarily unavailable. Please try again shortly or message us on WhatsApp.' });
  }
  try {
    const { website, ...doc } = data;
    const saved = await Enquiry.create(doc);
    return res.status(201).json({ message: 'Enquiry received.', id: saved._id });
  } catch (err) {
    console.error('Failed to save enquiry:', err.message);
    return res.status(500).json({ message: 'Something went wrong while saving your enquiry. Please try again or message us on WhatsApp.' });
  }
});

app.use('/api', (_req, res) => res.status(404).json({ message: 'Not found.' }));

// In production, serve the built website from client/dist.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist, { maxAge: '7d', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid request.' });
  console.error(err);
  res.status(500).json({ message: 'Something went wrong.' });
});

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err.message));

app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
