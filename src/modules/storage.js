import Project from "./project.js";    
import Todo from "./todo.js";

const STORAGE_KEY = "todo-projects"

export function saveProjects(projects){
    localStorage.setItem(STORAGE_KEY,JSON.stringify(projects));
}

export function loadProjects(){
     const data = localStorage.getItem(STORAGE_KEY);
     if(!data) return;
     const rawProjects = JSON.parse(data);

     return rawProjects.map(projectData=>{
        const project = new Project(projectData.name);
        project.todos= projectData.todos.map(todoData=>{
            const todo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority,
        todoData.color
      );
      todo.completed = todoData.completed;
      todo.created = new Date(todoData.created);
      return todo;
        })
        return project;
     })
}