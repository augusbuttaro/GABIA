const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const contactRoutes = require("./routes/contact");

dotenv.config();

const app = express();

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(express.json({ limit: "200kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Contact form route asasa
app.use("/api", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});