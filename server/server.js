const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 4001;

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());
app.use("/uploads", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5000000 }
});

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // Используем Gmail, можно заменить на другой сервис
  auth: {
    user: "omakeykina@gmail.com", // Укажи свой email
    pass: "rvbo wnvl iefx ejdp" // Пароль приложения (см. ниже)
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/test", (req, res) => {
  console.log("GET /api/test requested");
  res.json({ 
    message: "Server is working",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/send", upload.fields([
  { name: "photo1", maxCount: 1 },
  { name: "photo2", maxCount: 1 },
  { name: "photo3", maxCount: 1 }
]), async (req, res) => {
  console.log("POST /api/send requested");
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // Формируем данные для письма
    const textData = Object.entries(req.body)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    
    const filesData = Object.keys(req.files)
      .map(key => `${key}: ${req.files[key][0].filename} (${req.files[key][0].size} bytes)`)
      .join("\n");

    const mailOptions = {
      from: "omakeykina@gmail.com", // Твой email
      to: "omakeykina@gmail.com",   // Куда отправлять (может быть другой адрес)
      subject: "Новая заявка с формы",
      text: `Получены новые данные:\n\nТекстовые поля:\n${textData}\n\nФайлы:\n${filesData}`,
      attachments: Object.keys(req.files).map(key => ({
        filename: req.files[key][0].originalname,
        path: req.files[key][0].path
      }))
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);
    console.log("Письмо успешно отправлено");

    res.status(200).json({
      message: "Форма успешно получена и отправлена на почту",
      data: req.body,
      files: Object.keys(req.files).map(key => ({
        field: key,
        filename: req.files[key][0].filename
      }))
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Ошибка обработки формы или отправки письма" });
  }
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
  console.log(`Тестовый роут: http://localhost:${PORT}/api/test`);
}).on('error', (err) => {
  console.error('Ошибка запуска сервера:', err);
});