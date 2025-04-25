require('dotenv').config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors({
  origin: "https://floripa.live",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "Uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Только изображения формата JPEG или PNG!"));
    }
  }
});

app.get("/api/test", (req, res) => {
  const timestamp = new Date().toISOString();
  res.json({ message: "Server is working", timestamp });
});

app.post("/api/send", upload.fields([
  { name: "photo1", maxCount: 1 },
  { name: "photo2", maxCount: 1 },
  { name: "photo3", maxCount: 1 }
]), async (req, res) => {
  console.log("POST /api/send requested");

  try {
    // Проверка reCAPTCHA
    const recaptchaToken = req.body.recaptchaToken;
    if (!recaptchaToken) {
      return res.status(400).json({ error: "reCAPTCHA token отсутствует" });
    }

    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY, 
          response: recaptchaToken
        }
      }
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ error: "Проверка reCAPTCHA не пройдена" });
    }

    const fields = req.body;
    const files = req.files;

    const categories = Array.isArray(fields.category) 
      ? fields.category.join(", ") 
      : fields.category || "Не указаны";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Новая заявка от ${fields.name || "Не указано"}`,
      text: `
        Имя: ${fields.name || "Не указано"}
        Email: ${fields.email || "Не указано"}
        Услуги: ${fields.service || "Не указано"}
        Адрес: ${fields.address || "Не указано"}
        Категории: ${categories}
        Описание: ${fields.description || "Не указано"}
        Цены: ${fields.price || "Не указано"}
        Instagram: ${fields.instagram || "Не указано"}
        Telegram: ${fields.telegram || "Не указано"}
        WhatsApp: ${fields.whatsapp || "Не указано"}
        Сайт: ${fields.website || "Не указано"}
        Согласие: ${fields.consent === "true" ? "Да" : "Нет"}
      `,
      attachments: []
    };

    if (files.photo1) {
      mailOptions.attachments.push({
        filename: files.photo1[0].originalname,
        path: files.photo1[0].path
      });
    }
    if (files.photo2) {
      mailOptions.attachments.push({
        filename: files.photo2[0].originalname,
        path: files.photo2[0].path
      });
    }
    if (files.photo3) {
      mailOptions.attachments.push({
        filename: files.photo3[0].originalname,
        path: files.photo3[0].path
      });
    }

    await transporter.sendMail(mailOptions);
    console.log("Письмо успешно отправлено");
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    console.error("Ошибка при обработке запроса:", err);
    res.status(500).json({ error: err.message || "Internal server error" });
  }
});

app.listen(PORT, () => {
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "https://floripa.live" 
    : `http://localhost:${PORT}`;
  console.log(`Сервер запущен на ${baseUrl}`);
  console.log(`Тестовый роут: ${baseUrl}/api/test`);
}).on('error', (err) => {
  console.error('Ошибка запуска сервера:', err);
});