require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

const app = express();
const PORT = process.env.PORT || 4001;

if (!process.env.RECAPTCHA_SECRET_KEY || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  logger.error("Отсутствуют необходимые переменные окружения");
  process.exit(1);
}

app.use(cors({
  origin: ["https://floripa.live", "http://localhost:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "Uploads")));

app.use((req, res, next) => {
  logger.info(`Получен запрос: ${req.method} ${req.url}`);
  next();
});

app.get("/api/test", (req, res) => {
  const timestamp = new Date().toISOString();
  logger.info(`GET /api/test accessed at ${timestamp}`);
  res.json({ message: "Сервер работает", timestamp });
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
  },
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
  },
});

app.post("/api/send", upload.fields([
  { name: "photo1", maxCount: 1 },
  { name: "photo2", maxCount: 1 },
  { name: "photo3", maxCount: 1 },
]), async (req, res) => {
  logger.info("POST /api/send запрошен");

  try {
    const recaptchaToken = req.body.recaptchaToken;
    if (!recaptchaToken) {
      logger.warn("reCAPTCHA token отсутствует");
      return res.status(400).json({ error: "reCAPTCHA token отсутствует" });
    }

    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    if (!recaptchaResponse.data.success) {
      logger.error("reCAPTCHA verification failed", { errors: recaptchaResponse.data["error-codes"] });
      return res.status(400).json({
        error: "Проверка reCAPTCHA не пройдена",
        details: recaptchaResponse.data["error-codes"] || "Неизвестная ошибка",
      });
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
      attachments: [],
    };

    if (files.photo1) {
      mailOptions.attachments.push({
        filename: files.photo1[0].originalname,
        path: files.photo1[0].path,
      });
    }
    if (files.photo2) {
      mailOptions.attachments.push({
        filename: files.photo2[0].originalname,
        path: files.photo2[0].path,
      });
    }
    if (files.photo3) {
      mailOptions.attachments.push({
        filename: files.photo3[0].originalname,
        path: files.photo3[0].path,
      });
    }

    await transporter.sendMail(mailOptions);

    const cleanupFiles = () => {
      if (files.photo1) fs.unlinkSync(files.photo1[0].path);
      if (files.photo2) fs.unlinkSync(files.photo2[0].path);
      if (files.photo3) fs.unlinkSync(files.photo3[0].path);
    };
    cleanupFiles();

    logger.info("Письмо успешно отправлено");
    res.status(200).json({ message: "Форма успешно отправлена" });
  } catch (err) {
    logger.error("Ошибка при обработке запроса", { error: err.message });
    res.status(500).json({ error: err.message || "Внутренняя ошибка сервера" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => {
  const baseUrl = process.env.NODE_ENV === "production" ? "https://floripa.live" : `http://localhost:${PORT}`;
  logger.info(`Сервер запущен на ${baseUrl}`);
  logger.info(`Тестовый роут: ${baseUrl}/api/test`);
}).on("error", (err) => {
  logger.error("Ошибка запуска сервера", { error: err.message });
});