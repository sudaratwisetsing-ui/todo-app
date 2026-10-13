
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");

async function loadTasks() {
  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) throw new Error("โหลดรายการงานไม่สำเร็จ");

    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    message.textContent = error.message;
  }
}

function renderTasks(tasks) {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-message";
    empty.textContent = "ยังไม่มีงาน เพิ่มงานแรกของคุณได้เลย!";
    taskList.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = "task-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(task.completed);
    checkbox.setAttribute("aria-label", "เปลี่ยนสถานะงาน");

    checkbox.addEventListener("change", () => {
      updateTask(task.id, checkbox.checked);
    });

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    if (task.completed) {
      title.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "ลบ";
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id);
    });

    item.append(checkbox, title, deleteButton);
    taskList.appendChild(item);
  });
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  try {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "เพิ่มงานไม่สำเร็จ");

    input.value = "";
    message.textContent = "เพิ่มงานสำเร็จ";
    await loadTasks();
  } catch (error) {
    message.textContent = error.message;
  }
});

async function updateTask(id, completed) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed })
    });

    if (!response.ok) throw new Error("เปลี่ยนสถานะงานไม่สำเร็จ");

    message.textContent = "อัปเดตสถานะสำเร็จ";
    await loadTasks();
  } catch (error) {
    message.textContent = error.message;
    await loadTasks();
  }
}

async function deleteTask(id) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "ลบงานไม่สำเร็จ");

    message.textContent = "ลบงานสำเร็จ";
    await loadTasks();
  } catch (error) {
    message.textContent = error.message;
  }
}

loadTasks();