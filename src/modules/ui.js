import Project from "./project.js";
import Todo from "./todo.js";
import { saveProjects, loadProjects } from "./storage.js";




  let projects = loadProjects() || []; 
  let currentProject = projects[0] || null;

  function renderProjects(){
    const projectList = document.getElementById("project-list");
    projectList.innerHTML="";

    projects.forEach((project,index) => {
        const li = document.createElement('li');
        li.textContent = project.name;   
        li.addEventListener("click",()=>{currentProject=project;
            renderTodos();
        })
        projectList.appendChild(li)
    });    
    };
  function renderTodos(){
    if(!currentProject) return null;
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    currentProject.todos.forEach((todo,index)=>{
        const li = document.createElement('li');
        li.textContent = `${todo.title} (due: ${todo.dueDate}) created at: ${todo.created}`;
        li.addEventListener("click",()=>{todo.toggleComplete();
            saveProjects(projects);
            renderTodos();
        });
        todoList.appendChild(li);
    })
    document.getElementById("project-title").textContent = currentProject.name;
  }

 
document.getElementById("add-project-btn").addEventListener("click", () => {
  const name = prompt("Project Name");
  if (!name) return;
  const newProject = new Project(name);
  projects.push(newProject);
  saveProjects(projects);
  renderProjects();
});


document.getElementById("add-todo-btn").addEventListener("click", () => {
  if (!currentProject) return alert("Choose a project");
  const title = prompt("Todo Title");
  const desc = prompt("Description ");
  const due = prompt("Due Date?");
  const priority = prompt("Priority (Low, Medium, High)");

  const newTodo = new Todo(title, desc, due, priority);
  currentProject.addTodo(newTodo);

  saveProjects(projects);
  renderTodos();
});

renderProjects();
renderTodos();






  



