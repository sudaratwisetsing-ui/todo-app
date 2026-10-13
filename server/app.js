const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

// อ่านข้อมูล JSON จาก Frontend
app.use(express.json());

// เปิดหน้าเว็บไซต์จากโฟลเดอร์ public
app.use(express.static(path.join(__dirname, "../public")));

// หน้าแรก
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// GET: แสดงรายการงานทั้งหมด
app.get("/api/tasks", (req, res) => {
  const tasks = db.prepare(
    "SELECT * FROM tasks ORDER BY id DESC"
  ).all();

  res.json(tasks);
});

// GET: แสดงงานตาม ID
app.get("/api/tasks/:id", (req, res) => {
  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "ไม่พบรายการงาน"
    });
  }

  res.json(task);
});

// POST: เพิ่มรายการงาน
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      error: "กรุณากรอกชื่องาน"
    });
  }

  const result = db.prepare(
    "INSERT INTO tasks (title) VALUES (?)"
  ).run(title.trim());

  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(result.lastInsertRowid);

  res.status(201).json(task);
});

// PATCH: เปลี่ยนสถานะงาน
app.patch("/api/tasks/:id", (req, res) => {
  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(req.params.id);

  if (!task) {
    return res.status(404).json({
      error: "ไม่พบรายการงาน"
    });
  }

  const completed = req.body.completed;

  if (typeof completed !== "boolean") {
    return res.status(400).json({
      error: "สถานะ completed ต้องเป็น true หรือ false"
    });
  }

  db.prepare(
    "UPDATE tasks SET completed = ? WHERE id = ?"
  ).run(completed ? 1 : 0, req.params.id);

  const updatedTask = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(req.params.id);

  res.json(updatedTask);
});

// DELETE: ลบรายการงาน
app.delete("/api/tasks/:id", (req, res) => {
  const result = db.prepare(
    "DELETE FROM tasks WHERE id = ?"
  ).run(req.params.id);

  if (result.changes === 0) {
    return res.status(404).json({
      error: "ไม่พบรายการงาน"
    });
  }

  res.json({
    message: "ลบรายการงานสำเร็จ"
  });
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});