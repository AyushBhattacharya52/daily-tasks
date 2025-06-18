const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const clearBtn = document.getElementById("clear-completed");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    li.className = task.done ? "completed" : "";
    li.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };
    list.appendChild(li);
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
};

clearBtn.onclick = () => {
  tasks = tasks.filter(task => !task.done);
  saveTasks();
  renderTasks();
};

renderTasks();
