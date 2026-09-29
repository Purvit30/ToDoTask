// script.js
const tasks = [];
let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false
  });

  taskInput.value = "";
  showTasks();
}

function showTasks() {
  taskList.innerHTML = "";

  const visibleTasks = tasks.filter(function (task) {
    if (currentFilter === "remaining") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  emptyMessage.style.display = visibleTasks.length === 0 ? "block" : "none";

  visibleTasks.forEach(function (task) {
    const taskIndex = tasks.indexOf(task);
    const listItem = document.createElement("li");

    if (task.completed) {
      listItem.classList.add("completed");
    }

    listItem.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span>${task.text}</span>
      <button class="delete">Delete</button>
    `;

    listItem.querySelector("input").addEventListener("change", function () {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      showTasks();
    });

    listItem.querySelector(".delete").addEventListener("click", function () {
      tasks.splice(taskIndex, 1);
      showTasks();
    });

    taskList.appendChild(listItem);
  });
}

document.getElementById("addButton").addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

document.querySelectorAll(".filter").forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");

    showTasks();
  });
});

showTasks();