import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("silddm.db");
const JWT_SECRET = process.env.JWT_SECRET || "silddm-secret-key";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS gallery (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS letter_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    nik TEXT,
    address TEXT,
    letter_type TEXT,
    purpose TEXT,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Create default admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE username = ?").get("admin");
if (!adminExists) {
  const hashedPassword = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run("admin", hashedPassword);
}

// Seed initial data if empty
const newsCount: any = db.prepare("SELECT COUNT(*) as count FROM news").get();
if (newsCount.count === 0) {
  db.prepare("INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)").run(
    "Pembangunan Jalan Desa Tahap 1 Selesai",
    "Pemerintah Desa Daya Murni telah menyelesaikan pembangunan jalan rabat beton di Dusun 1 sepanjang 500 meter. Pembangunan ini menggunakan Dana Desa tahun anggaran 2024.",
    "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=800&q=80"
  );
  db.prepare("INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)").run(
    "Pelatihan UMKM Desa Daya Murni",
    "Dalam rangka meningkatkan ekonomi warga, desa mengadakan pelatihan pembuatan kerajinan tangan dari limbah plastik bagi ibu-ibu PKK.",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
  );
  db.prepare("INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)").run(
    "Posyandu Rutin Bulan Maret",
    "Diberitahukan kepada seluruh warga yang memiliki balita untuk hadir pada kegiatan Posyandu rutin yang akan dilaksanakan pada hari Senin besok.",
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
  );
}

const galleryCount: any = db.prepare("SELECT COUNT(*) as count FROM gallery").get();
if (galleryCount.count === 0) {
  db.prepare("INSERT INTO gallery (title, image_url) VALUES (?, ?)").run("Gotong Royong Bersama", "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80");
  db.prepare("INSERT INTO gallery (title, image_url) VALUES (?, ?)").run("Pemandangan Sawah Desa", "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80");
  db.prepare("INSERT INTO gallery (title, image_url) VALUES (?, ?)").run("Rapat Desa Mingguan", "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80");
  db.prepare("INSERT INTO gallery (title, image_url) VALUES (?, ?)").run("Kegiatan Olahraga Sore", "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Auth
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  // Public News
  app.get("/api/news", (req, res) => {
    const news = db.prepare("SELECT * FROM news ORDER BY created_at DESC").all();
    res.json(news);
  });

  app.get("/api/news/:id", (req, res) => {
    const item = db.prepare("SELECT * FROM news WHERE id = ?").get(req.params.id);
    res.json(item);
  });

  // Public Gallery
  app.get("/api/gallery", (req, res) => {
    const gallery = db.prepare("SELECT * FROM gallery ORDER BY created_at DESC").all();
    res.json(gallery);
  });

  // Public Letter Submission
  app.post("/api/letters", (req, res) => {
    const { name, nik, address, letter_type, purpose } = req.body;
    try {
      db.prepare("INSERT INTO letter_requests (name, nik, address, letter_type, purpose) VALUES (?, ?, ?, ?, ?)")
        .run(name, nik, address, letter_type, purpose);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit request" });
    }
  });

  // --- ADMIN ROUTES (Protected) ---
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  app.get("/api/admin/letters", authenticateToken, (req, res) => {
    const letters = db.prepare("SELECT * FROM letter_requests ORDER BY created_at DESC").all();
    res.json(letters);
  });

  app.patch("/api/admin/letters/:id", authenticateToken, (req, res) => {
    const { status } = req.body;
    db.prepare("UPDATE letter_requests SET status = ? WHERE id = ?").run(status, req.params.id);
    res.json({ success: true });
  });

  app.post("/api/admin/news", authenticateToken, (req, res) => {
    const { title, content, image_url } = req.body;
    db.prepare("INSERT INTO news (title, content, image_url) VALUES (?, ?, ?)").run(title, content, image_url);
    res.json({ success: true });
  });

  app.delete("/api/admin/news/:id", authenticateToken, (req, res) => {
    db.prepare("DELETE FROM news WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.post("/api/admin/gallery", authenticateToken, (req, res) => {
    const { title, image_url } = req.body;
    db.prepare("INSERT INTO gallery (title, image_url) VALUES (?, ?)").run(title, image_url);
    res.json({ success: true });
  });

  app.delete("/api/admin/gallery/:id", authenticateToken, (req, res) => {
    db.prepare("DELETE FROM gallery WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
