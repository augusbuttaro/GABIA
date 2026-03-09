const express = require("express");
const { Resend } = require("resend");

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

// simple in-memory rate limiter
const rateLimitMap = new Map();

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

router.post("/contact", async (req, res) => {
  try {
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    const now = Date.now();
    const last = rateLimitMap.get(ip);

    if (last && now - last < 10000) {
      return res
        .status(429)
        .json({ ok: false, error: "Demasiadas solicitudes. Esperá unos segundos." });
    }

    rateLimitMap.set(ip, now);

    const { fullName, email, phone, subject, message, company } = req.body || {};

    // honeypot anti-spam
    if (company) {
      return res.json({ ok: true });
    }

    if (typeof fullName !== "string" || fullName.trim().length < 2) {
      return res.status(400).json({ ok: false, error: "Nombre inválido." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "Email inválido." });
    }

    if (typeof subject !== "string" || subject.trim().length < 2) {
      return res.status(400).json({ ok: false, error: "Asunto inválido." });
    }

    if (typeof message !== "string" || message.trim().length < 5) {
      return res.status(400).json({ ok: false, error: "Mensaje inválido." });
    }

    const safePhone = typeof phone === "string" ? phone.trim() : "-";

    await resend.emails.send({
      from: process.env.MAIL_FROM,
      to: [process.env.MAIL_TO],
      reply_to: email,
      subject: `Contacto Web: ${subject}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Nueva consulta desde la web</h2>
          <p><b>Nombre:</b> ${fullName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Teléfono:</b> ${safePhone}</p>
          <p><b>Asunto:</b> ${subject}</p>
          <hr/>
          <p style="white-space:pre-wrap">${message}</p>
        </div>
      `,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "Error enviando el email." });
  }
});

module.exports = router;