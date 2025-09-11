import Project from "./project.js";
import Todo from "./todo.js";
import { saveProjects, loadProjects } from "./storage.js";

let projects = loadProjects() || [];
let currentProject = projects[0] || null;

// =============== RENDER PROJECTS ==================
function renderProjects() {
  const projectList = document.getElementById("project-list");
  
  projectList.innerHTML = "";

  projects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;

  
    if (currentProject === project) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      currentProject = project;
      renderProjects(); 
      renderTodos();
    });

    projectList.appendChild(li);
  });
}

// =============== RENDER TODOS ==================
function renderTodos() {
  if (!currentProject) return null;
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  currentProject.todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.style.backgroundColor = todo.color; 

    li.innerHTML = `
      <div class="todo-header">
        <strong>${todo.title}</strong>
        <span class="todo-date">${todo.dueDate.toLocaleDateString()}</span>
      </div>
      <div class="todo-desc">${todo.description}</div>
      <div class="todo-footer">
        <span class="priority">Priority: ${todo.priority}</span>
        <div class="todo-actions">
          <button class="edit-btn"><i class="fas fa-pen"></i></button>
          <button class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;

    if (todo.completed) {
      li.classList.add("completed");
    }

   
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON" || e.target.tagName === "I") return;
      todo.toggleComplete();
      saveProjects(projects);
      renderTodos();
    });

    // supprimer
    li.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
        currentProject.removeTodo(index);
        saveProjects(projects);
        renderTodos();
      }
    });


    li.querySelector(".edit-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("todo-title").value = todo.title;
      document.getElementById("todo-desc").value = todo.description;
      document.getElementById("todo-due").value = todo.dueDate
        .toISOString()
        .split("T")[0];
      document.getElementById("todo-priority").value = todo.priority;

      todoModal.style.display = "flex";

      todoForm.onsubmit = (ev) => {
        ev.preventDefault();
        const updatedTodo = new Todo(
          document.getElementById("todo-title").value,
          document.getElementById("todo-desc").value,
          new Date(document.getElementById("todo-due").value),
          document.getElementById("todo-priority").value,
          todo.color
        );

        currentProject.updateTodo(index, updatedTodo);
        saveProjects(projects);
        renderTodos();

        todoModal.style.display = "none";
        todoForm.reset();
        resetTodoFormHandler();
      };
    });

    todoList.appendChild(li);
  });

  document.getElementById("project-title").textContent = currentProject.name;
}


// =============== Add PROJECT ==================
document.getElementById("add-project-btn").addEventListener("click", () => {
  const name = prompt("Project Name");
  if (!name) return;
  const newProject = new Project(name);
  projects.push(newProject);
  saveProjects(projects);
  renderProjects();
});

// =============== MODAL TODOS ==================
const todoModal = document.getElementById("todo-modal");
const closeTodoModal = document.getElementById("close-todo-modal");
const todoForm = document.getElementById("todo-form");

document.getElementById("add-todo-btn").addEventListener("click", () => {
  if (!currentProject) return alert("Choose a project first!");
  todoModal.style.display = "flex";
});

closeTodoModal.addEventListener("click", () => {
  todoModal.style.display = "none";
  todoForm.reset();
});


function resetTodoFormHandler() {
  todoForm.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById("todo-title").value;
    const desc = document.getElementById("todo-desc").value;
    const due = document.getElementById("todo-due").value;
    const priority = document.getElementById("todo-priority").value;

    const colors = ["#FFFF99", "#FFC0CB", "#ADD8E6", "#90EE90", "#ff65a3"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newTodo = new Todo(
      title,
      desc,
      new Date(due),
      priority,
      randomColor
    );

    currentProject.addTodo(newTodo);
    saveProjects(projects);
    renderTodos();

    todoModal.style.display = "none";
    todoForm.reset();
  };
}

// =============== INIT ==================
resetTodoFormHandler();
renderProjects();
renderTodos();
