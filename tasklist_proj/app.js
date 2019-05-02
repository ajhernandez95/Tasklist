// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // LOAD TASK FROM LI
  document.addEventListener("DOMContentLoaded", getTaskFromLS);

  // ADD TASK
  form.addEventListener("submit", addTask);
  // REMOVE TASK
  taskList.addEventListener("click", removeTask);
  // CLEAR TASK
  clearBtn.addEventListener("click", clearTask);
  // FILTER TASK
  filter.addEventListener("input", filterTask);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add task");
  }

  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
  // Store task in ls
  storeTaskInLocalStorage(li.innerText);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}
// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeTaskFromLS(e.target.parentElement.parentElement);
  }
}
// Clear Task
function clearTask() {
  // Clear LS
  localStorage.clear();
  // Clear Collection
  while (taskList.firstChild) {
    taskList.firstChild.remove();
  }
}
// Filter Task
function filterTask(e) {
  const text = e.target.value;
  document.querySelectorAll("li").forEach(function(task) {
    if (task.innerText.indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
// Store task in ls
function storeTaskInLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("task") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }
  tasks.push(taskItem);
  localStorage.setItem("task", JSON.stringify(tasks));
}
// Get task from ls
function getTaskFromLS() {
  let tasks;
  if (localStorage.getItem("task") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }
  tasks.forEach(function(taskItem) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskItem));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Remove Task From LS
function removeTaskFromLS(taskItem) {
  let tasks;
  if (localStorage.getItem("task") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("task"));
  }
  tasks.forEach(function(task, index) {
    if (task === taskItem.innerText) {
      tasks.splice(index, 1);
    }
    localStorage.setItem("task", JSON.stringify(tasks));
  });
}
