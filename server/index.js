const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// In dev, CRA usually runs on :3000
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '200kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function createTransporter() {
  const host = requiredEnv('SMTP_HOST');
  const port = Number(requiredEnv('SMTP_PORT'));
  const user = requiredEnv('SMTP_USER');
  const pass = requiredEnv('SMTP_PASS');

  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

let verifiedTransporterPromise = null;

async function getVerifiedTransporter() {
  if (!verifiedTransporterPromise) {
    verifiedTransporterPromise = (async () => {
      const transporter = createTransporter();
      // Verify auth/connection early so we can return a clearer error.
      await transporter.verify();
      return transporter;
    })();
  }
  return verifiedTransporterPromise;
}

function toPublicMailError(err) {
  const code = err && (err.code || err.responseCode);
  const message = (err && err.message) ? String(err.message) : '';

  // Common Nodemailer/Gmail cases
  if (code === 'EAUTH' || /Invalid login|Username and Password not accepted/i.test(message)) {
    return {
      status: 500,
      error:
        'Gmail rechazó el inicio de sesión. Usá un App Password (no tu contraseña normal) y asegurate de tener 2FA activado.',
    };
  }

  if (code === 'ECONNECTION' || code === 'ETIMEDOUT' || /timeout|connect/i.test(message)) {
    return {
      status: 500,
      error:
        'No se pudo conectar al SMTP. Revisá SMTP_HOST/SMTP_PORT y si tu red/firewall bloquea el puerto 465/587.',
    };
  }

  if (code === 535 || /5\.7\.8|5\.7\.0|Authentication Required/i.test(message)) {
    return {
      status: 500,
      error:
        'Gmail requiere autenticación válida. Verificá SMTP_USER y que SMTP_PASS sea un App Password.',
    };
  }

  return { status: 500, error: 'Error enviando el email.' };
}

app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body || {};

    if (typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ ok: false, error: 'Nombre y apellido inválido.' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: 'E-mail inválido.' });
    }
    if (typeof subject !== 'string' || subject.trim().length < 2) {
      return res.status(400).json({ ok: false, error: 'Asunto inválido.' });
    }
    if (typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ ok: false, error: 'Consulta inválida.' });
    }

    const to = requiredEnv('MAIL_TO');
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;
    if (!from) {
      return res.status(500).json({ ok: false, error: 'Falta configurar MAIL_FROM o SMTP_USER.' });
    }

    const transporter = await getVerifiedTransporter();

    const safePhone = typeof phone === 'string' ? phone.trim() : '';

    const text = [
      'Nueva consulta desde el sitio',
      '',
      `Nombre: ${fullName}`,
      `Email: ${email}`,
      `Teléfono: ${safePhone || '-'}`,
      `Asunto: ${subject}`,
      '',
      'Mensaje:',
      message,
    ].join('\n');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5">
        <h2>Nueva consulta desde el sitio</h2>
        <p><b>Nombre:</b> ${escapeHtml(fullName)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Teléfono:</b> ${escapeHtml(safePhone || '-')}</p>
        <p><b>Asunto:</b> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Contacto Web: ${subject}`,
      text,
      html,
    });

    // Optional: send auto-reply
    if (process.env.SEND_AUTOREPLY === 'true') {
      await transporter.sendMail({
        from,
        to: email,
        subject: 'Recibimos tu consulta',
        text: `Hola ${fullName},\n\n¡Gracias por contactarte! Recibimos tu mensaje y te responderemos a la brevedad.\n\n— GABIA`,
      });
    }

    return res.json({ ok: true });
  } catch (err) {
    // Avoid leaking secrets
    console.error(err);
    const publicErr = toPublicMailError(err);
    return res.status(publicErr.status).json({ ok: false, error: publicErr.error });
  }
});

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
