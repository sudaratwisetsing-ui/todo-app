My To-do List

รายละเอียดโปรเจกต์

My To-do List เป็นเว็บแอปพลิเคชันสำหรับจัดการรายการงาน ผู้ใช้สามารถเพิ่มรายการงาน ดูรายการงาน เปลี่ยนสถานะงานว่าเสร็จแล้ว และลบรายการงานได้

เทคโนโลยีที่ใช้

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Database: SQLite (better-sqlite3)
* Debugging: Visual Studio Code Debugger

โครงสร้างโปรเจกต์

* server/app.js — Backend และ API
* server/db.js — การเชื่อมต่อฐานข้อมูลและสร้างตาราง
* public/index.html — โครงสร้างหน้าเว็บไซต์
* public/style.css — การตกแต่งหน้าเว็บไซต์
* public/script.js — การทำงานของหน้าเว็บไซต์
* screenshots/ — ภาพหลักฐาน Debug

วิธีติดตั้ง

ต้องติดตั้ง Node.js และ npm ก่อน

npm install

วิธีรันโปรเจกต์

npm run dev

เปิดเบราว์เซอร์ที่ http://localhost:3000

API Endpoints

Method Endpoint รายละเอียด
GET /api/tasks แสดงงานทั้งหมด
GET /api/tasks/:id แสดงงานตาม ID
POST /api/tasks เพิ่มงาน
PATCH /api/tasks/:id เปลี่ยนสถานะงาน
DELETE /api/tasks/:id ลบงาน

หลักฐานการ Debug

* screenshots/debug-get.png — หลักฐาน Debug GET
* screenshots/debug-post.png — หลักฐาน Debug POST