const taskForm = document.getElementById("taskForm");
const toggleButton = document.getElementById("toggleButton");
const taskTitle = document.getElementById("taskTitle");
const taskDeadline = document.getElementById("taskDeadline");
const taskStatus = document.getElementById("taskStatus");
const cancelTaskButton = document.getElementById("cancelTaskButton");
const saveTaskButton = document.getElementById("saveTaskButton");
const taskList = document.getElementById("taskList");

let mytasks = [];

// Helper function to create a new task element
function createTaskElement(task, index) {
    const li = document.createElement("li");
    li.classList.add("task-card");
    li.innerHTML = `
        <strong>${task.title}</strong> 
        Deadline: ${task.deadline} <br> 
        Status: ${task.status} 
        <br>
        <button class="update-button" onclick="showUpdateTaskForm(${index})">Update</button>
        <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
    `;
    return li;
  }
  
  // Function to render the task list
  function renderTasks() {
    taskList.innerHTML = "";
    mytasks.forEach((task, index) => {
      const li = createTaskElement(task, index);
      taskList.appendChild(li);
    });
  }
  
  // Function to show the add task form
  function showAddTaskForm() {
    saveTaskButton.onclick = addTask;
    saveTaskButton.textContent = "Confirm";
    taskForm.style.display = "block";
    taskForm.reset();
  }
  
  // Function to show the update task form
  function showUpdateTaskForm(index) {
    taskTitle.value = mytasks[index].title;
    taskDeadline.value = mytasks[index].deadline;
    taskStatus.value = mytasks[index].status;
  
    saveTaskButton.onclick = () => {
      updateTask(index);
    };
    saveTaskButton.textContent = "Update Task";
    modal.style.display = "flex";
  }
  
  // Function to add a task
  function addTask() {
    const newTitle = taskTitle.value;

    // Check if the title is unique
  const titleExists = mytasks.some(task => task.title === newTitle);
  if (titleExists) {
    alert("The title already exists. Please use a unique title.");
    return;
  }
    const task = {
      title: newTitle,
      deadline: taskDeadline.value,
      status: taskStatus.value,
    };
  
    mytasks.push(task);
    renderTasks();
    taskForm.reset();
    modal.style.display = "none";
  }
  
  // Function to update a task
  function updateTask(index) {
    mytasks[index].title = taskTitle.value;
    mytasks[index].deadline = taskDeadline.value;
    mytasks[index].status = taskStatus.value;
  
    renderTasks();
    taskForm.reset();
    modal.style.display = "none";
  }

  cancelTaskButton.addEventListener("click", () => {
    taskForm.style.display = "none";
});
  
  // Function to delete a task
  function deleteTask(index) {
    mytasks.splice(index, 1);
    renderTasks();
  }
  
  // Event listeners for buttons
  toggleButton.addEventListener("click", showAddTaskForm);
  cancelTaskButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Initial render
  renderTasks();