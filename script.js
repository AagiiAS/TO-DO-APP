const input = document.querySelector("#input");
const addElement = document.querySelector("#add");
const checklistContainer = document.querySelector("#checklist_container");
const deleteEl = document.getElementById("delete");
const allStatus = document.querySelector("#all");
const activeStatus = document.querySelector("#active");
const completedStatus = document.querySelector("#completed");
const checkboxElement = document.querySelector("#checkbox");
const clearElement = document.querySelector("#clear");
const noTask = document.querySelector("#noTask");
const taskCount = document.querySelector(".task-count");
console.log(activeStatus);
let tasks = [];
let taskId = 1;
let currentFilter = "all";

const add = () => {
  const todoText = input.value;

  const task = {
    id: taskId,
    text: todoText,
    isComplete: false,
  };

  tasks.push(task);
  taskId++;

  renderTasks(tasks);
  updateStatus();
  clearInput();
  console.log(tasks);
};

const renderTasks = (tasks) => {
  if (tasks.length > 0) {
    noTask.style.display = "none";
  } else {
    noTask.style.display = "block";
  }
  let taskElementsHTML = "";
  tasks.forEach((task) => {
    const taskElement = createChecklist(task);
    taskElementsHTML += taskElement;
  });
  console.log(taskElementsHTML);
  checklistContainer.innerHTML = taskElementsHTML;
};

const createChecklist = (task) => {
  return ` <div class="checklist">
          <div class="check-text-box">
          <input type="checkbox" , id="checkbox" , onclick='updateStatus(${
            task.id
          })'
          placeholder="checkbox" ${task.isComplete ? "checked" : " "}  />
          <p class="${task.isComplete ? "completed" : ""}">${task.text}</p>
          </div>
          
          <button id="delete" onclick='deleteTask(${task.id})'>delete</button>
        </div>`;
};
// console.log(createChecklist(tasks));
const clearInput = () => {
  input.value = "";
};

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => {
    return task.id !== taskId;
  });

  console.log(`Deleting task with ID: ${taskId}`);
  renderTasks(tasks);
  countTask();
};

const clearCompleted = () => {
  tasks = tasks.filter((task) => task.isComplete === false);
  filterTask(currentFilter);
  countTask();
};

const CheckClearBtn = () => {
  const completedTask = tasks.some((task) => task.isComplete === true);
  if (completedTask) {
    clearElement.style.display = "block";
  } else {
    clearElement.style.display = "none";
  }
};

const updateStatus = (taskId) => {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        isComplete: !task.isComplete,
      };
    }
    return task;
  });

  filterTask(currentFilter);
  CheckClearBtn();
  countTask();
};

let completed_arr = [];
let active_arr = [];

const checkTask = () => {
  completed_arr += tasks.filter((task) => task.isComplete);
  console.log(completed_arr);
  renderTasks(completed_arr);
};

const filterTask = (currentFilter) => {
  let filteredTask = [];

  if (currentFilter === "active") {
    filteredTask = tasks.filter((task) => !task.isComplete);
  }

  if (currentFilter === "all") {
    filteredTask = tasks;
  }

  if (currentFilter === "completed") {
    filteredTask = tasks.filter((task) => task.isComplete);
  }

  renderTasks(filteredTask);
};
const countTask = () => {
  const totalTask = tasks.length;
  const completedTask = tasks.filter((task) => task.isComplete === true).length;

  taskCount.innerHTML = `${completedTask} of ${totalTask} tasks completed `;

  if (totalTask > 0) {
    taskCount.style.display = "block";
  } else {
    taskCount.style.display = "none";
  }
};
allStatus.onclick = () => filterTask("all");
activeStatus.onclick = () => filterTask("active");
completedStatus.onclick = () => filterTask("completed");
addElement.addEventListener("click", add);
